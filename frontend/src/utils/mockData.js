export const HABIT_COLORS = ['#FF6B6B','#FF9F43','#48CAE4','#06D6A0','#A78BFA','#F472B6','#FFD166','#4ECDC4'];

export const CATEGORIES = ['Health','Fitness','Study','Work','Mindfulness','Other'];

export const CATEGORY_ICONS = {
  Health: 'Heart',
  Fitness: 'Dumbbell',
  Study: 'BookOpen',
  Work: 'Briefcase',
  Mindfulness: 'Brain',
  Other: 'Star'
};

export const HABIT_TEMPLATES = [
  { name: 'Morning Run', category: 'Fitness', icon: 'Bike', color: '#48CAE4' },
  { name: 'Read 20 pages', category: 'Study', icon: 'BookOpen', color: '#06D6A0' },
  { name: 'Drink 8 glasses of water', category: 'Health', icon: 'Droplets', color: '#FF6B6B' },
  { name: 'Meditate 10 min', category: 'Mindfulness', icon: 'Moon', color: '#A78BFA' },
];

export const BADGE_DEFINITIONS = [
  { type: 'first_step', name: 'First Step', description: 'Complete your first habit', icon: 'Footprints' },
  { type: 'on_a_roll', name: 'On a Roll', description: '7-day streak on any habit', icon: 'Flame' },
  { type: 'unstoppable', name: 'Unstoppable', description: '30-day streak on any habit', icon: 'Zap' },
  { type: 'variety_pack', name: 'Variety Pack', description: 'Create habits in 3+ categories', icon: 'Layers' },
  { type: 'century', name: 'Century', description: '100 total completions', icon: 'Trophy' },
  { type: 'perfectionist', name: 'Perfectionist', description: '100% success rate over 7 days', icon: 'Target' },
  { type: 'goal_reached', name: 'Goal Reached', description: 'Reach your personal target', icon: 'Award' },
];

export const mockHabits = [
  { _id: '1', name: 'Morning Run', category: 'Fitness', icon: 'Bike', color: '#48CAE4', currentStreak: 12, longestStreak: 15, successRate: 85, targetDays: 30, createdAt: '2025-01-01' },
  { _id: '2', name: 'Read 20 pages', category: 'Study', icon: 'BookOpen', color: '#06D6A0', currentStreak: 5, longestStreak: 21, successRate: 72, targetDays: null, createdAt: '2025-01-05' },
  { _id: '3', name: 'Drink water', category: 'Health', icon: 'Droplets', color: '#FF6B6B', currentStreak: 3, longestStreak: 10, successRate: 60, targetDays: null, createdAt: '2025-01-10' },
  { _id: '4', name: 'Meditate', category: 'Mindfulness', icon: 'Moon', color: '#A78BFA', currentStreak: 7, longestStreak: 7, successRate: 90, targetDays: 21, createdAt: '2025-01-12' },
];

export const mockCompletedToday = ['1', '3'];

export const mockBadges = [
  { type: 'first_step', earnedAt: '2025-01-02' },
  { type: 'on_a_roll', earnedAt: '2025-01-20', habitName: 'Morning Run' },
];

export const mockWeekData = {
  'Mon': ['1','3'], 'Tue': ['1','2','3'], 'Wed': ['1'],
  'Thu': ['1','2','3','4'], 'Fri': ['1','3','4'], 'Sat': ['2'], 'Sun': []
};

export const mockDailyStats = Array.from({length: 30}, (_, i) => ({
  date: new Date(Date.now() - (29-i)*86400000).toISOString().split('T')[0],
  count: Math.floor(Math.random() * 4)
}));

export const mockUser = { _id: 'u1', name: 'Teodor', email: 'teodor@example.com', role: 'user', createdAt: '2025-01-01' };
