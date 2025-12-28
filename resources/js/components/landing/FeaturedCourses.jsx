import { Star, Clock, Users, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Complete Python Developer in 2024",
    instructor: "Maria Santos",
    rating: 4.9,
    students: "125K",
    hours: 52,
    price: 79.99,
    originalPrice: 189.99,
    category: "Development",
    gradient: "from-blue-500 to-cyan-500",
    bestseller: true,
  },
  {
    id: 2,
    title: "UI/UX Design: From Zero to Hero",
    instructor: "James Wilson",
    rating: 4.8,
    students: "89K",
    hours: 36,
    price: 69.99,
    originalPrice: 149.99,
    category: "Design",
    gradient: "from-violet-500 to-purple-600",
    bestseller: true,
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    instructor: "Sarah Chen",
    rating: 4.7,
    students: "67K",
    hours: 28,
    price: 59.99,
    originalPrice: 129.99,
    category: "Marketing",
    gradient: "from-emerald-500 to-teal-600",
    bestseller: false,
  },
  {
    id: 4,
    title: "Data Science & Machine Learning",
    instructor: "David Kumar",
    rating: 4.9,
    students: "98K",
    hours: 64,
    price: 89.99,
    originalPrice: 199.99,
    category: "Data Science",
    gradient: "from-orange-500 to-red-500",
    bestseller: true,
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wide section-padding">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Popular Courses
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Expand Your Career Opportunities
            </h2>
          </div>
          <Button variant="outline" className="self-start lg:self-auto">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Course Thumbnail */}
              <div className={`relative h-40 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-foreground ml-1" />
                  </div>
                </div>
                {course.bestseller && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-amber-950 text-xs font-bold rounded-md">
                    BESTSELLER
                  </div>
                )}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.hours}h
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">{course.category}</span>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>

                {/* Rating & Students */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-foreground">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs">{course.students}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">${course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
