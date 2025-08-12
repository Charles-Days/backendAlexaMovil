import { Story, Decision, Option } from '../index.js';

const storiesData = [
  {
    story: {
      title: "La Aventura del Bosque Encantado",
      description: "Una historia interactiva donde explores un misterioso bosque lleno de criaturas mágicas y tomas decisiones que cambiarán tu destino.",
      image: "files/bosque-encantado.png",
      duration: "8 min",
      category: "Aventuras Interactivas",
      esDefault: true
    },
    decisions: [
      {
        number: 1,
        text: "Te encuentras en la entrada de un bosque encantado. Hay dos caminos: uno hacia la izquierda que brilla con una luz dorada, y otro hacia la derecha que está cubierto de niebla misteriosa. ¿Qué camino eliges?",
        options: [
          {
            text: "Tomar el camino dorado hacia la izquierda",
            next_decision_number: 2,
            ending_text: null
          },
          {
            text: "Aventurarse por el camino neblinoso hacia la derecha",
            next_decision_number: 3,
            ending_text: null
          }
        ]
      },
      {
        number: 2,
        text: "El camino dorado te lleva a un claro donde encuentras un unicornio herido. Sus ojos te miran con esperanza. ¿Qué decides hacer?",
        options: [
          {
            text: "Ayudar al unicornio con hierbas medicinales",
            next_decision_number: null,
            ending_text: "Tu bondad es recompensada. El unicornio se recupera y te otorga un cuerno mágico que te protegerá para siempre. Regresas a casa como un héroe bendecido por la magia."
          },
          {
            text: "Buscar ayuda en el pueblo cercano",
            next_decision_number: null,
            ending_text: "Corres al pueblo y regresas con un sanador. Juntos curan al unicornio, quien te agradece con una melodía mágica que siempre recordarás. Tu compasión salvó una vida mágica."
          }
        ]
      },
      {
        number: 3,
        text: "La niebla se disipa y te encuentras frente a una cabaña misteriosa. De su chimenea sale humo púrpura y escuchas risas extrañas desde adentro. ¿Qué haces?",
        options: [
          {
            text: "Tocar la puerta y entrar valientemente",
            next_decision_number: null,
            ending_text: "Dentro encuentras a una bruja amigable que te enseña pociones mágicas. Te conviertes en su aprendiz y aprendes los secretos de la magia. Tu aventura se convierte en una nueva vida llena de conocimiento místico."
          },
          {
            text: "Observar desde la ventana para ver qué sucede",
            next_decision_number: null,
            ending_text: "Descubres que la cabaña es una escuela de duendes traviesos. Te ríes tanto que te descubren, pero en lugar de enojarse, te invitan a sus juegos. Pasas la tarde más divertida de tu vida y regresas con historias increíbles."
          }
        ]
      }
    ]
  },
  {
    story: {
      title: "El Misterio del Castillo Perdido",
      description: "Explora un castillo abandonado donde cada decisión te acerca más a resolver un antiguo misterio o te aleja de la verdad.",
      image: "files/castillo-perdido.png",
      duration: "10 min",
      category: "Misterio Interactivo",
      esDefault: true
    },
    decisions: [
      {
        number: 1,
        text: "Llegas a un castillo abandonado en la cima de una montaña. La puerta principal está cerrada, pero ves una ventana abierta en el segundo piso y una entrada de servicio en la parte trasera. ¿Cómo entras?",
        options: [
          {
            text: "Escalar hasta la ventana del segundo piso",
            next_decision_number: 2,
            ending_text: null
          },
          {
            text: "Usar la entrada de servicio trasera",
            next_decision_number: 3,
            ending_text: null
          }
        ]
      },
      {
        number: 2,
        text: "Al entrar por la ventana, caes en una biblioteca polvorienta. Hay un libro abierto en el escritorio con escritura fresca, y escuchas pasos en el pasillo. ¿Qué haces?",
        options: [
          {
            text: "Leer el libro misterioso en el escritorio",
            next_decision_number: null,
            ending_text: "El libro revela el diario del último habitante del castillo. Descubres que escondió un tesoro en la torre norte. Siguiendo las pistas, encuentras un cofre lleno de joyas antiguas y documentos históricos invaluables."
          },
          {
            text: "Esconderte y observar quién hace los ruidos",
            next_decision_number: null,
            ending_text: "Descubres que es un fantasma amigable del antiguo bibliotecario. Te cuenta la historia del castillo y te muestra pasadizos secretos. Te conviertes en el guardián de sus secretos y historias."
          }
        ]
      },
      {
        number: 3,
        text: "La entrada trasera te lleva a las cocinas del castillo. Encuentras comida fresca en la mesa y escuchas música viniendo del gran salón. ¿Qué decides investigar?",
        options: [
          {
            text: "Seguir la música hacia el gran salón",
            next_decision_number: null,
            ending_text: "Encuentras a los fantasmas del castillo celebrando una fiesta eterna. Te invitan a unirte y descubres que son espíritus alegres que solo querían compañía. Decides visitarlos cada año en la misma fecha."
          },
          {
            text: "Investigar quién preparó la comida fresca",
            next_decision_number: null,
            ending_text: "Descubres que un ermitaño vive secretamente en el castillo, cuidándolo. Te enseña sobre su historia y se convierte en tu mentor. Aprendes oficios antiguos y sabiduría olvidada."
          }
        ]
      }
    ]
  }
];

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
        
        // Crear las decisiones y opciones
        for (const decisionData of storyData.decisions) {
          const decision = await Decision.create({
            story_id: story.id,
            number: decisionData.number,
            text: decisionData.text
          });
          
          // Crear las opciones para esta decisión
          for (const optionData of decisionData.options) {
            await Option.create({
              decision_id: decision.id,
              text: optionData.text,
              next_decision_number: optionData.next_decision_number,
              ending_text: optionData.ending_text
            });
          }
        }
        
        console.log(`Decisiones y opciones para "${storyData.story.title}" creadas exitosamente`);
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