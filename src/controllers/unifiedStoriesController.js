import { Story, StoryNode, StoryChoice, Cuento } from '../index.js';
import { Op } from 'sequelize';
import { getStoryGraph } from '../storyGraphs/index.js';

// Función para convertir un cuento simple a formato StoryGraph
const convertCuentoToStoryGraph = (cuento) => {
  return {
    start: {
      id: "start",
      content: cuento.contenido
      // Sin choices para cuentos lineales
    }
  };
};

// Función para convertir una story interactiva a formato StoryGraph
const convertStoryToStoryGraph = (story) => {
  const storyGraph = {};
  
  story.nodes.forEach(node => {
    storyGraph[node.node_id] = {
      id: node.node_id,
      content: node.content
    };
    
    // Solo agregar choices si el nodo no es un final
    if (node.choices && node.choices.length > 0) {
      storyGraph[node.node_id].choices = node.choices.map(choice => ({
        text: choice.text,
        nextId: choice.next_node_id
      }));
    }
  });
  
  return storyGraph;
};

// Mapeo de cuentos a storyKey (basado en títulos existentes)
const cuentoStoryKeyMap = {
  "El león y el ratón": "leon_raton",
  "Misterio de la noche": "two",
  "Nave espacial": "three"
};

// Mapeo de stories interactivas a storyKey
const storyStoryKeyMap = {
  "El Bosque Brillante": "forest"
};

const getUnifiedStories = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    const whereClause = {
      [Op.or]: [
        { esDefault: true },
        { userId: userId }
      ]
    };

    // Obtener cuentos lineales
    const cuentos = await Cuento.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'image', 'duration', 'category', 'contenido', 'esDefault'],
      order: [['esDefault', 'DESC'], ['createdAt', 'DESC']]
    });

    // Obtener stories interactivas
    const stories = await Story.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'description', 'image', 'duration', 'category', 'start_node_id', 'esDefault'],
      order: [['esDefault', 'DESC'], ['createdAt', 'DESC']]
    });

    // Unificar en el formato esperado por el frontend
    const unifiedStories = [];

    // Convertir cuentos a formato unificado
    cuentos.forEach((cuento, index) => {
      const storyKey = cuentoStoryKeyMap[cuento.title] || 
                      cuento.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
      
      unifiedStories.push({
        id: `cuento_${cuento.id}`,
        title: cuento.title,
        image: cuento.image,
        description: `${cuento.contenido.substring(0, 100)}...`, // Descripción basada en contenido
        duration: cuento.duration,
        category: cuento.category,
        storyKey: storyKey,
        type: 'cuento', // Identificador del tipo
        originalId: cuento.id
      });
    });

    // Convertir stories a formato unificado  
    stories.forEach((story, index) => {
      const storyKey = storyStoryKeyMap[story.title] || 
                      story.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
      
      unifiedStories.push({
        id: `story_${story.id}`,
        title: story.title,
        image: story.image,
        description: story.description,
        duration: story.duration,
        category: story.category,
        storyKey: storyKey,
        type: 'story', // Identificador del tipo
        originalId: story.id
      });
    });

    res.json({
      message: 'Historias unificadas obtenidas exitosamente',
      stories: unifiedStories
    });
  } catch (error) {
    console.error('Error al obtener historias unificadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getStoryGraphByKey = async (req, res) => {
  try {
    const { storyKey } = req.params;
    const userId = req.user ? req.user.id : null;

    // Primero verificar si hay un StoryGraph predefinido
    const predefinedGraph = getStoryGraph(storyKey);
    if (predefinedGraph) {
      // Buscar metadatos en cuentos o stories
      const cuentoTitle = Object.keys(cuentoStoryKeyMap).find(
        key => cuentoStoryKeyMap[key] === storyKey
      );

      if (cuentoTitle) {
        const cuento = await Cuento.findOne({
          where: {
            title: cuentoTitle,
            [Op.or]: [
              { esDefault: true },
              { userId: userId }
            ]
          }
        });

        if (cuento) {
          return res.json({
            message: 'StoryGraph obtenido exitosamente',
            storyKey,
            type: 'interactive', 
            graph: predefinedGraph,
            metadata: {
              title: cuento.title,
              image: cuento.image,
              duration: cuento.duration,
              category: cuento.category
            }
          });
        }
      }

      // Si no se encuentra en cuentos, buscar metadatos generales
      return res.json({
        message: 'StoryGraph obtenido exitosamente',
        storyKey,
        type: 'interactive',
        graph: predefinedGraph,
        metadata: {
          title: storyKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          duration: "5 min",
          category: "Fábulas Interactivas"
        }
      });
    }

    // Buscar en cuentos lineales (sin StoryGraph predefinido)
    const cuentoTitle = Object.keys(cuentoStoryKeyMap).find(
      key => cuentoStoryKeyMap[key] === storyKey
    );

    if (cuentoTitle) {
      const cuento = await Cuento.findOne({
        where: {
          title: cuentoTitle,
          [Op.or]: [
            { esDefault: true },
            { userId: userId }
          ]
        }
      });

      if (cuento) {
        const storyGraph = convertCuentoToStoryGraph(cuento);
        return res.json({
          message: 'StoryGraph obtenido exitosamente',
          storyKey,
          type: 'cuento',
          graph: storyGraph,
          metadata: {
            title: cuento.title,
            image: cuento.image,
            duration: cuento.duration,
            category: cuento.category
          }
        });
      }
    }

    // Buscar en stories interactivas de la base de datos
    const storyTitle = Object.keys(storyStoryKeyMap).find(
      key => storyStoryKeyMap[key] === storyKey
    );

    if (storyTitle) {
      const story = await Story.findOne({
        where: {
          title: storyTitle,
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

      if (story) {
        const storyGraph = convertStoryToStoryGraph(story);
        return res.json({
          message: 'StoryGraph obtenido exitosamente',
          storyKey,
          type: 'story',
          graph: storyGraph,
          metadata: {
            title: story.title,
            description: story.description,
            image: story.image,
            duration: story.duration,
            category: story.category
          }
        });
      }
    }

    res.status(404).json({ error: 'StoryGraph no encontrado para la clave proporcionada' });

  } catch (error) {
    console.error('Error al obtener StoryGraph:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
  getUnifiedStories,
  getStoryGraphByKey
};