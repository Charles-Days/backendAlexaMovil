import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getStories,
  getStoryById,
  startStory,
  makeChoice,
  getUserSessions
} from '../controllers/storiesController.js';

const router = express.Router();

router.get('/sessions', authenticateToken, getUserSessions);

router.get('/', authenticateToken, getStories);
router.get('/:id', authenticateToken, getStoryById);
router.post('/start', authenticateToken, startStory);
router.post('/choice', authenticateToken, makeChoice);


export default router;