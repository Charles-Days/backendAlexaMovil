import { Story, StoryNode, StoryChoice } from '../index.js';

// Historia basada en tu ejemplo del frontend
const exampleForest = {
  story: {
    title: "El Bosque Brillante",
    description: "Te despiertas en un bosque brillante. Un sendero se divide en dos. A la izquierda, calma; a la derecha, escuchas risas lejanas...",
    image: "files/bosque-brillante.png",
    duration: "6 min",
    category: "Aventuras Interactivas",
    start_node_id: "start",
    esDefault: true
  },
  nodes: {
    start: {
      content: "Te despiertas en un bosque brillante. Un sendero se divide en dos. A la izquierda, calma; a la derecha, escuchas risas lejanas...",
      choices: [
        { text: "Tomar el sendero izquierdo", nextId: "left1" },
        { text: "Ir por la derecha", nextId: "right1" }
      ]
    },
    left1: {
      content: "Avanzas por el sendero tranquilo y encuentras una señal de madera con símbolos extraños.",
      choices: [
        { text: "Seguir la señal", nextId: "left2A" },
        { text: "Ignorarla y continuar", nextId: "left2B" }
      ]
    },
    right1: {
      content: "Sigues las risas y hallas un claro con luciérnagas. Una figura con capa te saluda.",
      choices: [
        { text: "Saludar a la figura", nextId: "right2A" },
        { text: "Ocultarte y observar", nextId: "right2B" }
      ]
    },
    left2A: {
      content: "La señal te guía a un puente de piedra sobre un río esmeralda que susurra tu nombre.",
      choices: [
        { text: "Cruzar el puente", nextId: "finalA1" },
        { text: "Bordear el río", nextId: "finalA2" }
      ]
    },
    left2B: {
      content: "Ignoras la señal y descubres un árbol hueco que parece invitarte a entrar.",
      choices: [
        { text: "Entrar al árbol", nextId: "finalB1" },
        { text: "Rodearlo con cuidado", nextId: "finalB2" }
      ]
    },
    right2A: {
      content: "La figura ríe y te ofrece una moneda brillante: 'cara, guía; cruz, misterio'.",
      choices: [
        { text: "Elegir cara", nextId: "finalC1" },
        { text: "Elegir cruz", nextId: "finalC2" }
      ]
    },
    right2B: {
      content: "Desde las sombras ves un mapa grabado en una roca, marcado con una X.",
      choices: [
        { text: "Seguir el mapa", nextId: "finalD1" },
        { text: "Confiar en tu instinto", nextId: "finalD2" }
      ]
    },
    // Finales
    finalA1: { 
      content: "Cruzas el puente y el río te bendice con un camino dorado. Fin.", 
      isEnding: true 
    },
    finalA2: { 
      content: "Bordeas el río y una barca te lleva a casa. Fin.", 
      isEnding: true 
    },
    finalB1: { 
      content: "Dentro del árbol, un guardián te nombra Protector del Bosque. Fin.", 
      isEnding: true 
    },
    finalB2: { 
      content: "Rodeas el árbol y hallas un claro de descanso eterno. Fin.", 
      isEnding: true 
    },
    finalC1: { 
      content: "Cara: una estrella te guía al castillo de cristal. Fin.", 
      isEnding: true 
    },
    finalC2: { 
      content: "Cruz: un sendero secreto revela viejos amigos. Fin.", 
      isEnding: true 
    },
    finalD1: { 
      content: "Sigues la X y recuperas un tesoro olvidado. Fin.", 
      isEnding: true 
    },
    finalD2: { 
      content: "Tu instinto te lleva a la salida del bosque. Fin.", 
      isEnding: true 
    }
  }
};

