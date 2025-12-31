import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, CheckCircle2, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container-wide section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Trust Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-background border border-border shadow-sm mb-8 animate-fade-in"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Trusted by <span className="text-primary font-bold">50,000+</span> learners worldwide
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.08] tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Unlock Your{" "}
              <span className="text-gradient">Potential</span>
              <br />
              With Expert-Led Courses
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Master in-demand skills with structured courses, hands-on projects,
              and certificates that accelerate your career.
            </p>

            {/* Feature Pills */}
            <div
              className="flex flex-wrap gap-3 mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              {["Lifetime Access", "Certificate Included", "Expert Instructors"].map((feature) => (
                <div key={feature} className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" asChild>
                <a href="#waitlist">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="hero-secondary" asChild>
                <a href="#courses">
                  <Play className="w-4 h-4" />
                  Explore Courses
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div
              className="flex items-center gap-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[
                    "bg-gradient-to-br from-violet-400 to-purple-600",
                    "bg-gradient-to-br from-blue-400 to-cyan-600",
                    "bg-gradient-to-br from-emerald-400 to-teal-600",
                    "bg-gradient-to-br from-orange-400 to-red-500",
                    "bg-gradient-to-br from-pink-400 to-rose-600",
                  ].map((gradient, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full ${gradient} border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-md`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3 flex items-center gap-1 px-3 py-1 bg-background rounded-full border border-border shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-foreground">4.9</span>
                </div>
              </div>

              <div className="hidden sm:block h-10 w-px bg-border" />

              <div className="hidden sm:flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-bold text-foreground">50K+ Students</p>
                  <p className="text-xs text-muted-foreground">Active learners</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Course Cards Stack */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Main Featured Course Card */}
              <div
                className="bg-card rounded-3xl shadow-card-hover border border-border overflow-hidden animate-slide-in-right"
                style={{ animationDelay: "0.3s" }}
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    BESTSELLER
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-full">
                    4.9 ⭐
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      Development
                    </span>
                    <span className="text-xs text-muted-foreground">42 hours</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    The Complete Web Developer Bootcamp
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn HTML, CSS, JavaScript, React, Node.js and more
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Alex Chen</p>
                        <p className="text-xs text-muted-foreground">50K+ students</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">$89.99</p>
                      <p className="text-xs text-muted-foreground line-through">$199.99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Course Card - Behind */}
              <div
                className="absolute -bottom-6 -left-6 w-[85%] bg-card rounded-2xl shadow-card border border-border p-4 animate-fade-in"
                style={{ animationDelay: "0.5s", zIndex: -1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">UI</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">UI/UX Design Masterclass</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">4.8</span>
                      </div>
                      <span className="text-xs text-muted-foreground">• 28K students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Floating Card */}
              <div
                className="absolute -right-4 top-1/3 bg-card rounded-2xl shadow-card-hover border border-border p-4 animate-scale-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2.5M+</p>
                    <p className="text-xs text-muted-foreground">Course Completions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
