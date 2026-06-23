import express from 'express';
const router = express.Router();
import { getDailyStats, getHabitStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/daily', protect, getDailyStats);
router.get('/habits', protect, getHabitStats);

export default router;