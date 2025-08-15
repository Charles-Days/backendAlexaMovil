export const three = {
  start: {
    id: "start",
    content: "Eres el capitán de la nave espacial Esperanza en el año 2150. Has recibido una señal misteriosa desde un planeta desconocido. Tu tripulación te mira esperando órdenes.",
    choices: [
      { text: "Investigar la señal", nextId: "investigate" },
      { text: "Ignorar la señal y continuar la misión", nextId: "ignoreSig nal" }
    ]
  },

  investigate: {
    id: "investigate",
    content: "Diriges la nave hacia el origen de la señal. Al acercarse al planeta, ves una hermosa civilización de seres de luz que brillan como estrellas.",
    choices: [
      { text: "Intentar comunicarte", nextId: "communicate" },
      { text: "Observar desde la distancia", nextId: "observe" }
    ]
  },

  ignoreSignal: {
    id: "ignoreSignal",
    content: "Decides continuar con la misión original, pero la señal se hace más fuerte. Tu tripulación comienza a tener sueños extraños sobre seres de luz.",
    choices: [
      { text: "Cambiar de opinión y investigar", nextId: "investigate" },
      { text: "Mantener el curso", nextId: "stayOnCourse" }
    ]
  },

  communicate: {
    id: "communicate",
    content: "Los seres de luz responden con alegría. Han estado esperando visitantes de la Tierra durante siglos. Te invitan a su ciudad cristalina.",
    choices: [
      { text: "Aceptar la invitación", nextId: "acceptInvite" },
      { text: "Ser cauteloso", nextId: "beCautious" }
    ]
  },

  observe: {
    id: "observe",
    content: "Desde la distancia observas su tecnología avanzada. Usan la energía de las estrellas para vivir en armonía perfecta con el universo.",
    choices: [
      { text: "Acercarte para aprender", nextId: "learnTech" },
      { text: "Documentar y regresar", nextId: "document" }
    ]
  },

  stayOnCourse: {
    id: "stayOnCourse",
    content: "Mantienes el curso pero la tripulación está inquieta. La señal finalmente se desvanece y te preguntas toda la vida qué podría haber sido. Fin."
  },

  acceptInvite: {
    id: "acceptInvite",
    content: "Visitas su ciudad y aprendes sobre la armonía cósmica. Los seres de luz te enseñan tecnología para sanar planetas y vivir en paz.",
    choices: [
      { text: "Regresar a la Tierra con el conocimiento", nextId: "returnWithKnowledge" },
      { text: "Quedarte y aprender más", nextId: "stayAndLearn" }
    ]
  },

  beCautious: {
    id: "beCautious",
    content: "Tu cautela es respetada. Los seres de luz envían un embajador a tu nave para demostrar sus intenciones pacíficas.",
    choices: [
      { text: "Confiar en el embajador", nextId: "trustAmbassador" },
      { text: "Mantener distancia", nextId: "keepDistance" }
    ]
  },

  learnTech: {
    id: "learnTech",
    content: "Te acercas y los seres de luz comparten su tecnología estelar contigo. Aprendes a comunicarte con las estrellas mismas.",
    choices: [
      { text: "Usar el conocimiento para ayudar a la humanidad", nextId: "helpHumanity" },
      { text: "Explorar más secretos del universo", nextId: "exploreSecrets" }
    ]
  },

  document: {
    id: "document",
    content: "Documentas todo cuidadosamente y regresas a la Tierra. Tu informe cambia la comprensión humana del universo. Fin."
  },

  returnWithKnowledge: {
    id: "returnWithKnowledge",
    content: "Regresas a la Tierra con tecnología para sanar el planeta y establecer paz duradera. Te conviertes en el embajador entre mundos. Fin."
  },

  stayAndLearn: {
    id: "stayAndLearn",
    content: "Te quedas para aprender más. Con el tiempo, te conviertes en un puente entre la humanidad y las civilizaciones cósmicas. Fin."
  },

  trustAmbassador: {
    id: "trustAmbassador",
    content: "El embajador te enseña los secretos de la navegación estelar. Tu nave se convierte en la primera en viajar entre galaxias. Fin."
  },

  keepDistance: {
    id: "keepDistance",
    content: "Mantienes la distancia pero estableces comunicación diplomática. Creas el primer tratado intergaláctico de paz. Fin."
  },

  helpHumanity: {
    id: "helpHumanity",
    content: "Usas el conocimiento estelar para resolver los problemas de la Tierra. La humanidad entra en una nueva era dorada. Fin."
  },

  exploreSecrets: {
    id: "exploreSecrets",
    content: "Te conviertes en un explorador cósmico, descubriendo los misterios más profundos del universo junto a los seres de luz. Fin."
  }
};