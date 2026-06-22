import express from 'express';
const router = express.Router();
import { getHabits, getHabitById, createHabit, updateHabit, archiveHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').get(protect, getHabitById).put(protect, updateHabit);
router.route('/:id/archive').patch(protect, archiveHabit);

export default router;