import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const TutorHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-lg section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border/50 text-sm font-medium text-accent-foreground mb-6 animate-fade-in">
              <Users className="w-4 h-4" />
              <span>Join 10,000+ instructors worldwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Teach what you know.{" "}
              <span className="gradient-text">Earn while you inspire.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Share your expertise with millions of learners. Build courses, grow your audience, and earn money doing what you love—all with our easy-to-use platform.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl">
                Become a Tutor
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl">
                Join Tutor Waitlist
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="text-3xl font-bold text-foreground">$50M+</p>
                <p className="text-sm text-muted-foreground mt-1">Paid to instructors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">2M+</p>
                <p className="text-sm text-muted-foreground mt-1">Students enrolled</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">180+</p>
                <p className="text-sm text-muted-foreground mt-1">Countries reached</p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src="/src/assets/tutor-dashboard-preview.png"
                alt="Tutor Dashboard Preview showing course management, analytics, and earnings"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border/50 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <span className="text-primary-foreground text-lg font-bold">$</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">This month</p>
                  <p className="text-xl font-bold text-foreground">$4,280</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorHero;
