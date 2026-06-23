import asyncHandler from '../middleware/asyncHandler.js';
import Habit from '../models/habitModel.js';
import HabitLog from '../models/habitLogModel.js';
import { calculateCurrentStreak, calculateLongestStreak, dateString } from '../utils/streakCalculator.js';

/**
 * @desc    Get habit completion counts for the last 30 days
 * @route   GET /api/stats/daily
 * @access  Private
 */
const getDailyStats = asyncHandler(async (req, res) => {
    const dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return dateString(d);
    });

    const logs = await HabitLog.find({ user: req.user._id, date: { $in: dates } });

    const counts = {};
    dates.forEach(date => { counts[date] = 0; });
    logs.forEach(log => { counts[log.date]++; });

    res.json(dates.map(date => ({ date, count: counts[date] })));
});

/**
 * @desc    Get per-habit stats (success rate, streaks) for active habits
 * @route   GET /api/stats/habits
 * @access  Private
 */
const getHabitStats = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user._id, archivedAt: null });

    const stats = await Promise.all(
        habits.map(async (habit) => {
            const totalLogs = await HabitLog.countDocuments({ habit: habit._id });
            const daysSince = Math.max(1, Math.ceil((Date.now() - habit.createdAt) / 86400000));
            const successRate = Math.round((totalLogs / daysSince) * 100);
            const currentStreak = await calculateCurrentStreak(HabitLog, habit._id);
            const longestStreak = await calculateLongestStreak(HabitLog, habit._id);

            return {
                ...habit.toObject(),
                totalLogs,
                daysSince,
                successRate,
                currentStreak,
                longestStreak,
            };
        })
    );

    res.json(stats);
});

export { getDailyStats, getHabitStats };