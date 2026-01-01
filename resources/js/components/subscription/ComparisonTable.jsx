import { Check, X } from "lucide-react";

const features = [
  { name: "Course access", free: "50+ courses", pro: "Unlimited", teams: "Unlimited" },
  { name: "Video quality", free: "720p", pro: "1080p", teams: "4K" },
  { name: "Progress tracking", free: true, pro: true, teams: true },
  { name: "Community access", free: true, pro: true, teams: true },
  { name: "Mobile app", free: true, pro: true, teams: true },
  { name: "Certificates", free: false, pro: true, teams: true },
  { name: "Quizzes & assignments", free: false, pro: true, teams: true },
  { name: "Offline download", free: false, pro: true, teams: true },
  { name: "Priority support", free: false, pro: true, teams: true },
  { name: "Team management", free: false, pro: false, teams: true },
  { name: "Learning paths", free: false, pro: false, teams: true },
  { name: "Analytics & reports", free: false, pro: false, teams: true },
  { name: "SSO integration", free: false, pro: false, teams: true },
  { name: "API access", free: false, pro: false, teams: true },
];

const ComparisonTable = () => {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "string") {
      return <span className="text-foreground font-medium">{value}</span>;
    }
    return value ? (
      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mx-auto">
        <Check className="w-4 h-4 text-primary" />
      </div>
    ) : (
      <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
    );
  };

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="container-lg section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Compare all features
          </h2>
          <p className="text-lg text-muted-foreground">
            See exactly what's included in each plan
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-4 font-semibold text-foreground">
                  Features
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground min-w-[100px]">
                  Free
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground min-w-[100px]">
                  <span className="gradient-text">Pro</span>
                </th>
                <th className="text-center py-4 pl-4 font-semibold text-foreground min-w-[100px]">
                  Teams
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`border-b border-border/50 ${
                    index % 2 === 0 ? "bg-card/50" : ""
                  }`}
                >
                  <td className="py-4 pr-4 text-foreground">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    {renderValue(feature.free)}
                  </td>
                  <td className="py-4 px-4 text-center bg-accent/30">
                    {renderValue(feature.pro)}
                  </td>
                  <td className="py-4 pl-4 text-center">
                    {renderValue(feature.teams)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
