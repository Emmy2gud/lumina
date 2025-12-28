import { useState, useEffect } from "react";

import { Search, Filter, Star, TrendingUp, Users, Award, Clock, PlayCircle } from "lucide-react";

import c1 from "../../../../public/assets/course-3.jpg";
import c2 from "../../../../public/assets/course-5.jpg";
import c4 from "../../../../public/assets/course-7.jpg";
import CourseCard from "../../components/CourseCard";



const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const categoryFilters = ["All Categories", "Frontend", "Backend", "Full Stack", "Database", "DevOps", "Mobile"];
const levelFilters = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const durationFilters = ["All Durations", "0-5 hours", "5-10 hours", "10-20 hours", "20+ hours"];
const priceFilters = ["All Prices", "Free", "$0-15", "$15-25", "$25+"];

const Category = ({ courses, categories, activeCategory}) => {
    console.log(courses)
  const [sortBy, setSortBy] = useState("popular");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCourses = courses.filter(course => {

    const matchesCategory = categoryFilter === "All Categories" || course.category === categoryFilter;


    return  matchesCategory
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta */}
      <title>{activeCategory} Courses - Learn Modern {activeCategory}</title>
      <meta name="description" content="Master web development with our comprehensive courses. Learn JavaScript, React, Node.js, Python, and more from industry experts." />


      <header className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[image:var(--gradient-primary)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-surface-primary/5 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-[float_10s_ease-in-out_infinite]"></div>

        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-surface-primary/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Platform for Web Development
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Master {activeCategory}
              <br />
              <span className="relative">
                Development
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto mb-8 font-light">
              Build {activeCategory} with cutting-edge tools.
              <br className="hidden md:block" />
              Join <span className="font-semibold text-blue-200">50,000+ learners</span> already transforming their skills and careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-8 py-4 bg-surface-primary text-text-primary rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Start Learning Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 bg-surface-primary/10 backdrop-blur-md border border-white/20 rounded-xl font-medium text-lg hover:bg-surface-primary/20 transition-all duration-300">
                View Free Courses
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-75">Students</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm opacity-75">Rating</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-75">Courses</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-75">Job Rate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative -mt-20 z-10">

        <div className="container mx-auto px-4 mb-16">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-secondary dark:bg-gray-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white placeholder-gray-500"
                />
              </div>
              <div className="flex gap-3">
                <select

                  className="px-4 py-3 bg-surface-secondary dark:bg-gray-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl transition-all duration-300 ${showFilters ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border-light dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Category</label>
                  <select


                    className="w-full px-3 py-2 bg-surface-secondary dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white text-sm"
                  >
                    {categoryFilters.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Level</label>
                  <select


                    className="w-full px-3 py-2 bg-surface-secondary dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white text-sm"
                  >
                    {levelFilters.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Duration</label>
                  <select

                    className="w-full px-3 py-2 bg-surface-secondary dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white text-sm"
                  >
                    {durationFilters.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Price Range</label>
                  <select

                    className="w-full px-3 py-2 bg-surface-secondary dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary dark:text-white text-sm"
                  >
                    {priceFilters.map(price => (
                      <option key={price} value={price}>{price}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Breadcrumb with style */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><a href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</a></li>
              <li className="text-gray-300">/</li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Courses</a></li>
              <li className="text-gray-300">/</li>
              <li className="text-text-primary dark:text-white font-medium">{activeCategory}</li>
            </ol>
          </nav>

          {/* Featured Course Spotlight */}
          <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1">
            <div className="bg-surface-primary dark:bg-gray-900 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      FEATURED
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      LIMITED TIME
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-white leading-tight">
                    {activeCategory} Bootcamp
                  </h3>

                  <p className="text-text-secondary dark:text-gray-300 text-lg leading-relaxed">
                    Master both frontend and backend development. Build 5 real-world projects including an e-commerce site, social media app, and more.
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-gray-500">(15,678 reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>20 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-green-500" />
                      <span>160 lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-text-primary dark:text-white">$19.99</span>
                      <span className="text-lg text-gray-500 line-through">$89.99</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-lg">78% OFF</span>
                    </div>
                  </div>

                  <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                    Enroll Now - Limited Time
                  </button>
                </div>

                <div className="relative">
                  <img src={c2} alt="Featured Course" className="w-80 h-48 object-cover rounded-2xl shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Categories Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-text-primary  mb-4">
                Explore by Category
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Master every aspect of {activeCategory}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {categoryFilters.slice(1).map((category, index) => {
                const categoryCount = courses.filter(course => course.category === category).length;
                const gradients = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-green-500 to-teal-500',
                  'from-orange-500 to-red-500',
                  'from-indigo-500 to-purple-500',
                  'from-pink-500 to-rose-500'
                ];
                return (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`p-4 rounded-2xl text-white  transition-all duration-300 transform hover:scale-105 ${
                      categoryFilter === category
                        ? `bg-gradient-to-br ${gradients[index]} shadow-lg shadow-blue-500/25`
                        : 'bg-surface-primary dark:bg-gray-800 border border-border-light dark:border-gray-700 hover:shadow-lg'
                    }`}
                  >
                    <div className="text-sm font-semibold">{category}</div>
                    <div className="text-xs opacity-75">{categoryCount} courses</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Courses Grid */}
          <section aria-labelledby="courses-heading" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 id="courses-heading" className="text-3xl font-bold text-text-primary dark:text-white">
                  {categoryFilter === "All Categories" ? `All ${activeCategory} Courses` : `${categoryFilter} Courses`}
                </h2>
                <p className="text-text-secondary dark:text-gray-300 mt-2">
                  {sortedCourses.length} courses • Lifetime access • Certificate of completion
                </p>
              </div>
            </div>

            {sortedCourses.length === 0 ? (
              <div className="text-center py-16 bg-surface-secondary dark:bg-gray-800/50 rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2 text-text-primary dark:text-white">No courses found</h3>
                <p className="text-text-secondary dark:text-gray-300">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {sortedCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-fade-in group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CourseCard
                      course={course}
                      className="h-full hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>



        </div>
      </main>
    </div>
  );
};

export default Category;










