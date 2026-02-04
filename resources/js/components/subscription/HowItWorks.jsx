import { FileText, Upload, Users, DollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Apply as a Tutor",
    description: "Fill out a simple application sharing your expertise and teaching experience.",
  },
  {
    number: "02",
    icon: Upload,
    title: "Create Your Course",
    description: "Use our intuitive builder to create engaging video lessons, quizzes, and resources.",
  },
  {
    number: "03",
    icon: Users,
    title: "Publish & Enroll",
    description: "Launch your course to our marketplace and start enrolling students worldwide.",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Earn Money",
    description: "Get paid monthly for your enrollments. Track earnings in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-28 px-10">
      <div className="container-lg section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Start teaching in four simple steps
          </h2>
          <p className="text-lg text-text-muted">
            From application to earning—we've made the process seamless.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative text-center lg:text-left"
              >
                {/* Step Number Circle */}
                <div className="relative inline-flex lg:flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg relative z-10">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary text-primary text-sm font-bold flex items-center justify-center shadow-md z-20">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold  mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
