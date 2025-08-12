import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getCuentos,
  getCuentoById,
  createCuento,
  updateCuento,
  deleteCuento
} from '../controllers/cuentosController.js';

const router = express.Router();

router.get('/', authenticateToken, getCuentos);
router.get('/:id', authenticateToken, getCuentoById);
router.post('/', authenticateToken, createCuento);
router.put('/:id', authenticateToken, updateCuento);
router.delete('/:id', authenticateToken, deleteCuento);

export default router;