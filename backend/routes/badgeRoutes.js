import express from 'express';
const router = express.Router();
import { getBadges } from '../controllers/badgeController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/', protect, getBadges);

export default router;