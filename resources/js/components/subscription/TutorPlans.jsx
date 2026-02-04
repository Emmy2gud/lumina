import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const tutorPlans = [
  {
    name: "Starter",
    description: "For new instructors",
    price: "$0",
    period: "forever",
    popular: false,
    features: [
      "Publish up to 3 courses",
      "50% revenue share",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
    cta: "Start Free",
    ctaVariant: "outline" ,
  },
  {
    name: "Professional",
    description: "For growing instructors",
    price: "$29",
    period: "per month",
    popular: true,
    features: [
      "Unlimited courses",
      "70% revenue share",
      "Advanced analytics",
      "Priority support",
      "Promotional tools",
      "Custom landing pages",
      "Student messaging",
    ],
    cta: "Go Professional",
    ctaVariant: "hero" ,
  },
  {
    name: "Enterprise",
    description: "For institutions",
    price: "Custom",
    period: "pricing",
    popular: false,
    features: [
      "Everything in Professional",
      "80% revenue share",
      "White-label options",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Bulk upload tools",
      "Team collaboration",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" ,
  },
];

const TutorPlans = () => {
  return (
    <section className="py-20 lg:py-28 px-10">
      <div className="container-lg section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Instructor Plans
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose your instructor plan
          </h2>
          <p className="text-lg text-text-muted">
            Start for free and upgrade as you grow. Maximize your earnings with our Pro plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tutorPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-card border-2 border-primary shadow-xl shadow-primary/10"
                  : "bg-card border border-border/50 shadow-card"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full gradient-bg text-primary-foreground text-sm font-semibold shadow-lg">
                    <Zap className="w-4 h-4" />
                    Best Value
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-text-muted text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-text-muted">/{plan.period}</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={plan.ctaVariant}
                size="lg"
                className="w-full mb-8"
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-text-mutedmt-8">
          💡 All plans include free course hosting and global payment processing
        </p>
      </div>
    </section>
  );
};

export default TutorPlans;
