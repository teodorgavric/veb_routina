import express from 'express';
const router = express.Router();
import { getTodayLogs, getWeekLogs, getAllLogs, getHabitLogs, createLog, deleteLog } from '../controllers/logController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/today', protect, getTodayLogs);
router.get('/week', protect, getWeekLogs);
router.get('/all', protect, getAllLogs);
router.get('/:habitId', protect, getHabitLogs);
router.post('/', protect, createLog);
router.delete('/:habitId', protect, deleteLog);

export default router;