export const two = {
  start: {
    id: "start",
    content: "En una noche oscura y misteriosa, te encuentras perdido en un bosque extraño. La luna se esconde tras las nubes y solo escuchas sonidos misteriosos.",
    choices: [
      { text: "Seguir el sendero principal", nextId: "mainPath" },
      { text: "Investigar los sonidos extraños", nextId: "sounds" }
    ]
  },

  mainPath: {
    id: "mainPath",
    content: "Sigues el sendero y encuentras una cabaña abandonada con una luz parpadeante en la ventana.",
    choices: [
      { text: "Entrar a la cabaña", nextId: "enterCabin" },
      { text: "Rodear la cabaña", nextId: "aroundCabin" }
    ]
  },

  sounds: {
    id: "sounds",
    content: "Te diriges hacia los sonidos y descubres que provienen de una antigua caja enterrada que brilla con luz propia.",
    choices: [
      { text: "Abrir la caja", nextId: "openBox" },
      { text: "Alejarte de la caja", nextId: "avoidBox" }
    ]
  },

  enterCabin: {
    id: "enterCabin",
    content: "Dentro de la cabaña encuentras un mapa antiguo que muestra la ubicación de las estrellas perdidas.",
    choices: [
      { text: "Seguir el mapa", nextId: "followMap" },
      { text: "Quedarte en la cabaña", nextId: "stayInCabin" }
    ]
  },

  aroundCabin: {
    id: "aroundCabin",
    content: "Al rodear la cabaña, descubres un jardín secreto lleno de flores que brillan en la oscuridad.",
    choices: [
      { text: "Recoger algunas flores", nextId: "pickFlowers" },
      { text: "Solo observar", nextId: "justWatch" }
    ]
  },

  openBox: {
    id: "openBox",
    content: "Al abrir la caja, una luz dorada sale de ella. Dentro encuentras todas las estrellas que se habían perdido del cielo nocturno.",
    choices: [
      { text: "Liberar las estrellas", nextId: "freeStars" },
      { text: "Guardar una estrella", nextId: "keepStar" }
    ]
  },

  avoidBox: {
    id: "avoidBox",
    content: "Te alejas de la caja pero la curiosidad te vence. Un susurro del viento te dice que las estrellas necesitan tu ayuda.",
    choices: [
      { text: "Regresar y abrir la caja", nextId: "openBox" },
      { text: "Continuar tu camino", nextId: "continuePath" }
    ]
  },

  freeStars: {
    id: "freeStars",
    content: "Liberas todas las estrellas al cielo. La noche se ilumina hermosamente y encuentras el camino a casa. Te conviertes en el guardián de las estrellas. Fin."
  },

  keepStar: {
    id: "keepStar",
    content: "Guardas una estrella como regalo y liberas el resto. La estrella te guía siempre en noches oscuras. Fin."
  },

  followMap: {
    id: "followMap",
    content: "Sigues el mapa y encuentras el lugar donde las estrellas cayeron. Las devuelves al cielo y la noche recupera su brillo. Fin."
  },

  stayInCabin: {
    id: "stayInCabin",
    content: "Te quedas en la cabaña hasta que amanece. Al salir, descubres que era la casa de un antiguo astrónomo que te enseña los secretos del cielo. Fin."
  },

  pickFlowers: {
    id: "pickFlowers",
    content: "Las flores brillantes te dan poderes especiales para iluminar la oscuridad. Te conviertes en el protector de la noche. Fin."
  },

  justWatch: {
    id: "justWatch",
    content: "Al observar en silencio, las flores te revelan el secreto para encontrar las estrellas perdidas. Completas tu misión y restauras la noche. Fin."
  },

  continuePath: {
    id: "continuePath",
    content: "Continúas tu camino pero siempre te preguntas qué habría pasado. La noche permanece oscura, pero has aprendido a valorar los misterios. Fin."
  }
};