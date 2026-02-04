import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const TutorCTA = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden px-10">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

      <div className="container-lg section-padding relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 backdrop-blur border border-primary text-sm font-medium text-primary-500 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Limited spots available</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600 mb-6 leading-tight">
            Ready to share your knowledge with the world?
          </h2>

          <p className="text-lg text-primary-500/100 mb-10 max-w-2xl mx-auto">
            Join thousands of instructors who are already earning while teaching what they love. Your expertise can change lives—start today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="xl"
              className="bg-primary-foreground text-primary border-border border hover:bg-primary-600 hover:!text-white shadow-xl p-2"
            >
              Apply to Become a Tutor
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-primary text-primary-500 hover:bg-primary-600/10 hover:border-primary/10 p-2"
            >
              Learn More
            </Button>
          </div>

          <p className="text-sm text-text-muted mt-8">
            No credit card required • Free to apply • Response within 48 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default TutorCTA;
