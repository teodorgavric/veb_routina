import Badge from '../models/badgeModel.js';
import Habit from '../models/habitModel.js';
import HabitLog from '../models/habitLogModel.js';
import { calculateCurrentStreak, dateString } from './streakCalculator.js';

const checkAndAwardBadges = async (userId, habitId) => {
    const newBadges = [];

    const awardIfNew = async (type, extra = {}) => {
        const exists = await Badge.findOne({ user: userId, type });
        if (!exists) {
            const badge = await Badge.create({ user: userId, type, ...extra });
            newBadges.push(badge);
        }
    };

    const totalLogs = await HabitLog.countDocuments({ user: userId });
    if (totalLogs === 1) await awardIfNew('first_step');
    if (totalLogs >= 100) await awardIfNew('century');

    const currentStreak = await calculateCurrentStreak(HabitLog, habitId);
    if (currentStreak >= 7) await awardIfNew('on_a_roll');
    if (currentStreak >= 30) await awardIfNew('unstoppable');

    const habit = await Habit.findById(habitId);
    if (habit?.targetDays && currentStreak >= habit.targetDays) {
        await awardIfNew('goal_reached', { habitName: habit.name, targetDays: habit.targetDays });
    }

    const categories = await Habit.distinct('category', { user: userId, archivedAt: null });
    if (categories.length >= 3) await awardIfNew('variety_pack');

    const last7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return dateString(d);
    });
    const recentLogs = await HabitLog.find({ habit: habitId, date: { $in: last7 } });
    if (recentLogs.length === 7) await awardIfNew('perfectionist');

    return newBadges;
};

export default checkAndAwardBadges;