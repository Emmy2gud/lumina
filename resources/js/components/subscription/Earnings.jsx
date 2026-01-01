import { Percent, Calendar, TrendingUp, Shield } from "lucide-react";

const earningsFeatures = [
  {
    icon: Percent,
    title: "Up to 70% Revenue Share",
    description: "Keep the majority of your earnings. Our competitive rates reward your hard work.",
  },
  {
    icon: Calendar,
    title: "Monthly Payouts",
    description: "Get paid reliably every month via PayPal, Payoneer, or direct bank transfer.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Tracking",
    description: "Monitor your earnings as they happen. No more guessing about your income.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "No hidden fees. You see exactly what you earn from every enrollment.",
  },
];

const Earnings = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-lg section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Earnings & Monetization
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Fair compensation for quality teaching
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe instructors should be rewarded for their expertise. That's why we offer one of the highest revenue shares in the industry.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {earningsFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Share Visualization */}
          <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
              Your Earnings Breakdown
            </h3>

            {/* Pie Chart Visualization */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="20"
                />
                {/* Instructor share (70%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="20"
                  strokeDasharray="175.93 251.33"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                    <stop offset="100%" stopColor="hsl(280, 80%, 55%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold gradient-text">70%</span>
                <span className="text-sm text-muted-foreground">Your share</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full gradient-bg" />
                <span className="text-sm text-foreground">Instructor (70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">Platform (30%)</span>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Example: Course priced at $100
              </p>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Your earnings</span>
                <span className="text-2xl font-bold text-foreground">$70</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Earnings;
