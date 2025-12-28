
export const levelTiers = {
  bronze: { min: 1, max: 5, color: "from-amber-600 to-amber-700", label: "Beginner" },
  silver: { min: 6, max: 10, color: "from-slate-400 to-slate-500", label: "Intermediate" },
  gold: { min: 11, max: 15, color: "from-yellow-400 to-amber-500", label: "Advanced" },
  platinum: { min: 16, max: 20, color: "from-cyan-300 to-blue-400", label: "Expert" },
  diamond: { min: 21, max: 100, color: "from-violet-400 to-purple-500", label: "Master" },
};

export const levelTitles = {
  1: "Novice Learner",
  2: "Curious Mind",
  3: "Knowledge Seeker",
  4: "Quick Study",
  5: "Rising Star",
  6: "Dedicated Scholar",
  7: "Focused Learner",
  8: "Skill Builder",
  9: "Progress Maker",
  10: "Achievement Hunter",
  11: "Knowledge Knight",
  12: "Python Apprentice",
  13: "Data Explorer",
  14: "Logic Master",
  15: "Code Warrior",
  16: "Elite Scholar",
  17: "Wisdom Seeker",
  18: "Expert Mind",
  19: "Mastery Path",
  20: "Grand Scholar",
  21: "Legendary Learner",
};

// XP earning rules
export const xpRules = {
  completeQuiz: 100,
  perfectScore: 50,
  completeModule: 150,
  dailyLogin: 10,
  streak7Days: 200,
  streak30Days: 1000,
  firstQuizAttempt: 25,
  helpInDiscussions: 25,
  courseCompletion: 500,
  earnBadge: 75,
};

// Current player stats
export const playerStats = {
  currentLevel: 12,
  levelTitle: "Python Apprentice",
  currentXP: 2450,
  xpToNextLevel: 3000,
  totalXP: 14450,
  tier: "gold",
  currentStreak: 12,
  longestStreak: 23,
  totalPoints: 4850,
  rank: 15,
  totalStudents: 50,
  badges: [
    { id: "b1", name: "First Steps", icon: "🎯", description: "Complete your first quiz", unlockedAt: "2 months ago", locked: false },
    { id: "b2", name: "Perfect Score", icon: "💯", description: "Score 100% on any quiz", unlockedAt: "3 weeks ago", locked: false },
    { id: "b3", name: "Week Warrior", icon: "🔥", description: "Maintain a 7-day streak", unlockedAt: "1 week ago", locked: false },
    { id: "b4", name: "Quick Learner", icon: "⚡", description: "Complete 5 modules in one day", unlockedAt: "5 days ago", locked: false },
    { id: "b5", name: "Course Champion", icon: "🏆", description: "Complete a full course", unlockedAt: "3 days ago", locked: false },
    { id: "b6", name: "Month Master", icon: "👑", description: "Maintain a 30-day streak", locked: true },
    { id: "b7", name: "Top 10", icon: "🥇", description: "Reach the top 10 leaderboard", locked: true },
    { id: "b8", name: "Quiz Master", icon: "🧠", description: "Complete 50 quizzes", locked: true },
  ],
  achievements: [
    { id: "a1", title: "Quiz Taker", description: "Complete 50 quizzes", icon: "📝", progress: 47, total: 50, completed: false, xpReward: 200 },
    { id: "a2", title: "Course Completer", description: "Complete 5 courses", icon: "🎓", progress: 3, total: 5, completed: false, xpReward: 500 },
    { id: "a3", title: "Perfect Week", description: "Log in every day for a week", icon: "📅", progress: 7, total: 7, completed: true, xpReward: 200 },
    { id: "a4", title: "High Achiever", description: "Score above 90% on 10 quizzes", icon: "⭐", progress: 8, total: 10, completed: false, xpReward: 300 },
  ],
};

