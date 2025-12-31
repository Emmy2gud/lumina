import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Flame,
  GraduationCap,
  Bell,
  MessageSquare,
  Calendar,
  Settings,
  Play,
  ChevronRight,
  CheckCircle,
  FileText,
  Award,
  Star,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  courses,
  deadlines,
  recentActivities,
  skillsData,
  weeklyProgressData,
  subjectScores,
} from "@/data/studentMockData";
import { playerStats, levelTiers, recentXPTransactions } from "@/data/gamificationData";
import { cn } from "@/lib/utils";


const tierStyles = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-slate-300 to-slate-500",
  gold: "from-yellow-400 to-amber-500",
  platinum: "from-cyan-300 to-blue-500",
  diamond: "from-violet-400 to-purple-600",
};

const tierBadgeStyles = {
  bronze: "bg-amber-600/20 text-amber-400 border-amber-600/30",
  silver: "bg-slate-400/20 text-slate-300 border-slate-400/30",
  gold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  platinum: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  diamond: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const XPProgressBar = () => {
  const progress = (playerStats.currentXP / playerStats.xpToNextLevel) * 100;
  const xpNeeded = playerStats.xpToNextLevel - playerStats.currentXP;

  return (
    <Card className="p-6 border-0 bg-surface-primary relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Level Badge */}
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white bg-gradient-to-br shadow-lg",
              tierStyles[playerStats.tier]
            )}>
              {playerStats.currentLevel}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">
                  Level {playerStats.currentLevel}
                </h2>
                <Badge variant="outline" className={tierBadgeStyles[playerStats.tier]}>
                  {levelTiers[playerStats.tier].label}
                </Badge>
              </div>
              <p className="text-primary font-medium">{playerStats.levelTitle}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <Zap className="w-6 h-6 text-yellow-400" />
              {playerStats.totalXP.toLocaleString()} XP
            </div>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {playerStats.currentLevel + 1}</span>
            <span className="font-medium text-foreground">
              {playerStats.currentXP.toLocaleString()} / {playerStats.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="relative h-4 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-muted-foreground">
            <Sparkles className="w-4 h-4 inline mr-1 text-yellow-400" />
            <span className="text-primary font-semibold">{xpNeeded.toLocaleString()} XP</span> to Level {playerStats.currentLevel + 1}!
          </p>
        </div>
      </div>
    </Card>
  );
};

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  gradient,
  special,
}) => (
  <Card className={cn(
    "relative overflow-hidden p-5 border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group",
    special && "border-1 border-orange-500/30"
  )}>
    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient}`} />
    {special && (
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full" />
    )}
    <div className="relative flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.positive ? "text-status-success" : "text-status-danger"
            )}
          >
            <TrendingUp className={cn("w-3 h-3", !trend.positive && "rotate-180")} />
            <span>
              {trend.positive ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg", gradient)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </Card>
);

const CourseCard = ({ course }) => {


  return (
    <Card className="p-4 border-border bg-surface-primary backdrop-blur-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{course.thumbnail}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500">{course.instructor}</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
              <span>{course.timeSpent}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Next: <span className="text-foreground">{course.nextLesson}</span>
            </p>
            <Button size="sm" className="gap-1 h-8 text-white" onClick={() => navigate("/quiz")}>
              <Play className="w-3 h-3" />
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const DeadlineItem = ({ deadline }) => {
  const priorityColors = {
    urgent: "bg-red-600 text-white",
    soon: "bg-yellow-500 text-white",
    normal: "bg-green-500 text-white",
  };

  const priorityBorders = {
    urgent: "border-l-red-600 ",
    soon: "border-l-yellow-500",
    normal: "border-l-green-500 ",
  };

  return (
    <div
      className={cn(
        "p-3 rounded-lg bg-card/50 border border-border border-l-4 hover:bg-accent/30 transition-colors cursor-pointer",
        priorityBorders[deadline.priority]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm truncate">
            {deadline.title}
          </h4>
          <p className="text-xs text-muted-foreground">{deadline.courseName}</p>
        </div>
        <Badge className={priorityColors[deadline.priority]} variant="secondary">
          {deadline.timeRemaining}
        </Badge>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  const typeIcons = {
    quiz: CheckCircle,
    assignment: FileText,
    module: GraduationCap,
    certificate: Award,
    login: Clock,
  };
  const Icon = typeIcons[activity.type];

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{activity.title}</p>
        <p className="text-xs text-muted-foreground">{activity.description}</p>
        {activity.score && (
          <Badge variant="secondary" className="mt-1 bg-green-100 text-success">
            Score: {activity.score}%
          </Badge>
        )}
      </div>
      <span className="text-xs text-text-muted whitespace-nowrap">
        {activity.timestamp}
      </span>
    </div>
  );
};

const XPHistoryItem = ({ transaction }) => {
  const typeColors = {
    quiz: "text-blue-400",
    course: "text-emerald-400",
    streak: "text-orange-400",
    achievement: "text-purple-400",
    bonus: "text-yellow-400",
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors">
      <div className="flex items-center gap-2">
        <Zap className={cn("w-4 h-4", typeColors[transaction.type])} />
        <span className="text-sm text-foreground">{transaction.action}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-primary/20 text-primary">+{transaction.xp} XP</Badge>
        <span className="text-xs text-muted-foreground">{transaction.timestamp}</span>
      </div>
    </div>
  );
};

const AchievementBadge = ({ badge }) => (
  <div className={cn(
    "flex flex-col items-center p-3 rounded-xl transition-all",
    badge.locked ? "opacity-50" : "hover:bg-accent/30"
  )}>
    <span className="text-3xl mb-1">{badge.icon}</span>
    <p className="text-xs text-center font-medium text-foreground line-clamp-1">{badge.name}</p>
  </div>
);

const StudentDashboard = () => {
  const [notificationCount] = useState(3);


  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">


      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {greeting}, <span className="text-primary">Alex</span>! 👋
            </h1>
            <p className="text-muted-foreground mt-1">{currentDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-primary border-0 text-white">
              <MessageSquare className="w-4 h-4" />
              Message Tutor
            </Button>
            <Button variant="outline" className="gap-2 border border-border">
              <Calendar className="w-4 h-4" />
              View Schedule
            </Button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <XPProgressBar />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            icon={BookOpen}
            title="Total Courses"
            value="8"
            subtitle="3 in progress"
            gradient="from-blue-500 to-blue-600"
          />
          <MetricCard
            icon={CheckCircle}
            title="Completion"
            value="24/30"
            subtitle="80% complete"
            trend={{ value: 5, positive: true }}
            gradient="from-emerald-500 to-green-600"
          />
          <MetricCard
            icon={TrendingUp}
            title="Avg. Score"
            value="85.5%"
            subtitle="Overall average"
            trend={{ value: 12, positive: true }}
            gradient="from-purple-500 to-violet-600"
          />
          <MetricCard
            icon={Clock}
            title="Study Time"
            value="42.5h"
            subtitle="Total learning"
            trend={{ value: 5, positive: true }}
            gradient="from-cyan-500 to-teal-500"
          />
          <MetricCard
            icon={Flame}
            title="Streak"
            value={`${playerStats.currentStreak} 🔥`}
            subtitle="Daily login streak"
            gradient="from-orange-500 to-red-500"
            special
          />
          <MetricCard
            icon={Star}
            title="Total Points"
            value={playerStats.totalPoints.toLocaleString()}
            subtitle={`Ranked #${playerStats.rank} of ${playerStats.totalStudents}`}
            trend={{ value: 3, positive: true }}
            gradient="from-yellow-500 to-amber-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pre vs Post Assessment */}
          <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">Performance Overview</h2>
                <p className="text-sm text-text-muted">Knowledge Growth</p>
              </div>
              <Badge variant="secondary" className="bg-primary text-white">
                +23% avg improvement
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="preScore" name="Pre-Assessment" fill="#a88cff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="postScore" name="Post-Assessment" fill="#5634e8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Progress Over Time */}
          <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">Weekly Progress</h2>
                <p className="text-sm text-text-muted">Learning Trend</p>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                On Track
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyProgressData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="progress" stroke="hsl(var(--primary))" fill="url(#progressGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Courses & Skills */}
          <div className="xl:col-span-2 space-y-6">
            {/* Course Progress */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Course Progress</h2>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/courses")}>
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </Card>

            {/* Skills Assessment */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <h2 className="text-lg font-medium text-foreground mb-4">Skills Assessment</h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" stroke="#8b5cf6" fontSize={12} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b46ff" fontSize={10} />
                    <Radar name="Skill Level" dataKey="level" stroke="#6d28d9" fill="#6d28d9" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>text-text-muted
              </div>
            </Card>

            {/* XP History */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Recent XP Earned
                </h2>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                  +{recentXPTransactions.reduce((acc, t) => acc + t.xp, 0)} XP this week
                </Badge>
              </div>
              <div className="space-y-2">
                {recentXPTransactions.map((transaction) => (
                  <XPHistoryItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </Card>
          </div>


          <div className="space-y-6">
            {/* Achievements */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Achievements
                </h2>
                <Badge variant="secondary" className="text-white">
                  {playerStats.badges.filter(b => !b.locked).length}/{playerStats.badges.length}
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {playerStats.badges.slice(0, 8).map((badge) => (
                  <AchievementBadge key={badge.id} badge={badge} />
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 gap-1"
                size="sm"
                onClick={() => navigate("/leaderboard")}
              >
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">Upcoming Deadlines</h2>
                <Badge variant="secondary" className="text-white">{deadlines.length}</Badge>
              </div>
              <div className="space-y-3">
                {deadlines.map((deadline) => (
                  <DeadlineItem key={deadline.id} deadline={deadline} />
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <h2 className="text-lg font-medium text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 border-0 bg-surface-primary backdrop-blur-sm">
              <h2 className="text-lg font-medium text-foreground mb-2">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-primary">
                  <p className="text-2xl font-bold text-white">47</p>
                  <p className="text-xs text-white">Quizzes Taken</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-primary">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-xs text-white">Badges Earned</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-primary">
                  <p className="text-2xl font-bold text-white">1,245</p>
                  <p className="text-xs text-white">Questions</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-primary">
                  <p className="text-2xl font-bold text-white">87%</p>
                  <p className="text-xs text-white">Accuracy</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;










