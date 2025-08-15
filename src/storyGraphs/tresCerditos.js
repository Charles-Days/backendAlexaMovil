export const tresCerditos = {
  start: {
    id: "start",
    content: "Tres cerditos hermanos decidieron construir sus propias casas. Cada uno eligió un material diferente.",
    choices: [
      { text: "Ver qué construye el primer cerdito", nextId: "firstPig" },
      { text: "Saltar al encuentro con el lobo", nextId: "wolfArrives" }
    ]
  },

  firstPig: {
    id: "firstPig",
    content: "El primer cerdito, perezoso, construyó su casa de paja muy rápidamente. El segundo usó madera, y el tercero, trabajador, construyó con ladrillo.",
    choices: [
      { text: "El lobo llega hambriento", nextId: "wolfArrives" },
      { text: "Los cerditos disfrutan sus casas", nextId: "peaceful" }
    ]
  },

  peaceful: {
    id: "peaceful",
    content: "Los cerditos vivieron tranquilos por un tiempo, pero un día el lobo feroz llegó al bosque con mucha hambre.",
    choices: [
      { text: "El lobo va a la casa de paja", nextId: "wolfAtStraw" },
      { text: "El lobo va directo a la casa de ladrillo", nextId: "wolfAtBrick" }
    ]
  },

  wolfArrives: {
    id: "wolfArrives",
    content: "El lobo feroz llegó hambriento y se dirigió a la casa de paja del primer cerdito.",
    choices: [
      { text: "El lobo sopla la casa", nextId: "wolfAtStraw" },
      { text: "El cerdito intenta negociar", nextId: "negotiate" }
    ]
  },

  negotiate: {
    id: "negotiate",
    content: "El primer cerdito intentó hablar con el lobo, pero este tenía demasiada hambre para escuchar razones.",
    choices: [
      { text: "El lobo sopla la casa", nextId: "wolfAtStraw" },
      { text: "El cerdito escapa antes", nextId: "escape" }
    ]
  },

  escape: {
    id: "escape",
    content: "El primer cerdito corrió hacia la casa de madera de su hermano justo a tiempo.",
    choices: [
      { text: "El lobo los encuentra", nextId: "wolfAtWood" },
      { text: "Se esconden bien", nextId: "hideWell" }
    ]
  },

  wolfAtStraw: {
    id: "wolfAtStraw",
    content: "El lobo sopló y sopló, y la casa de paja voló. El primer cerdito corrió hacia la casa de madera.",
    choices: [
      { text: "El lobo persigue al cerdito", nextId: "wolfAtWood" },
      { text: "El lobo se distrae", nextId: "wolfDistracted" }
    ]
  },

  wolfDistracted: {
    id: "wolfDistracted",
    content: "El lobo se distrajo persiguiendo mariposas. Los cerditos aprovecharon para reunirse en la casa de ladrillo.",
    choices: [
      { text: "El lobo los encuentra más tarde", nextId: "wolfAtBrick" },
      { text: "El lobo se va del bosque", nextId: "finalPeace" }
    ]
  },

  wolfAtWood: {
    id: "wolfAtWood",
    content: "El lobo llegó a la casa de madera y sopló hasta derribarla. Los dos cerditos corrieron hacia la casa de ladrillo.",
    choices: [
      { text: "El lobo los sigue", nextId: "wolfAtBrick" },
      { text: "Los cerditos llegan seguros", nextId: "safeBrick" }
    ]
  },

  hideWell: {
    id: "hideWell",
    content: "Los cerditos se escondieron tan bien que el lobo no los encontró y se fue con hambre.",
    choices: [
      { text: "Construir casas más fuertes", nextId: "finalLesson" },
      { text: "El lobo regresa otro día", nextId: "wolfReturns" }
    ]
  },

  wolfReturns: {
    id: "wolfReturns",
    content: "Al día siguiente, el lobo regresó más determinado y encontró a todos en la casa de ladrillo.",
    choices: [
      { text: "El lobo ataca la casa", nextId: "wolfAtBrick" }
    ]
  },

  safeBrick: {
    id: "safeBrick",
    content: "Los tres cerditos se refugiaron en la fuerte casa de ladrillo justo a tiempo.",
    choices: [
      { text: "El lobo intenta entrar", nextId: "wolfAtBrick" }
    ]
  },

  wolfAtBrick: {
    id: "wolfAtBrick",
    content: "El lobo sopló y sopló, pero la casa de ladrillo no se movió. Intentó bajar por la chimenea.",
    choices: [
      { text: "Los cerditos ponen una olla de agua caliente", nextId: "finalVictory" },
      { text: "Los cerditos escapan por la puerta trasera", nextId: "finalEscape" }
    ]
  },

  finalVictory: {
    id: "finalVictory",
    content: "El lobo cayó en la olla de agua caliente y salió corriendo. Los tres cerditos vivieron seguros y aprendieron que el trabajo duro y la planificación nos protegen. Fin."
  },

  finalEscape: {
    id: "finalEscape", 
    content: "Los cerditos escaparon y construyeron nuevas casas, todas de ladrillo. Vivieron seguros sabiendo que la preparación es clave. Fin."
  },

  finalPeace: {
    id: "finalPeace",
    content: "El lobo se fue del bosque y nunca regresó. Los cerditos vivieron en paz, pero el tercero se sintió orgulloso de haber elegido construir con ladrillo. Fin."
  },

  finalLesson: {
    id: "finalLesson",
    content: "Los tres hermanos construyeron nuevas casas, todas de ladrillo, entendiendo que el esfuerzo extra vale la pena para estar seguros. Fin."
  }
};