// Leaderboard data
export const leaderboardData = [
  { rank: 1, name: "Sarah Chen", avatar: "SC", xp: 18250, level: 18, levelTitle: "Expert Mind", tier: "platinum", streak: 28, weeklyXPGain: 850, quizAverage: 96, coursesCompleted: 8 },
  { rank: 2, name: "Michael Brown", avatar: "MB", xp: 17800, level: 17, levelTitle: "Wisdom Seeker", tier: "platinum", streak: 15, weeklyXPGain: 720, quizAverage: 94, coursesCompleted: 7 },
  { rank: 3, name: "Lisa Park", avatar: "LP", xp: 16500, level: 16, levelTitle: "Elite Scholar", tier: "platinum", streak: 22, weeklyXPGain: 680, quizAverage: 92, coursesCompleted: 6 },
  { rank: 4, name: "David Wilson", avatar: "DW", xp: 15800, level: 15, levelTitle: "Code Warrior", tier: "gold", streak: 10, weeklyXPGain: 620, quizAverage: 91, coursesCompleted: 6 },
  { rank: 5, name: "Emma Davis", avatar: "ED", xp: 15200, level: 15, levelTitle: "Code Warrior", tier: "gold", streak: 18, weeklyXPGain: 590, quizAverage: 89, coursesCompleted: 5 },
  { rank: 6, name: "James Taylor", avatar: "JT", xp: 14900, level: 14, levelTitle: "Logic Master", tier: "gold", streak: 8, weeklyXPGain: 550, quizAverage: 88, coursesCompleted: 5 },
  { rank: 7, name: "Sophia Martinez", avatar: "SM", xp: 14700, level: 14, levelTitle: "Logic Master", tier: "gold", streak: 14, weeklyXPGain: 520, quizAverage: 87, coursesCompleted: 5 },
  { rank: 8, name: "Ryan Johnson", avatar: "RJ", xp: 14500, level: 14, levelTitle: "Logic Master", tier: "gold", streak: 6, weeklyXPGain: 480, quizAverage: 86, coursesCompleted: 4 },
  { rank: 9, name: "Olivia White", avatar: "OW", xp: 14300, level: 13, levelTitle: "Data Explorer", tier: "gold", streak: 11, weeklyXPGain: 450, quizAverage: 85, coursesCompleted: 4 },
  { rank: 10, name: "Daniel Lee", avatar: "DL", xp: 14100, level: 13, levelTitle: "Data Explorer", tier: "gold", streak: 9, weeklyXPGain: 420, quizAverage: 84, coursesCompleted: 4 },
  { rank: 11, name: "Ava Anderson", avatar: "AA", xp: 13800, level: 13, levelTitle: "Data Explorer", tier: "gold", streak: 7, weeklyXPGain: 400, quizAverage: 83, coursesCompleted: 4 },
  { rank: 12, name: "Chris Thomas", avatar: "CT", xp: 13500, level: 12, levelTitle: "Python Apprentice", tier: "gold", streak: 5, weeklyXPGain: 380, quizAverage: 82, coursesCompleted: 3 },
  { rank: 13, name: "Mia Jackson", avatar: "MJ", xp: 13200, level: 12, levelTitle: "Python Apprentice", tier: "gold", streak: 13, weeklyXPGain: 360, quizAverage: 81, coursesCompleted: 3 },
  { rank: 14, name: "Ethan Harris", avatar: "EH", xp: 12900, level: 12, levelTitle: "Python Apprentice", tier: "gold", streak: 4, weeklyXPGain: 340, quizAverage: 80, coursesCompleted: 3 },
  { rank: 15, name: "Alex Thompson", avatar: "AT", xp: 14450, level: 12, levelTitle: "Python Apprentice", tier: "gold", streak: 12, isCurrentUser: true, weeklyXPGain: 420, quizAverage: 85, coursesCompleted: 3 },
  { rank: 16, name: "Isabella Clark", avatar: "IC", xp: 12400, level: 11, levelTitle: "Knowledge Knight", tier: "gold", streak: 3, weeklyXPGain: 300, quizAverage: 79, coursesCompleted: 3 },
  { rank: 17, name: "Noah Garcia", avatar: "NG", xp: 12100, level: 11, levelTitle: "Knowledge Knight", tier: "gold", streak: 8, weeklyXPGain: 280, quizAverage: 78, coursesCompleted: 2 },
  { rank: 18, name: "Zoe Robinson", avatar: "ZR", xp: 11800, level: 11, levelTitle: "Knowledge Knight", tier: "gold", streak: 2, weeklyXPGain: 260, quizAverage: 77, coursesCompleted: 2 },
  { rank: 19, name: "Lucas Moore", avatar: "LM", xp: 11500, level: 10, levelTitle: "Achievement Hunter", tier: "silver", streak: 6, weeklyXPGain: 240, quizAverage: 76, coursesCompleted: 2 },
  { rank: 20, name: "Chloe King", avatar: "CK", xp: 11200, level: 10, levelTitle: "Achievement Hunter", tier: "silver", streak: 1, weeklyXPGain: 220, quizAverage: 75, coursesCompleted: 2 },
];

// Recent XP transactions
export const recentXPTransactions = [
  { id: "t1", action: "Completed Quiz: Functions", xp: 100, timestamp: "2 hours ago", type: "quiz" },
  { id: "t2", action: "Perfect Score Bonus!", xp: 50, timestamp: "2 hours ago", type: "bonus" },
  { id: "t3", action: "Daily Login", xp: 10, timestamp: "Today", type: "streak" },
  { id: "t4", action: "Completed Module: Arrays", xp: 150, timestamp: "Yesterday", type: "course" },
  { id: "t5", action: "7-Day Streak Bonus!", xp: 200, timestamp: "5 days ago", type: "streak" },
];

// Function to calculate level from XP
export const calculateLevel = (totalXP) => {
  // Each level requires progressively more XP
  // Level 1: 0-500, Level 2: 501-1200, Level 3: 1201-2100, etc.
  let level = 1;
  let xpRequired = 500;
  let totalRequired = 0;

  while (totalRequired + xpRequired <= totalXP && level < 25) {
    totalRequired += xpRequired;
    level++;
    xpRequired = Math.floor(xpRequired * 1.3);
  }

  return level;
};

// Function to get tier from level
export const getTierFromLevel = (level) => {
  if (level <= 5) return "bronze";
  if (level <= 10) return "silver";
  if (level <= 15) return "gold";
  if (level <= 20) return "platinum";
  return "diamond";
};
