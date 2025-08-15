export const tortugaLiebre = {
  start: {
    id: "start",
    content: "La tortuga y la liebre decidieron hacer una carrera. La liebre, muy confiada, se burló de la lentitud de la tortuga.",
    choices: [
      { text: "La tortuga acepta el desafío", nextId: "raceStart" },
      { text: "La tortuga se retira por las burlas", nextId: "tortugaRetires" }
    ]
  },

  raceStart: {
    id: "raceStart", 
    content: "La carrera comenzó. La liebre corrió muy rápido y pronto tomó una gran ventaja sobre la tortuga.",
    choices: [
      { text: "La liebre decide descansar", nextId: "liebreRests" },
      { text: "La liebre sigue corriendo", nextId: "liebreContinues" }
    ]
  },

  tortugaRetires: {
    id: "tortugaRetires",
    content: "La tortuga se sintió desanimada por las burlas y decidió retirarse. La liebre ganó sin esfuerzo, pero no aprendió nada sobre humildad. Fin."
  },

  liebreRests: {
    id: "liebreRests",
    content: "La liebre decidió tomar una siesta bajo un árbol, pensando que tenía tiempo de sobra. Mientras tanto, la tortuga siguió caminando lentamente.",
    choices: [
      { text: "La liebre duerme profundamente", nextId: "finalTortugaWins" },
      { text: "La liebre despierta pronto", nextId: "liebreWakes" }
    ]
  },

  liebreContinues: {
    id: "liebreContinues",
    content: "La liebre siguió corriendo y llegó primera a la meta. Ganó fácilmente, pero se perdió la lección de que la constancia también es importante. Fin."
  },

  liebreWakes: {
    id: "liebreWakes",
    content: "La liebre despertó y vio que la tortuga estaba cerca de la meta. Corrió lo más rápido que pudo.",
    choices: [
      { text: "La liebre llega primera", nextId: "finalLiebreWins" },
      { text: "La tortuga llega primera", nextId: "finalTortugaWins" }
    ]
  },

  finalTortugaWins: {
    id: "finalTortugaWins", 
    content: "Cuando la liebre despertó, vio que la tortuga había llegado primera a la meta. La tortuga había demostrado que la constancia y perseverancia vencen a la velocidad sin esfuerzo. Fin."
  },

  finalLiebreWins: {
    id: "finalLiebreWins",
    content: "La liebre logró llegar primera por muy poco. Aunque ganó, reconoció el valor de la perseverancia de la tortuga y aprendió a no subestimar a otros. Fin."
  }
};