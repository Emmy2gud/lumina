import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const PricingCTA = () => {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="container-lg section-padding">
        <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-xl border border-border/50 max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary-foreground" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to start learning?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of learners who are advancing their careers with LearnHub.
            Start for free, upgrade when you're ready.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