// Segunda historia
const mysteriousIsland = {
  story: {
    title: "La Isla Misteriosa",
    description: "Naufragas en una isla desconocida. Cada decisión determina si encontrarás la salvación o quedarás atrapado para siempre.",
    image: "files/isla-misteriosa.png",
    duration: "8 min",
    category: "Aventuras Interactivas",
    start_node_id: "start",
    esDefault: true
  },
  nodes: {
    start: {
      content: "Despiertas en la orilla de una isla tropical. Ves humo a lo lejos y escuchas tambores. ¿Qué haces?",
      choices: [
        { text: "Seguir el humo", nextId: "smoke" },
        { text: "Ir hacia los tambores", nextId: "drums" }
      ]
    },
    smoke: {
      content: "El humo proviene de una fogata donde hay un anciano cocinando pescado. Te mira sonriendo.",
      choices: [
        { text: "Acercarte y saludar", nextId: "friendly" },
        { text: "Observar desde lejos", nextId: "cautious" }
      ]
    },
    drums: {
      content: "Los tambores te llevan a una ceremonia tribal. Los nativos bailan alrededor de una hoguera.",
      choices: [
        { text: "Unirte a la danza", nextId: "dance" },
        { text: "Quedarte escondido", nextId: "hide" }
      ]
    },
    friendly: {
      content: "El anciano comparte su comida contigo y te habla de un barco que viene cada luna llena.",
      choices: [
        { text: "Esperarlo en el muelle", nextId: "rescue1" },
        { text: "Preguntarle por tesoros", nextId: "treasure1" }
      ]
    },
    cautious: {
      content: "Desde tu escondite ves que el anciano construye una balsa. Podríías robársela o pedirla.",
      choices: [
        { text: "Pedirle ayuda", nextId: "help" },
        { text: "Tomar la balsa por la noche", nextId: "steal" }
      ]
    },
    dance: {
      content: "Los nativos te aceptan como uno de los suyos y te enseñan los secretos de la isla.",
      choices: [
        { text: "Quedarte para siempre", nextId: "stay" },
        { text: "Pedirles que te ayuden a escapar", nextId: "escape" }
      ]
    },
    hide: {
      content: "Descubres que están preparando un ritual para invocar un barco fantasma.",
      choices: [
        { text: "Interrumpir el ritual", nextId: "interrupt" },
        { text: "Esperar a ver qué pasa", nextId: "wait" }
      ]
    },
    // Finales
    rescue1: { 
      content: "El barco llega y te rescata. Regresas a casa con historias increíbles. Fin.", 
      isEnding: true 
    },
    treasure1: { 
      content: "El anciano te muestra un mapa del tesoro pirata. Te conviertes en cazatesoros. Fin.", 
      isEnding: true 
    },
    help: { 
      content: "El anciano acepta ayudarte. Construyen juntos una balsa mejor y escapas. Fin.", 
      isEnding: true 
    },
    steal: { 
      content: "Robas la balsa pero naufraga en una tormenta. Quedas atrapado para siempre. Fin.", 
      isEnding: true 
    },
    stay: { 
      content: "Te quedas en la isla y te conviertes en el líder de la tribu. Fin.", 
      isEnding: true 
    },
    escape: { 
      content: "Los nativos te ayudan a construir un barco. Escapas con nuevos amigos. Fin.", 
      isEnding: true 
    },
    interrupt: { 
      content: "Al interrumpir el ritual provocas la ira de los espíritus. Te convierten en estatua. Fin.", 
      isEnding: true 
    },
    wait: { 
      content: "El barco fantasma aparece y te ofrece un viaje eterno por los mares. Fin.", 
      isEnding: true 
    }
  }
};

const storiesData = [exampleForest, mysteriousIsland];

const seedDefaultStories = async () => {
  try {
    for (const storyData of storiesData) {
      // Verificar si la historia ya existe
      const existingStory = await Story.findOne({
        where: { title: storyData.story.title, esDefault: true }
      });
      
      if (!existingStory) {
        // Crear la historia
        const story = await Story.create(storyData.story);
        console.log(`Historia "${storyData.story.title}" creada exitosamente`);
        
        // Crear todos los nodos
        const createdNodes = {};
        for (const [nodeId, nodeData] of Object.entries(storyData.nodes)) {
          const node = await StoryNode.create({
            story_id: story.id,
            node_id: nodeId,
            content: nodeData.content,
            is_ending: nodeData.isEnding || false
          });
          createdNodes[nodeId] = node;
        }
        
        // Crear las opciones/choices
        for (const [nodeId, nodeData] of Object.entries(storyData.nodes)) {
          if (nodeData.choices) {
            const node = createdNodes[nodeId];
            for (const choice of nodeData.choices) {
              await StoryChoice.create({
                node_id: node.id,
                text: choice.text,
                next_node_id: choice.nextId
              });
            }
          }
        }
        
        console.log(`Nodos y opciones para "${storyData.story.title}" creados exitosamente`);
      } else {
        console.log(`Historia "${storyData.story.title}" ya existe`);
      }
    }
    console.log('Seeders de historias interactivas completados');
  } catch (error) {
    console.error('Error al crear historias interactivas por defecto:', error);
  }
};

export { seedDefaultStories };