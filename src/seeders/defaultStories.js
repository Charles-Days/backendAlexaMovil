import { Story, StoryNode, StoryChoice } from '../index.js';

// Historia: El Bosque Brillante
const forestStory = {
  story: {
    title: "El Bosque Brillante",
    description: "Te despiertas en un bosque brillante. Un sendero se divide en dos. A la izquierda, calma; a la derecha, escuchas risas lejanas...",
    image: "https://img.lovepik.com/photo/60178/0375.jpg_wh860.jpg",
    duration: "5 min",
    category: "Aventura",
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

// Historia: Nave Espacial
const spaceStory = {
  story: {
    title: "Nave Espacial",
    description: "Despiertas en una cápsula criogénica. La nave está en silencio, pero una luz roja parpadea en el panel de mando.",
    image: "https://img.lovepik.com/photo/60178/0375.jpg_wh860.jpg",
    duration: "4 min",
    category: "Ciencia Ficción",
    start_node_id: "start",
    esDefault: true
  },
  nodes: {
    start: {
      content: "Despiertas en una cápsula criogénica. La nave está en silencio, pero una luz roja parpadea en el panel de mando.",
      choices: [
        { text: "Revisar el panel de mando", nextId: "panel1" },
        { text: "Explorar el pasillo principal", nextId: "hall1" }
      ]
    },
    panel1: {
      content: "El panel muestra una alerta: 'Fuga de oxígeno en el sector 7'.",
      choices: [
        { text: "Sellar el sector 7", nextId: "panel2A" },
        { text: "Ignorar y buscar a la tripulación", nextId: "panel2B" }
      ]
    },
    hall1: {
      content: "Caminas por el pasillo y encuentras un robot de servicio bloqueando el camino.",
      choices: [
        { text: "Hablar con el robot", nextId: "hall2A" },
        { text: "Buscar un atajo", nextId: "hall2B" }
      ]
    },
    panel2A: {
      content: "Sellas el sector, pero detectas movimiento no identificado en el hangar.",
      choices: [
        { text: "Ir al hangar", nextId: "finalA1" },
        { text: "Asegurar la cabina de mando", nextId: "finalA2" }
      ]
    },
    panel2B: {
      content: "No encuentras a nadie, pero oyes pasos metálicos acercándose.",
      choices: [
        { text: "Esconderte", nextId: "finalB1" },
        { text: "Enfrentarte a lo que sea", nextId: "finalB2" }
      ]
    },
    hall2A: {
      content: "El robot dice: 'Acceso restringido. Autorízate'.",
      choices: [
        { text: "Dar código de capitán", nextId: "finalC1" },
        { text: "Hackear al robot", nextId: "finalC2" }
      ]
    },
    hall2B: {
      content: "Encuentras una compuerta de mantenimiento abierta, pero escuchas ruidos adentro.",
      choices: [
        { text: "Entrar", nextId: "finalD1" },
        { text: "Buscar otra ruta", nextId: "finalD2" }
      ]
    },
    finalA1: { 
      content: "En el hangar descubres una nave alienígena acoplada. Fin.", 
      isEnding: true 
    },
    finalA2: { 
      content: "Aseguras la cabina, pero quedas atrapado en ella. Fin.", 
      isEnding: true 
    },
    finalB1: { 
      content: "Te escondes, pero algo te encuentra. Fin.", 
      isEnding: true 
    },
    finalB2: { 
      content: "Te enfrentas a un dron de seguridad fuera de control. Fin.", 
      isEnding: true 
    },
    finalC1: { 
      content: "El robot te reconoce como capitán y te escolta. Fin.", 
      isEnding: true 
    },
    finalC2: { 
      content: "Hackeas al robot, pero activa una alarma. Fin.", 
      isEnding: true 
    },
    finalD1: { 
      content: "Dentro hay un alienígena herido pidiendo ayuda. Fin.", 
      isEnding: true 
    },
    finalD2: { 
      content: "Encuentras una salida que lleva a la bodega. Fin.", 
      isEnding: true 
    }
  }
};

// Historia: Misterio de la Noche
const mysteryStory = {
  story: {
    title: "Misterio de la Noche",
    description: "Es medianoche en la ciudad. Un mensaje anónimo llega a tu teléfono: 'Si quieres la verdad, ve al muelle 14'.",
    image: "https://img.lovepik.com/photo/60178/0375.jpg_wh860.jpg",
    duration: "4 min",
    category: "Misterio",
    start_node_id: "start",
    esDefault: true
  },
  nodes: {
    start: {
      content: "Es medianoche en la ciudad. Un mensaje anónimo llega a tu teléfono: 'Si quieres la verdad, ve al muelle 14'.",
      choices: [
        { text: "Ir al muelle 14", nextId: "dock1" },
        { text: "Ignorar el mensaje y quedarte en casa", nextId: "home1" }
      ]
    },
    dock1: {
      content: "El muelle está desierto, salvo por un maletín apoyado contra una farola parpadeante.",
      choices: [
        { text: "Abrir el maletín", nextId: "dock2A" },
        { text: "Observar desde la distancia", nextId: "dock2B" }
      ]
    },
    home1: {
      content: "Intentas dormir, pero escuchas pasos afuera. Alguien toca la puerta tres veces.",
      choices: [
        { text: "Abrir la puerta", nextId: "home2A" },
        { text: "Mirar por la mirilla", nextId: "home2B" }
      ]
    },
    dock2A: {
      content: "Dentro hay fotos tuyas vigilándote durante semanas. Un sobre tiene la dirección de un almacén.",
      choices: [
        { text: "Ir al almacén", nextId: "finalA1" },
        { text: "Quemar las pruebas", nextId: "finalA2" }
      ]
    },
    dock2B: {
      content: "Ves a un hombre con sombrero acercarse. Susurra tu nombre y desaparece en la niebla.",
      choices: [
        { text: "Seguirlo", nextId: "finalB1" },
        { text: "Quedarte quieto", nextId: "finalB2" }
      ]
    },
    home2A: {
      content: "Un desconocido empapado te entrega una llave antigua y se marcha sin decir palabra.",
      choices: [
        { text: "Probar la llave en tu casa", nextId: "finalC1" },
        { text: "Guardarla para más tarde", nextId: "finalC2" }
      ]
    },
    home2B: {
      content: "Por la mirilla ves un sobre rojo. Dentro, una foto tuya en el muelle 14.",
      choices: [
        { text: "Ir al muelle", nextId: "finalD1" },
        { text: "Llamar a la policía", nextId: "finalD2" }
      ]
    },
    finalA1: { 
      content: "El almacén revela un centro de vigilancia clandestino. Tu nombre está en la lista. Fin.", 
      isEnding: true 
    },
    finalA2: { 
      content: "Quemaste el maletín, pero una sombra te observa desde un tejado. Fin.", 
      isEnding: true 
    },
    finalB1: { 
      content: "Lo sigues hasta un túnel donde desaparece frente a tus ojos. Fin.", 
      isEnding: true 
    },
    finalB2: { 
      content: "La figura se esfuma y quedas con más preguntas que respuestas. Fin.", 
      isEnding: true 
    },
    finalC1: { 
      content: "La llave abre una puerta secreta en tu sótano. Dentro, cajas con archivos de tu vida. Fin.", 
      isEnding: true 
    },
    finalC2: { 
      content: "Guardas la llave, pero al día siguiente ha desaparecido. Fin.", 
      isEnding: true 
    },
    finalD1: { 
      content: "El muelle está vacío, salvo por un teléfono que empieza a sonar. Fin.", 
      isEnding: true 
    },
    finalD2: { 
      content: "La policía llega, pero no encuentra nada. Solo queda el sobre rojo. Fin.", 
      isEnding: true 
    }
  }
};

// Historia: El León y el Ratón
const lionMouseStory = {
  story: {
    title: "El León y el Ratón",
    description: "Un león dormía plácidamente bajo un gran árbol. De pronto, un pequeño ratón corre por su cuerpo y lo despierta.",
    image: "https://www.chiquipedia.com/imagenes/el-raton-y-el-leon.jpg",
    duration: "3 min",
    category: "Fábulas",
    start_node_id: "start",
    esDefault: true
  },
  nodes: {
    start: {
      content: "Un león dormía plácidamente bajo un gran árbol. De pronto, un pequeño ratón corre por su cuerpo y lo despierta.",
      choices: [
        { text: "Atrapar al ratón", nextId: "catchMouse" },
        { text: "Dejarlo escapar", nextId: "letGo" }
      ]
    },
    catchMouse: {
      content: "El león atrapa al ratón con su gran garra. El ratón, temblando, le pide que lo perdone y promete ayudarlo algún día.",
      choices: [
        { text: "Perdonarlo", nextId: "letGo" },
        { text: "Comérselo", nextId: "finalEat" }
      ]
    },
    letGo: {
      content: "El león deja ir al ratón, pensando que un animal tan pequeño nunca podría ayudarle. Días después, el león cae en una trampa de cazadores.",
      choices: [
        { text: "Rugir pidiendo ayuda", nextId: "callForHelp" },
        { text: "Intentar romper la red solo", nextId: "tryAlone" }
      ]
    },
    callForHelp: {
      content: "El ratón escucha los rugidos y corre hacia el león. Comienza a roer las cuerdas de la red.",
      choices: [
        { text: "Agradecerle", nextId: "finalFree" },
        { text: "Seguir rugiendo", nextId: "finalFree" }
      ]
    },
    tryAlone: {
      content: "El león lucha con fuerza, pero las cuerdas son demasiado resistentes. Sin embargo, el ratón aparece y comienza a ayudarlo.",
      choices: [
        { text: "Agradecerle", nextId: "finalFree" },
        { text: "Seguir intentando romper la red", nextId: "finalFree" }
      ]
    },
    finalFree: {
      content: "El ratón logra liberar al león. El león, sorprendido y agradecido, comprende que incluso el más pequeño puede ayudar al más grande. Fin.",
      isEnding: true
    },
    finalEat: {
      content: "El león devora al ratón. Nunca descubre que un día ese pequeño habría podido salvarle la vida. Fin.",
      isEnding: true
    }
  }
};

const storiesData = [forestStory, spaceStory, mysteryStory, lionMouseStory];

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