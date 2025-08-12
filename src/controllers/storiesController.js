import { Story, StoryNode, StoryChoice, UserSession, UserChoice, User } from '../index.js';
import { Op } from 'sequelize';

const getStories = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    const whereClause = {
      [Op.or]: [
        { esDefault: true },
        { userId: userId }
      ]
    };

    const stories = await Story.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'description', 'image', 'duration', 'category', 'start_node_id', 'esDefault'],
      order: [['esDefault', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      message: 'Historias obtenidas exitosamente',
      stories
    });
  } catch (error) {
    console.error('Error al obtener historias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;

    const story = await Story.findOne({
      where: {
        id,
        [Op.or]: [
          { esDefault: true },
          { userId: userId }
        ]
      },
      include: [
        {
          model: StoryNode,
          as: 'nodes',
          include: [
            {
              model: StoryChoice,
              as: 'choices'
            }
          ]
        }
      ]
    });

    if (!story) {
      return res.status(404).json({ error: 'Historia no encontrada' });
    }

    // Convertir a formato de grafo para frontend
    const storyGraph = {};
    story.nodes.forEach(node => {
      storyGraph[node.node_id] = {
        id: node.node_id,
        content: node.content,
        choices: node.choices.map(choice => ({
          text: choice.text,
          nextId: choice.next_node_id
        }))
      };
    });

    res.json({
      message: 'Historia obtenida exitosamente',
      story: {
        id: story.id,
        title: story.title,
        description: story.description,
        image: story.image,
        duration: story.duration,
        category: story.category,
        startNodeId: story.start_node_id,
        graph: storyGraph
      }
    });
  } catch (error) {
    console.error('Error al obtener historia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const startStory = async (req, res) => {
  try {
    const { storyId } = req.body;
    const userId = req.user.id;

    // Verificar que la historia existe
    const story = await Story.findByPk(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Historia no encontrada' });
    }

    // Crear nueva sesión
    const session = await UserSession.create({
      user_id: userId,
      story_id: storyId,
      current_node_id: story.start_node_id,
      status: 'in_progress'
    });

    // Obtener el nodo inicial
    const startNode = await StoryNode.findOne({
      where: { 
        story_id: storyId, 
        node_id: story.start_node_id 
      },
      include: [
        {
          model: StoryChoice,
          as: 'choices'
        }
      ]
    });

    res.json({
      message: 'Historia iniciada exitosamente',
      session: {
        id: session.id,
        story: {
          id: story.id,
          title: story.title,
          description: story.description
        },
        currentNode: {
          id: startNode.node_id,
          content: startNode.content,
          isEnding: startNode.is_ending,
          choices: startNode.choices.map(choice => ({
            id: choice.id,
            text: choice.text,
            nextNodeId: choice.next_node_id
          }))
        }
      }
    });
  } catch (error) {
    console.error('Error al iniciar historia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const makeChoice = async (req, res) => {
  try {
    const { sessionId, choiceId } = req.body;
    const userId = req.user.id;

    // Verificar que la sesión pertenece al usuario
    const session = await UserSession.findOne({
      where: { id: sessionId, user_id: userId, status: 'in_progress' }
    });

    if (!session) {
      return res.status(404).json({ error: 'Sesión no encontrada o ya finalizada' });
    }

    // Obtener la opción seleccionada
    const choice = await StoryChoice.findByPk(choiceId);
    if (!choice) {
      return res.status(404).json({ error: 'Opción no encontrada' });
    }

    // Obtener el nodo actual para verificar que la opción pertenece a él
    const currentNode = await StoryNode.findOne({
      where: { 
        story_id: session.story_id, 
        node_id: session.current_node_id 
      }
    });

    // Guardar la elección del usuario
    await UserChoice.create({
      session_id: sessionId,
      from_node_id: session.current_node_id,
      choice_text: choice.text,
      to_node_id: choice.next_node_id
    });

    // Actualizar la sesión al nuevo nodo
    await session.update({ current_node_id: choice.next_node_id });

    // Obtener el siguiente nodo
    const nextNode = await StoryNode.findOne({
      where: { 
        story_id: session.story_id, 
        node_id: choice.next_node_id 
      },
      include: [
        {
          model: StoryChoice,
          as: 'choices'
        }
      ]
    });

    let response = {
      message: 'Elección registrada exitosamente',
      choice: {
        text: choice.text,
        fromNodeId: session.current_node_id,
        toNodeId: choice.next_node_id
      }
    };

    // Si el siguiente nodo es un final
    if (nextNode.is_ending) {
      await session.update({ status: 'finished' });
      response.ending = nextNode.content;
      response.storyFinished = true;
    } else {
      // Continuar con el siguiente nodo
      response.nextNode = {
        id: nextNode.node_id,
        content: nextNode.content,
        isEnding: nextNode.is_ending,
        choices: nextNode.choices.map(c => ({
          id: c.id,
          text: c.text,
          nextNodeId: c.next_node_id
        }))
      };
    }

    res.json(response);
  } catch (error) {
    console.error('Error al procesar elección:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await UserSession.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Story,
          as: 'story',
          attributes: ['id', 'title', 'description', 'image', 'duration', 'category']
        },
        {
          model: UserChoice,
          as: 'choices',
          include: [
            {
              model: Option,
              as: 'option'
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Sesiones obtenidas exitosamente',
      sessions
    });
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
  getStories,
  getStoryById,
  startStory,
  makeChoice,
  getUserSessions
};