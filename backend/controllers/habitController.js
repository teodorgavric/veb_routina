import asyncHandler from '../middleware/asyncHandler.js';
import Habit from '../models/habitModel.js';
import HabitLog from '../models/habitLogModel.js';
import { calculateCurrentStreak, calculateLongestStreak } from '../utils/streakCalculator.js';

/**
 * @desc    Get all active habits for the logged-in user
 * @route   GET /api/habits
 * @access  Private
 */
const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user._id, archivedAt: null }).sort({ createdAt: -1 });

    const habitsWithStreaks = await Promise.all(
        habits.map(async (habit) => {
            const currentStreak = await calculateCurrentStreak(HabitLog, habit._id);
            const longestStreak = await calculateLongestStreak(HabitLog, habit._id);
            return {
                ...habit.toObject(),
                currentStreak,
                longestStreak,
            };
        })
    );

    res.json(habitsWithStreaks);
});

/**
 * @desc    Get a single habit by ID
 * @route   GET /api/habits/:id
 * @access  Private
 */
const getHabitById = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit || habit.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Habit not found');
    }

    res.json(habit);
});

/**
 * @desc    Create a new habit
 * @route   POST /api/habits
 * @access  Private
 */
const createHabit = asyncHandler(async (req, res) => {
    const { name, description, category, icon, color, targetDays, reminderTime } = req.body;

    if (!name || !category) {
        res.status(400);
        throw new Error('Name and category are required');
    }

    const habit = await Habit.create({
        user: req.user._id,
        name,
        description,
        category,
        icon,
        color,
        targetDays,
        reminderTime,
    });

    res.status(201).json(habit);
});

/**
 * @desc    Update a habit
 * @route   PUT /api/habits/:id
 * @access  Private
 */
const updateHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit || habit.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Habit not found');
    }

    const { name, description, category, icon, color, targetDays, reminderTime } = req.body;

    habit.name = name ?? habit.name;
    habit.description = description ?? habit.description;
    habit.category = category ?? habit.category;
    habit.icon = icon ?? habit.icon;
    habit.color = color ?? habit.color;
    habit.targetDays = targetDays ?? habit.targetDays;
    habit.reminderTime = reminderTime ?? habit.reminderTime;

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
});

/**
 * @desc    Archive a habit
 * @route   PATCH /api/habits/:id/archive
 * @access  Private
 */
const archiveHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit || habit.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Habit not found');
    }

    habit.archivedAt = new Date();
    const archivedHabit = await habit.save();

    res.json(archivedHabit);
});

export { getHabits, getHabitById, createHabit, updateHabit, archiveHabit };