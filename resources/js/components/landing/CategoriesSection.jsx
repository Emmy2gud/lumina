import {
  Code,
  TrendingUp,
  Palette,
  Megaphone,
  Database,
  Smartphone,
  ArrowRight,
  Camera,
  Music
} from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Development",
    courses: "1,500+ courses",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Business",
    courses: "800+ courses",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    title: "Design",
    courses: "900+ courses",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    courses: "600+ courses",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Database,
    title: "Data Science",
    courses: "700+ courses",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Dev",
    courses: "450+ courses",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Camera,
    title: "Photography",
    courses: "320+ courses",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Music,
    title: "Music",
    courses: "280+ courses",
    gradient: "from-indigo-500 to-violet-500",
  },
];

const CategoriesSection = () => {
  return (
    <section id="courses" className="py-16 lg:py-24 bg-section-alt">
      <div className="container-wide section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Browse Categories
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore Our Top Categories
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from over 10,000 courses across all major categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href="#waitlist"
              className="group relative bg-card rounded-2xl p-6 border border-border overflow-hidden hover:border-transparent hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors shadow-lg`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                  {category.courses}
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
