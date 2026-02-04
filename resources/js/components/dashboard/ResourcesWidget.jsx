import { resources } from "@/data/mockData";
import { FileText, Video, FileSpreadsheet, HelpCircle, Eye, Download, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const typeIcons = {
  pdf: FileText,
  video: Video,
  worksheet: FileSpreadsheet,
  quiz: HelpCircle,
};

const typeColors = {
  pdf: "bg-status-danger/20 text-status-danger",
  video: "bg-primary/20 text-primary",
  worksheet: "bg-status-success/20 text-status-success",
  quiz: "bg-status-warning/20 text-status-warning",
};

export function ResourcesWidget() {
  const sortedResources = [...resources].sort((a, b) => b.effectiveness - a.effectiveness);

  return (
    <div className="border border-gray-100 rounded-xl p-5 col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Top Resources</h3>
          <p className="text-xs text-gray-400">By effectiveness rating</p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedResources.map((resource) => {
          const Icon = typeIcons[resource.type];
          const colorClass = typeColors[resource.type];

          return (
            <div
              key={resource.id}
              className="p-3 rounded-lg border border-border bg-gray-300/10  hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0", colorClass)}>
                  <Icon className="h-5 w-5 text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {resource.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-gray-400">
                    <span className="flex items-center gap-1 text-[10px]">
                      <Eye className="h-3 w-3 text-primary-500" />
                      {resource.views}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Download className="h-3 w-3 text-primary-500" />
                      {resource.downloads}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3 text-primary-500" />
                      {resource.avgTimeSpent}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-[10px] text-gray-400">Effectiveness:</span>
                <Progress value={resource.effectiveness} className="h-1 flex-1 [&>div]:bg-success" />
                <span className="text-[10px] font-medium text-status-success">{resource.effectiveness}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
