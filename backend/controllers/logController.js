import asyncHandler from '../middleware/asyncHandler.js';
import HabitLog from '../models/habitLogModel.js';
import Habit from '../models/habitModel.js';
import { dateString } from '../utils/streakCalculator.js';

/**
 * @desc    Check for newly earned badges (stub — implemented in a later commit)
 */
const checkAndAwardBadges = async (userId) => {
    return [];
};

/**
 * @desc    Get today's completed habit IDs for the logged-in user
 * @route   GET /api/logs/today
 * @access  Private
 */
const getTodayLogs = asyncHandler(async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const logs = await HabitLog.find({ user: req.user._id, date: today });

    res.json(logs.map(log => log.habit));
});

/**
 * @desc    Get logs grouped by date for the last 7 days
 * @route   GET /api/logs/week
 * @access  Private
 */
const getWeekLogs = asyncHandler(async (req, res) => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(dateString(d));
    }

    const logs = await HabitLog.find({ user: req.user._id, date: { $in: dates } });

    const grouped = {};
    dates.forEach(date => { grouped[date] = []; });
    logs.forEach(log => {
        grouped[log.date].push(log.habit);
    });

    res.json(grouped);
});

/**
 * @desc    Get all logs for the logged-in user
 * @route   GET /api/logs/all
 * @access  Private
 */
const getAllLogs = asyncHandler(async (req, res) => {
    const logs = await HabitLog.find({ user: req.user._id });

    res.json(logs.map(log => ({ date: log.date, habit: log.habit })));
});

/**
 * @desc    Get all logs for a specific habit
 * @route   GET /api/logs/:habitId
 * @access  Private
 */
const getHabitLogs = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.habitId);

    if (!habit || habit.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Habit not found');
    }

    const logs = await HabitLog.find({ habit: req.params.habitId });

    res.json(logs);
});

/**
 * @desc    Create a log entry for today
 * @route   POST /api/logs
 * @access  Private
 */
const createLog = asyncHandler(async (req, res) => {
    const { habitId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const existingLog = await HabitLog.findOne({ habit: habitId, date: today });

    if (existingLog) {
        res.status(400);
        throw new Error('Habit already logged today');
    }

    const log = await HabitLog.create({
        habit: habitId,
        user: req.user._id,
        date: today,
    });

    const newBadges = await checkAndAwardBadges(req.user._id);

    res.status(201).json({ log, newBadges });
});

export { getTodayLogs, getWeekLogs, getAllLogs, getHabitLogs, createLog };