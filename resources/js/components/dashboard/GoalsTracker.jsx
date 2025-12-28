import { students } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function GoalsTracker() {
  const allGoals = students.flatMap((s) =>
    s.goals.map((g) => ({
      ...g,
      studentName: s.name,
      studentAvatar: s.avatar,
    }))
  );

  const sortedGoals = allGoals.sort((a, b) => b.progress - a.progress);

  return (
    <div className="border border-gray-100  rounded-xl p-5 col-span-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Active Goals</h3>
        </div>
        <span className="text-xs text-gray-400">{allGoals.length} goals tracked</span>
      </div>

      <div className="space-y-3">
        {sortedGoals.slice(0, 6).map((goal, index) => (
          <div
            key={`${goal.studentName}-${index}`}
            className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-semibold">
                  {goal.studentAvatar}
                </div>
                <span className="text-xs text-gray-400">{goal.studentName}</span>
              </div>
              {goal.progress >= 80 && (
                <Award className="h-4 w-4 text-status-warning" />
              )}
            </div>
            <p className="text-sm font-medium text-foreground mb-2">{goal.name}</p>
            <div className="flex items-center gap-2">
              <Progress
                value={goal.progress}
                className={cn(
                  "h-1.5 flex-1",
                  goal.progress >= 80 && "[&>div]:bg-status-success",
                  goal.progress >= 50 && goal.progress < 80 && "[&>div]:bg-primary",
                  goal.progress < 50 && "[&>div]:bg-status-warning"
                )}
              />
              <span className="text-xs font-medium text-foreground">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
