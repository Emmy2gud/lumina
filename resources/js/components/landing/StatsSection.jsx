import { Users, BookOpen, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500K+",
    label: "Active Learners",
    description: "Growing community worldwide",
  },
  {
    icon: BookOpen,
    value: "10,000+",
    label: "Expert Courses",
    description: "Across 50+ categories",
  },
  {
    icon: Award,
    value: "2.5M+",
    label: "Certificates Earned",
    description: "Industry-recognized credentials",
  },
  {
    icon: Globe,
    value: "180+",
    label: "Countries",
    description: "Global learning community",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 lg:py-20 gradient-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide section-padding relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2 animate-count-up" style={{ animationDelay: `${index * 0.15 + 0.2}s` }}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white/90 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
