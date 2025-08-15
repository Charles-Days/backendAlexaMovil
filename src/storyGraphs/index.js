import { leonRaton } from './leonRaton.js';
import { two } from './two.js';
import { three } from './three.js';
import { forest } from './forest.js';

// Mapeo de storyKey a StoryGraph
export const storyGraphs = {
  // Historias principales del frontend
  "forest": forest,        // El Bosque Brillante (interactiva)
  "leon_raton": leonRaton, // El león y el ratón (interactiva)
  "two": two,             // Misterio de la noche (interactiva)
  "three": three          // Nave espacial (interactiva)
};

// Función helper para obtener un StoryGraph
export const getStoryGraph = (storyKey) => {
  return storyGraphs[storyKey] || null;
};