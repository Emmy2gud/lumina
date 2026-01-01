import {
  DollarSign,
  Palette,
  Clock,
  BarChart3,
  Users,
  Headphones
} from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Earn from Your Knowledge",
    description: "Turn your expertise into income. Set your prices and earn up to 70% revenue share on every sale.",
  },
  {
    icon: Palette,
    title: "Easy Course Creation",
    description: "Our intuitive course builder makes it simple to create engaging content with videos, quizzes, and resources.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Teach on your own terms. Create content whenever it suits you and let students learn at their pace.",
  },
  {
    icon: BarChart3,
    title: "Instructor Analytics",
    description: "Track your performance with detailed insights on enrollments, revenue, student engagement, and more.",
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join a supportive network of instructors. Share tips, collaborate, and grow together.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get help when you need it. Our instructor support team is here to help you succeed.",
  },
];

const WhyTeach = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-lg section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Why Teach With Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to succeed as an instructor
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide the tools, support, and audience—you bring the expertise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/50 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTeach;
