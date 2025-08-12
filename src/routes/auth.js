import express from 'express';
import { login, register, getUserById } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user/:id', getUserById);

export default router;