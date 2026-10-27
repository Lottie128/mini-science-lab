// Mini Science Lab - Achievement Badges
// Real rewards with clear criteria, icons, and XP bonuses!

const BADGES_DATA = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Set up your science profile and choose an avatar!',
    icon: '🚀',
    color: '#0284c7',
    xpReward: 50,
    category: 'Getting Started'
  },
  {
    id: 'safety_first',
    title: 'Safety First',
    description: 'Follow adult supervision and safety checklists in an experiment.',
    icon: '🛡️',
    color: '#10b981',
    xpReward: 50,
    category: 'Safety'
  },
  {
    id: 'magnet_master',
    title: 'Magnet Master',
    description: 'Discover the invisible magnetic force in Magnet Magic.',
    icon: '🧲',
    color: '#38bdf8',
    xpReward: 50,
    category: 'Physics'
  },
  {
    id: 'circuit_wizard',
    title: 'Circuit Wizard',
    description: 'Connect a battery and bulb to complete a working circuit.',
    icon: '⚡',
    color: '#fbbf24',
    xpReward: 50,
    category: 'Physics'
  },
  {
    id: 'space_explorer',
    title: 'Space Explorer',
    description: 'Travel through the cosmos in the Solar System simulator.',
    icon: '🪐',
    color: '#8b5cf6',
    xpReward: 50,
    category: 'Astronomy'
  },
  {
    id: 'water_wise',
    title: 'Water Wise',
    description: 'Track evaporation, condensation, and rain in the Water Cycle.',
    icon: '💧',
    color: '#06b6d4',
    xpReward: 50,
    category: 'Earth Science'
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Score 80% or higher on any science quiz!',
    icon: '🧠',
    color: '#ec4899',
    xpReward: 100,
    category: 'Knowledge'
  },
  {
    id: 'science_explorer',
    title: 'Science Explorer',
    description: 'Conduct and complete at least 5 different science experiments.',
    icon: '🔬',
    color: '#14b8a6',
    xpReward: 100,
    category: 'Lab Work'
  },
  {
    id: 'junior_chemist',
    title: 'Junior Chemist',
    description: 'Complete 2 or more foaming, colorful chemistry experiments.',
    icon: '⚗️',
    color: '#a855f7',
    xpReward: 75,
    category: 'Chemistry'
  },
  {
    id: 'field_researcher',
    title: 'Field Researcher',
    description: 'Record your own observation entry in My Science Journal.',
    icon: '📝',
    color: '#f97316',
    xpReward: 50,
    category: 'Research'
  },
  {
    id: 'science_superstar',
    title: 'Science Superstar',
    description: 'Reach Level 3: Junior Scientist ranking in Mini Science Lab.',
    icon: '🏆',
    color: '#eab308',
    xpReward: 100,
    category: 'Milestones'
  },
  {
    id: 'science_legend',
    title: 'Science Legend',
    description: 'Earn a grand total of 500+ XP across your science journey!',
    icon: '👑',
    color: '#f43f5e',
    xpReward: 150,
    category: 'Milestones'
  }
];

window.BADGES_DATA = BADGES_DATA;
