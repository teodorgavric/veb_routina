import asyncHandler from '../middleware/asyncHandler.js';
import Badge from '../models/badgeModel.js';

/**
 * @desc    Get all badges for the logged-in user
 * @route   GET /api/badges
 * @access  Private
 */
const getBadges = asyncHandler(async (req, res) => {
    const badges = await Badge.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(badges);
});

export { getBadges };