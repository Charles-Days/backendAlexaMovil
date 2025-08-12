import { Cuento, User } from '../index.js';
import { Op } from 'sequelize';

const getCuentos = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    const whereClause = {
      [Op.or]: [
        { esDefault: true },
        { userId: userId }
      ]
    };

    const cuentos = await Cuento.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'image', 'duration', 'category', 'contenido', 'esDefault'],
      order: [['esDefault', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      message: 'Cuentos obtenidos exitosamente',
      cuentos
    });
  } catch (error) {
    console.error('Error al obtener cuentos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getCuentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;

    const cuento = await Cuento.findOne({
      where: {
        id,
        [Op.or]: [
          { esDefault: true },
          { userId: userId }
        ]
      },
      attributes: ['id', 'title', 'image', 'duration', 'category', 'contenido', 'esDefault']
    });

    if (!cuento) {
      return res.status(404).json({ error: 'Cuento no encontrado' });
    }

    res.json({
      message: 'Cuento obtenido exitosamente',
      cuento
    });
  } catch (error) {
    console.error('Error al obtener cuento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createCuento = async (req, res) => {
  try {
    const { title, image, duration, category, contenido } = req.body;
    const userId = req.user.id;

    if (!title || !duration || !category || !contenido) {
      return res.status(400).json({ error: 'Título, duración, categoría y contenido son requeridos' });
    }

    const cuento = await Cuento.create({
      title,
      image,
      duration,
      category,
      contenido,
      userId,
      esDefault: false
    });

    res.status(201).json({
      message: 'Cuento creado exitosamente',
      cuento: {
        id: cuento.id,
        title: cuento.title,
        image: cuento.image,
        duration: cuento.duration,
        category: cuento.category,
        contenido: cuento.contenido,
        esDefault: cuento.esDefault
      }
    });
  } catch (error) {
    console.error('Error al crear cuento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateCuento = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, duration, category, contenido } = req.body;
    const userId = req.user.id;

    const cuento = await Cuento.findOne({
      where: {
        id,
        userId,
        esDefault: false
      }
    });

    if (!cuento) {
      return res.status(404).json({ error: 'Cuento no encontrado o no tienes permisos para editarlo' });
    }

    await cuento.update({ title, image, duration, category, contenido });

    res.json({
      message: 'Cuento actualizado exitosamente',
      cuento: {
        id: cuento.id,
        title: cuento.title,
        image: cuento.image,
        duration: cuento.duration,
        category: cuento.category,
        contenido: cuento.contenido,
        esDefault: cuento.esDefault
      }
    });
  } catch (error) {
    console.error('Error al actualizar cuento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteCuento = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cuento = await Cuento.findOne({
      where: {
        id,
        userId,
        esDefault: false
      }
    });

    if (!cuento) {
      return res.status(404).json({ error: 'Cuento no encontrado o no tienes permisos para eliminarlo' });
    }

    await cuento.destroy();

    res.json({
      message: 'Cuento eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar cuento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
  getCuentos,
  getCuentoById,
  createCuento,
  updateCuento,
  deleteCuento
};