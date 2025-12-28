import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Welcome to LearnHub! 🎉",
        description: "You'll be the first to know when we launch.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-20 lg:py-28 gradient-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide section-padding relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Limited Time: Get 50% off on launch
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Join 50,000+ professionals already learning with LearnHub.
            Get exclusive early access and launch discounts.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white text-base rounded-2xl"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-white text-primary hover:bg-white/90 font-bold text-base rounded-2xl shrink-0 shadow-lg"
            >
              {isSubmitting ? (
                "Joining..."
              ) : (
                <>
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Trust Points */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {["Free forever plan", "No credit card required", "Cancel anytime"].map((point) => (
              <div key={point} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-white" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
