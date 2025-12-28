import {
  GraduationCap,
  ClipboardCheck,
  LineChart,
  Award,
  Users,
  Clock,
  CheckCircle2
} from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience at top companies.",
    features: ["Verified instructors", "Updated content", "Practical projects"],
  },
  {
    icon: ClipboardCheck,
    title: "Interactive Learning",
    description: "Engage with quizzes, coding exercises, and hands-on assignments throughout.",
    features: ["Auto-graded quizzes", "Code challenges", "Peer reviews"],
  },
  {
    icon: LineChart,
    title: "Track Your Progress",
    description: "Monitor your learning journey with detailed analytics and insights.",
    features: ["Visual dashboards", "Completion badges", "Learning streaks"],
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Get industry-recognized certificates to boost your resume and LinkedIn.",
    features: ["Shareable credentials", "Verified badges", "Portfolio ready"],
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a global community of learners and get help when you need it.",
    features: ["Discussion forums", "Study groups", "Mentor access"],
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Learn at your own pace with unlimited access to all course materials.",
    features: ["No deadlines", "Mobile friendly", "Offline viewing"],
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16 lg:py-24">
      <div className="container-wide section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Why LearnHub
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete learning ecosystem designed for your professional growth
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative bg-card rounded-3xl border border-border p-8 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-shadow">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {benefit.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-2">
                {benefit.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
