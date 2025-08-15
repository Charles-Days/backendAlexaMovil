import express from 'express';
import { getUnifiedStories, getStoryGraphByKey } from '../controllers/unifiedStoriesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware para hacer la autenticación opcional
const optionalAuth = (req, res, next) => {
  if (req.headers.authorization) {
    return authenticateToken(req, res, next);
  }
  req.user = null;
  next();
};

// Obtener todas las historias unificadas (cuentos + stories)
router.get('/', optionalAuth, getUnifiedStories);

// Obtener StoryGraph específico por storyKey
router.get('/graph/:storyKey', optionalAuth, getStoryGraphByKey);

export default router;