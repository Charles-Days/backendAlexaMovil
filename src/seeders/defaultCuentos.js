import { Cuento } from '../index.js';

const cuentosDefault = [];

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