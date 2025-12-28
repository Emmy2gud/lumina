
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";



export function PerformanceChart({ students }) {
  const data = students.map((s) => ({
    name: s.name.split(" ")[0],
    pre: s.preAssessment,
    post: s.postAssessment,
    improvement: s.improvement,
  }));

  return (
    <div className="border border-gray-100 h-[500px]   rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Student Performance</h3>
          <p className="text-xs text-gray-400">Pre vs Post Assessment Scores</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(222 30% 18%)" }}
            />
            <YAxis
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 10%)",
                border: "1px solid hsl(222 30% 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(210 40% 98%)" }}
            />

            <Bar dataKey="pre" name="Pre-Assessment" radius={[4, 4, 0, 0]} fill="hsl(222 30% 30%)"  />
            <Bar dataKey="post" name="Post-Assessment" radius={[4, 4, 0, 0]} >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}

                  fill={
                    entry.improvement >= 25
                      ? "hsl(160 84% 39%)"
                      : entry.improvement >= 15
                      ? "hsl(174 72% 56%)"
                      : "hsl(38 92% 50%)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-40">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[hsl(222_30%_30%)]" />
          <span className="text-xs text-muted-foreground">Pre-Assessment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Post-Assessment</span>
        </div>
      </div>
    </div>
  );
}
