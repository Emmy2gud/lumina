import { UserPlus, BookMarked, Award, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description: "Sign up in seconds with your email or social accounts. No credit card required.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookMarked,
    step: "02",
    title: "Choose Your Course",
    description: "Browse 10,000+ courses taught by industry experts. Find the perfect fit for your goals.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Award,
    step: "03",
    title: "Learn & Get Certified",
    description: "Complete lessons at your own pace. Earn certificates to showcase your new skills.",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container-wide section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Getting Started
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Start Learning in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of learners who have transformed their careers
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-24 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="relative bg-card rounded-3xl border border-border p-8 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 right-6 px-4 py-1.5 bg-muted text-muted-foreground text-sm font-bold rounded-full border border-border">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
