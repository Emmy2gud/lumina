import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Designer at Spotify",
    avatar: "S",
    gradient: "from-violet-500 to-purple-600",
    rating: 5,
    text: "LearnHub completely transformed my career. I went from knowing nothing about UX to landing a job at Spotify. The instructors are world-class!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Developer at Google",
    avatar: "M",
    gradient: "from-blue-500 to-cyan-500",
    rating: 5,
    text: "The coding courses here are exceptional. They're practical, well-structured, and helped me level up my skills to get into FAANG.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "E",
    gradient: "from-emerald-500 to-teal-500",
    rating: 5,
    text: "I've taken courses on many platforms, but LearnHub stands out for its quality and community. Worth every penny!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-section-alt">
      <div className="container-wide section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Loved by Learners Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community has to say about their learning journey
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-card rounded-3xl border border-border p-8 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-10 h-10 text-primary/10" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
