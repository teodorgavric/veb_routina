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