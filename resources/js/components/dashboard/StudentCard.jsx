
import { cn } from "@/lib/utils";
import { MessageSquare, Calendar, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


const statusConfig = {
  active: {
    label: "Active",
    className: "bg-green-600/20 text-green-600 border-status-success/30",
    dotClassName: "bg-green-600",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-400 text-white border-0",
    dotClassName: "bg-gray-400",
  },
  "at-risk": {
    label: "At Risk",
    className: "bg-red-600/20 text-red-600 border-status-danger/30",
    dotClassName: "bg-red-600",
  },
};

export function StudentCard({ student }) {
  const status = statusConfig[student.status];

  const getTimeUntilSession = () => {
    if (!student.nextSession) return null;
    const next = new Date(student.nextSession);
    const now = new Date();
    const diffDays = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const sessionCountdown = getTimeUntilSession();

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30 group">

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
              {student.avatar}
            </div>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ",
                status.dotClassName
              )}
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {student.name}
            </h3>
            <p className="text-sm text-gray-400">{student.subject}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">Overall Progress</span>
          <span className="text-xs font-medium text-foreground">{student.progress}%</span>
        </div>
        <Progress value={student.progress} className="h-1.5" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-violet-100 ">
          <p className="text-lg font-semibold text-foreground">{student.attendanceRate}%</p>
          <p className="text-[10px] text-muted-foreground">Attendance</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-violet-100 ">
          <p className="text-lg font-semibold text-green-600">+{student.improvement}%</p>
          <p className="text-[10px] text-muted-foreground">Improvement</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-violet-100 ">
          <p className="text-lg font-semibold text-foreground">{student.responseTime}</p>
          <p className="text-[10px] text-muted-foreground">Response</p>
        </div>
      </div>

      {/* Next Session */}
      {sessionCountdown && (
        <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Next session:</span>
          <span className="text-xs font-medium text-primary">{sessionCountdown}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs  bg-primary/5 border border-primary/20 text-primary hover:bg-primary/10">
          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
          Message
        </Button>
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs  bg-primary/5 border border-primary/20 text-primary hover:bg-primary/10">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          Schedule
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
