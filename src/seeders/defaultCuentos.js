import { Cuento } from '../index.js';

const cuentosDefault = [
  {
    title: "La Tortuga y la Liebre",
    image: "files/tortuga-liebre.png",
    duration: "3 min",
    category: "Fábulas",
    contenido: "Había una vez una tortuga y una liebre que decidieron hacer una carrera. La liebre, muy confiada en su velocidad, se durmió a mitad del camino. Mientras tanto, la tortuga siguió caminando lentamente pero sin parar. Cuando la liebre despertó, vio que la tortuga había llegado primero a la meta. Moraleja: La constancia y la perseverancia vencen a la velocidad sin esfuerzo.",
    esDefault: true
  },
  {
    title: "Los Tres Cerditos",
    image: "files/tres-cerditos.png",
    duration: "4 min",
    category: "Cuentos Clásicos",
    contenido: "Tres cerditos construyeron sus casas: uno de paja, otro de madera y el tercero de ladrillo. Cuando llegó el lobo feroz, sopló y derribó las casas de paja y madera, pero no pudo con la de ladrillo. Los tres cerditos se refugiaron en la casa más fuerte y vivieron seguros. Moraleja: El trabajo duro y la planificación nos protegen de los peligros.",
    esDefault: true
  },
  {
    title: "Caperucita Roja",
    image: "files/caperucita-roja.png",
    duration: "5 min",
    category: "Cuentos Clásicos",
    contenido: "Caperucita Roja iba por el bosque a llevar comida a su abuelita cuando se encontró con el lobo. El lobo corrió a la casa de la abuela, se la comió y se disfrazó de ella. Cuando llegó Caperucita, notó que algo extraño pasaba con su abuela. Un cazador que pasaba por ahí escuchó los gritos y salvó a Caperucita y a su abuelita. Moraleja: Debemos ser cautelosos con los extraños.",
    esDefault: true
  },
  {
    title: "El Patito Feo",
    image: "files/patito-feo.png",
    duration: "4 min",
    category: "Cuentos de Hadas",
    contenido: "Un patito nació diferente a sus hermanos. Todos se burlaban de él por su aspecto. Triste y solo, decidió marcharse. Durante el invierno sufrió mucho, pero cuando llegó la primavera, se miró en el agua y descubrió que se había convertido en un hermoso cisne. Moraleja: Todos tenemos nuestro momento para brillar, solo hay que tener paciencia.",
    esDefault: true
  },
  {
    title: "La Hormiga y la Cigarra",
    image: "files/hormiga-cigarra.png",
    duration: "3 min",
    category: "Fábulas",
    contenido: "Durante el verano, la hormiga trabajaba duro recolectando comida para el invierno, mientras la cigarra cantaba y se divertía. Cuando llegó el frío, la cigarra no tenía nada que comer y pidió ayuda a la hormiga. La hormiga, recordando su pereza, le enseñó la importancia del trabajo. Moraleja: Es importante trabajar y prepararse para el futuro.",
    esDefault: true
  }
];

const seedDefaultCuentos = async () => {
  try {
    for (const cuentoData of cuentosDefault) {
      const existingCuento = await Cuento.findOne({
        where: { title: cuentoData.title, esDefault: true }
      });
      
      if (!existingCuento) {
        await Cuento.create(cuentoData);
        console.log(`Cuento "${cuentoData.title}" creado exitosamente`);
      } else {
        console.log(`Cuento "${cuentoData.title}" ya existe`);
      }
    }
    console.log('Seeders de cuentos completados');
  } catch (error) {
    console.error('Error al crear cuentos por defecto:', error);
  }
};

export { seedDefaultCuentos };