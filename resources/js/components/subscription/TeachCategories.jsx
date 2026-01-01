import {
  Code,
  Palette,
  TrendingUp,
  Megaphone,
  Cpu,
  Camera,
  Music,
  BookOpen,
  Dumbbell
} from "lucide-react";

const categories = [
  { icon: Code, name: "Development", courses: "2,400+ courses" },
  { icon: Palette, name: "Design", courses: "1,800+ courses" },
  { icon: TrendingUp, name: "Business", courses: "3,200+ courses" },
  { icon: Megaphone, name: "Marketing", courses: "1,500+ courses" },
  { icon: Cpu, name: "Tech Skills", courses: "2,100+ courses" },
  { icon: Camera, name: "Photography", courses: "900+ courses" },
  { icon: Music, name: "Music", courses: "1,200+ courses" },
  { icon: BookOpen, name: "Academics", courses: "2,800+ courses" },
  { icon: Dumbbell, name: "Health & Fitness", courses: "700+ courses" },
];

const TeachCategories = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-lg section-padding">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            What You Can Teach
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Share your expertise in any subject
          </h2>
          <p className="text-lg text-muted-foreground">
            From technology to creative arts—there's demand for every skill.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-105 transition-all">
                <category.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.courses}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachCategories;
