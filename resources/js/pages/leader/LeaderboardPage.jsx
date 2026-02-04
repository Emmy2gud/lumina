import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Medal,
  Flame,
  TrendingUp,
  Crown,
  Star,
  Users,
  Calendar,
  ChevronUp,
  ChevronDown,
  Minus,
  Sparkles,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { leaderboardData, playerStats, levelTiers } from "@/data/gamificationData";
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

const PodiumCard = ({ entry, position }) => {
  const heights = { 1: "h-40", 2: "h-32", 3: "h-28" };
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const avatarSizes = { 1: "w-20 h-20", 2: "w-16 h-16", 3: "w-14 h-14" };
  const textSizes = { 1: "text-2xl", 2: "text-xl", 3: "text-lg" };

  return (
    <div className={cn("flex flex-col items-center", position === 1 ? "order-2" : position === 2 ? "order-1" : "order-3")}>
      {/* Avatar */}
      <div className="relative mb-4">
        <div className={cn(
          avatarSizes[position],
          "rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br",
          tierStyles[entry.tier],
          position === 1 && "ring-4 ring-yellow-400/50 shadow-lg shadow-yellow-400/30"
        )}>
          <span className={position === 1 ? "text-2xl" : "text-xl"}>{entry.avatar}</span>
        </div>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">
          {medals[position]}
        </span>
        {position === 1 && (
          <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 text-yellow-400" />
        )}
      </div>

      <h3 className={cn("font-bold text-foreground mb-1", textSizes[position])}>
        {entry.name}
      </h3>


      <Badge variant="outline" className={cn("mb-2", tierBadgeStyles[entry.tier])}>
        Lv.{entry.level} {entry.levelTitle}
      </Badge>


      <p className="text-xl font-bold text-primary mb-1">
        {entry.xp.toLocaleString()} XP
      </p>


      <div className="flex items-center gap-1 text-orange-400">
        <Flame className="w-4 h-4" />
        <span className="font-medium">{entry.streak}</span>
      </div>

      <div className={cn(
        "w-24 mt-4 rounded-t-lg flex items-center justify-center",
        heights[position],
        position === 1
          ? "bg-gradient-to-t from-yellow-600 to-yellow-400"
          : position === 2
            ? "bg-gradient-to-t from-slate-500 to-slate-400"
            : "bg-gradient-to-t from-amber-700 to-amber-500"
      )}>
        <span className="text-4xl font-bold text-white/90">{position}</span>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ entry, showChange }) => {
  const isCurrentUser = entry.isCurrentUser;
  const change = Math.floor(Math.random() * 5) - 2;

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
      isCurrentUser
        ? "bg-surface-primary border  border-gray-100"
        : "border  border-gray-100"
    )}>
      {/* Rank */}
      <div className="w-12 text-center">
        <span className={cn(
          "text-2xl font-bold",
          entry.rank <= 3 ? "text-yellow-400" : "text-muted-foreground"
        )}>
          {entry.rank}
        </span>
        {showChange && (
          <div className="flex items-center justify-center mt-1">
            {change > 0 ? (
              <span className="flex items-center text-xs text-green-400">
                <ChevronUp className="w-3 h-3" />
                {change}
              </span>
            ) : change < 0 ? (
              <span className="flex items-center text-xs text-red-400">
                <ChevronDown className="w-3 h-3" />
                {Math.abs(change)}
              </span>
            ) : (
              <Minus className="w-3 h-3 text-text-muted" />
            )}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br",
        tierStyles[entry.tier]
      )}>
        {entry.avatar}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={cn(
            "font-semibold truncate",
            isCurrentUser ? "text-primary" : "text-foreground"
          )}>
            {entry.name}
            {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
          </h3>
          <Badge variant="outline" className={cn("text-xs", tierBadgeStyles[entry.tier])}>
            Lv.{entry.level}
          </Badge>
        </div>
        <p className="text-sm text-text-muted">{entry.levelTitle}</p>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <div className="text-center">
          <p className="font-semibold text-foreground">{entry.quizAverage}%</p>
          <p className="text-xs text-text-muted">Avg Score</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">{entry.coursesCompleted}</p>
          <p className="text-xs text-text-muted">Courses</p>
        </div>
        <div className="flex items-center gap-1 text-orange-400">
          <Flame className="w-4 h-4" />
          <span className="font-semibold">{entry.streak}</span>
        </div>
      </div>

      {/* XP */}
      <div className="text-right">
        <p className="text-lg font-bold text-primary">
          {entry.xp.toLocaleString()}
        </p>
        <p className="text-xs text-text-muted">XP</p>
      </div>
    </div>
  );
};

const LeaderboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("week");

  const currentUser = leaderboardData.find(e => e.isCurrentUser);
  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  // Sort different leaderboard views
  const mostImproved = [...leaderboardData].sort((a, b) => b.weeklyXPGain - a.weeklyXPGain);
  const longestStreaks = [...leaderboardData].sort((a, b) => b.streak - a.streak);
  const quizMasters = [...leaderboardData].sort((a, b) => b.quizAverage - a.quizAverage);

  return (
    <div className="min-h-screen max-w-8xl m-auto md:p-8 ml-0 ">


      <main className="container mx-auto px-4  space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            Leaderboard
          </h1>
          <p className="text-text-muted">
            Compete with fellow students and climb the ranks!
          </p>
        </div>

        {/* Time Period Tabs */}
        <Tabs defaultValue="week" className="w-90 md:w-full " onValueChange={setTimePeriod}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-6 bg-surface-tertiary ">
            <TabsTrigger value="week" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm">This Week</TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm">This Month</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm">All Time</TabsTrigger>
            <TabsTrigger value="you" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm">My Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-6">
            {/* Weekly Reset Banner */}
            <Card className="p-4 bg-surface-primary border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">
                    Weekly reset in <span className="text-primary">2 days</span>
                  </span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Current Champion: {top3[0]?.name}
                </Badge>
              </div>
            </Card>

            {/* Podium */}
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <div className="flex items-end justify-center gap-4 py-8">
                {top3[1] && <PodiumCard entry={top3[1]} position={2} />}
                {top3[0] && <PodiumCard entry={top3[0]} position={1} />}
                {top3[2] && <PodiumCard entry={top3[2]} position={3} />}
              </div>
            </Card>

            {/* Your Rank Card */}
            {currentUser && (
              <Card className="p-6 bg-surface-primary border border-gray-100 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br",
                        tierStyles[currentUser.tier]
                      )}>
                        {currentUser.avatar}
                      </div>
                      <Badge className="absolute -bottom-1 -right-1 bg-primary text-white">
                        #{currentUser.rank}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Your Ranking</h3>
                      <p className="text-text-muted">
                        Level {currentUser.level} • {currentUser.levelTitle}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{currentUser.xp.toLocaleString()}</p>
                      <p className="text-xs text-text-muted">Total XP</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center text-orange-400">
                        <Flame className="w-5 h-5" />
                        <span className="text-2xl font-bold">{currentUser.streak}</span>
                      </div>
                      <p className="text-xs text-text-muted">Day Streak</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center text-status-success">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-lg font-bold">+3</span>
                      </div>
                      <p className="text-xs text-text-muted">Rank Change</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-text-muted mb-1">
                      <Sparkles className="w-4 h-4 inline mr-1 text-yellow-400" />
                      {(leaderboardData[9].xp - currentUser.xp + 1).toLocaleString()} XP to Top 10!
                    </p>
                    <Progress
                      value={(currentUser.xp / leaderboardData[0].xp) * 100}
                      className="h-2 w-40"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Rest of Leaderboard */}
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Rankings
              </h2>
              <div className="space-y-3 ">
                {rest.map((entry) => (
                  <LeaderboardRow key={entry.rank} entry={entry} showChange />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-6">
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Rankings</h2>
              <div className="space-y-3">
                {leaderboardData.map((entry) => (
                  <LeaderboardRow key={entry.rank} entry={entry} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4">All Time Rankings</h2>
              <div className="space-y-3">
                {leaderboardData.map((entry) => (
                  <LeaderboardRow key={entry.rank} entry={entry} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="you" className="space-y-6">
            {/* Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-surface-primary border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                    <p className="text-2xl font-bold text-foreground">
                      {playerStats.totalXP.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress value={(playerStats.currentXP / playerStats.xpToNextLevel) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {playerStats.xpToNextLevel - playerStats.currentXP} XP to Level {playerStats.currentLevel + 1}
                </p>
              </Card>

              <Card className="p-6 bg-surface-primary border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Flame className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-foreground">{playerStats.currentStreak} days</p>
                    <p className="text-xs text-muted-foreground">Best: {playerStats.longestStreak} days</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-surface-primary border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <Trophy className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                    <p className="text-2xl font-bold text-foreground">#{playerStats.rank}</p>
                    <p className="text-xs text-muted-foreground">of {playerStats.totalStudents} students</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Badges */}
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Badges Earned
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {playerStats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={cn(
                      "p-4 rounded-xl text-center transition-all",
                      badge.locked
                        ? "bg-violet-600/30 opacity-50"
                        : "bg-violet-600 hover:bg-violet-600/50"
                    )}
                  >
                    <span className="text-4xl block mb-2">{badge.icon}</span>
                    <h3 className="font-semibold text-white text-sm">{badge.name}</h3>
                    <p className="text-xs text-white mt-1">
                      {badge.locked ? "Locked" : badge.unlockedAt}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 bg-surface-primary border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Achievements
              </h2>
              <div className="space-y-4">
                {playerStats.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl",
                      achievement.completed ? "bg-status-success/10" : "bg-card/50"
                    )}
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                        {achievement.completed && (
                          <Badge className="bg-status-success/20 text-status-success">Completed!</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Progress
                          value={(achievement.progress / achievement.total) * 100}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Zap className="w-4 h-4" />
                        <span className="font-semibold">+{achievement.xpReward}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">XP Reward</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alternative Leaderboards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Most Improved */}
          <Card className="p-6 bg-surface-primary border border-gray-100">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-status-success" />
              Most Improved This Week
            </h3>
            <div className="space-y-3">
              {mostImproved.slice(0, 5).map((entry, index) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{index + 1}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br",
                    tierStyles[entry.tier]
                  )}>
                    {entry.avatar}
                  </div>
                  <span className="flex-1 text-sm text-foreground truncate">{entry.name}</span>
                  <Badge className="bg-status-success/20 text-status-success">
                    +{entry.weeklyXPGain}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Longest Streaks */}
          <Card className="p-6 bg-surface-primary border border-gray-100">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Longest Streaks
            </h3>
            <div className="space-y-3">
              {longestStreaks.slice(0, 5).map((entry, index) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{index + 1}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br",
                    tierStyles[entry.tier]
                  )}>
                    {entry.avatar}
                  </div>
                  <span className="flex-1 text-sm text-foreground truncate">{entry.name}</span>
                  <Badge className="bg-orange-500/20 text-orange-400">
                    🔥 {entry.streak}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Quiz Masters */}
          <Card className="p-6 bg-surface-primary border border-gray-100">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Quiz Masters
            </h3>
            <div className="space-y-3">
              {quizMasters.slice(0, 5).map((entry, index) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{index + 1}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br",
                    tierStyles[entry.tier]
                  )}>
                    {entry.avatar}
                  </div>
                  <span className="flex-1 text-sm text-foreground truncate">{entry.name}</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    {entry.quizAverage}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;










