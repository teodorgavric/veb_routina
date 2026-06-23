const dateString = (date) => date.toISOString().split('T')[0];

const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return dateString(d);
};

const calculateCurrentStreak = async (HabitLog, habitId) => {
    const logs = await HabitLog.find({ habit: habitId }).sort({ date: -1 });
    const logDates = new Set(logs.map(l => l.date));
    let streak = 0;
    const d = new Date();
    while (logDates.has(dateString(d))) {
        streak++;
        d.setDate(d.getDate() - 1);
    }
    return streak;
};

const calculateLongestStreak = async (HabitLog, habitId) => {
    const logs = await HabitLog.find({ habit: habitId }).sort({ date: 1 });
    if (!logs.length) return 0;
    let max = 1, current = 1;
    for (let i = 1; i < logs.length; i++) {
        const prev = new Date(logs[i - 1].date);
        const curr = new Date(logs[i].date);
        const diff = (curr - prev) / 86400000;
        if (diff === 1) { current++; max = Math.max(max, current); }
        else current = 1;
    }
    return max;
};

export { calculateCurrentStreak, calculateLongestStreak, dateString };