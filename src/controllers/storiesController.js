import { Story, Decision, Option, UserSession, UserChoice, User } from '../index.js';
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
      attributes: ['id', 'title', 'description', 'image', 'duration', 'category', 'esDefault'],
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
          model: Decision,
          as: 'decisions',
          include: [
            {
              model: Option,
              as: 'options'
            }
          ]
        }
      ]
    });

    if (!story) {
      return res.status(404).json({ error: 'Historia no encontrada' });
    }

    res.json({
      message: 'Historia obtenida exitosamente',
      story
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
      status: 'in_progress'
    });

    // Obtener la primera decisión
    const firstDecision = await Decision.findOne({
      where: { story_id: storyId, number: 1 },
      include: [
        {
          model: Option,
          as: 'options'
        }
      ]
    });

    res.json({
      message: 'Historia iniciada exitosamente',
      session: {
        id: session.id,
        story: story,
        currentDecision: firstDecision
      }
    });
  } catch (error) {
    console.error('Error al iniciar historia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const makeChoice = async (req, res) => {
  try {
    const { sessionId, optionId } = req.body;
    const userId = req.user.id;

    // Verificar que la sesión pertenece al usuario
    const session = await UserSession.findOne({
      where: { id: sessionId, user_id: userId, status: 'in_progress' }
    });

    if (!session) {
      return res.status(404).json({ error: 'Sesión no encontrada o ya finalizada' });
    }

    // Obtener la opción seleccionada
    const option = await Option.findOne({
      where: { id: optionId },
      include: [
        {
          model: Decision,
          as: 'decision'
        }
      ]
    });

    if (!option) {
      return res.status(404).json({ error: 'Opción no encontrada' });
    }

    // Guardar la elección del usuario
    await UserChoice.create({
      session_id: sessionId,
      decision_number: option.decision.number,
      option_id: optionId
    });

    let response = {
      message: 'Elección registrada exitosamente',
      choice: option
    };

    // Si la opción tiene ending_text, terminar la historia
    if (option.ending_text) {
      await session.update({ status: 'finished' });
      response.ending = option.ending_text;
      response.storyFinished = true;
    } 
    // Si tiene next_decision_number, obtener la siguiente decisión
    else if (option.next_decision_number) {
      const nextDecision = await Decision.findOne({
        where: { 
          story_id: session.story_id, 
          number: option.next_decision_number 
        },
        include: [
          {
            model: Option,
            as: 'options'
          }
        ]
      });

      response.nextDecision = nextDecision;
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