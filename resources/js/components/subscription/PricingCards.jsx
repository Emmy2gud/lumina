import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    popular: false,
    features: [
      "Access to 50+ free courses",
      "Basic progress tracking",
      "Community forum access",
      "Mobile app access",
      "Email support",
    ],
    notIncluded: [
      "Certificates of completion",
      "Quizzes & assignments",
      "Priority support",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For dedicated learners",
    price: "$19",
    period: "per month",
    popular: true,
    features: [
      "Unlimited course access",
      "Certificates of completion",
      "Quizzes & assignments",
      "Advanced progress analytics",
      "Download for offline",
      "Priority email support",
      "Early access to new courses",
    ],
    notIncluded: [],
    cta: "Upgrade to Pro",
    ctaVariant: "hero" as const,
  },
  {
    name: "Teams",
    description: "For organizations",
    price: "$49",
    period: "per user/month",
    popular: false,
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Learning path creation",
      "Advanced analytics & reports",
      "SSO integration",
      "Dedicated account manager",
      "Custom invoicing",
      "API access",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

const PricingCards = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-lg section-padding">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
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
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
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
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </div>
                    <span className="text-sm text-muted-foreground line-through">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Annual Discount Note */}
        <p className="text-center text-muted-foreground mt-8">
          💡 Save 20% with annual billing
        </p>
      </div>
    </section>
  );
};

export default PricingCards;
