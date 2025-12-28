import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import { usePage } from '@inertiajs/react';
import CourseCard from "../../components/CourseCard";
import { Link } from "@inertiajs/react";
import FlashMessage from "../../components/modal/FlashMessage";
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';






const categorySections = [
  "Development",
  "Design",
  "Data Science",
  "Marketing",
  "Cloud",
  "Cybersecurity",
  "AI & ML",
  "Product",
];

const topicrecommendations = [
  { id: "1", title: "React.js",},
    { id: "2", title: "UI/UX Design",},
    { id: "3", title: "Python Programming",},
    { id: "4", title: "Digital Marketing",},
    { id: "5", title: "Data Analysis",},
    { id: "6", title: "Machine Learning",},
    { id: "7", title: "Cloud Computing",},
    { id: "8", title: "Cybersecurity Basics",},]




const Explore = ({courses,coursecategories}) => {
    const getCoursesByCategory = (cat) => courses.data.filter((c) => c.category === cat);
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredCourses = courses.data.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
    <div className="min-h-screen bg-card">

    <FlashMessage flash={flash} />
      {/* <Hero /> */}

      <main>
        {/* Search and Filter Section */}
        <section className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-6 ">
            {/* Search Bar */}
            <div className="relative group mt-20 ">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search courses by title, topic, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 border-2 border-border-medium rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card transition-all duration-300 text-lg "
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-text-muted hover:text-text-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Categories */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-text-secondary font-semibold">
                <Filter className="h-5 w-5 text-primary" />
                <span>Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    !selectedCategory
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-card border-2 border-border-medium text-text-secondary hover:border-primary'
                  }`}
                >
                  All Courses
                </button>
                {categorySections.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-card border-2 border-border-medium text-text-secondary hover:border-primary hover:bg-card-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Info */}
        {searchQuery || selectedCategory ? (
          <section className="container mx-auto px-4 pb-8">
            <p className="text-text-secondary">
              Found <span className="font-bold text-primary">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </section>
        ) : null}


        {/* Show filtered results if search/filter is active */}
        {(searchQuery || selectedCategory) && (
          <section className="container mx-auto py-12 px-4" aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-4xl font-bold text-text-primary mb-10">Search Results</h2>
            {filteredCourses.length > 0 ? (
              <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {filteredCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-card-primary mb-4">
                  <Search className="h-8 w-8 text-text-muted" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">No courses found</h3>
                <p className="text-text-secondary max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* Popular Courses - Show only when no search/filter is active */}
        {!searchQuery && !selectedCategory && (
        <section id="courses" className="container mx-auto py-16" aria-labelledby="popular-heading">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 id="popular-heading" className="text-4xl font-bold text-text-primary">Popular Courses</h2>
              <p className="text-lg text-text-secondary font-light mt-2">Trending now across all categories</p>
            </div>
            <a href="#" className="text-primary hover:text-secondary font-semibold hidden md:block">See all →</a>
          </div>

          <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {courses.data.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
        )}


        {/* Promo Banner - Show only when no search/filter is active */}
        {!searchQuery && !selectedCategory && (
        <section className="container mx-auto py-8" aria-labelledby="promo-banner">
          <div className="rounded-2xl border border-primary/30 p-8 md:p-12 bg-gradient-primary-to-secondary text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 id="promo-banner" className="text-3xl md:text-4xl font-bold">Level up this week — up to 80% off</h2>
                <p className="mt-3 text-white/90 text-lg font-light">Top picks across Development, Design, Data, Cloud and more.</p>
              </div>
              <a href="#development" className="inline-flex items-center rounded-xl px-8 py-3 text-sm font-bold bg-card text-primary hover:bg-card-primary transition-all duration-300 flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105">
                Browse deals
              </a>
            </div>
          </div>
        </section>
        )}

        {/* Category sections - Show only when no search/filter is active */}
        {!searchQuery && !selectedCategory && (
          Object.entries(coursecategories).map(([section, categoryData]) => (
            <section key={section} id={section.replace(/\s+/g, '-').toLowerCase()} className="container mx-auto py-16" aria-labelledby={`${section}-heading`}>
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <h2 id={`${section}-heading`} className="text-4xl font-bold text-text-primary">{section}</h2>
        <p className="text-lg text-text-secondary font-light mt-2">Curated courses in {section}</p>
      </div>
      <a href="#" className="text-primary hover:text-secondary font-semibold hidden md:block">See all →</a>
    </div>

    <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {categoryData.data.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  </section>
))) }


{/* topics recommendations */}
        <section className="container mx-auto py-16" aria-labelledby="topics-heading">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 id="topics-heading" className="text-4xl font-bold text-text-primary">Explore Topics</h2>
              <p className="text-lg text-text-secondary font-light mt-2">Discover courses by topic</p>
            </div>
            <a href="#" className="text-primary hover:text-secondary font-semibold hidden md:block">See all →</a>
          </div>
          <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {topicrecommendations.map((c) => (
 <div key={c.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border-medium hover:border-primary hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer">
              <h3 className="font-bold text-lg text-text-primary mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                {c.title}
              </h3>
              <Link
                  href={`/topic/${c.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
              >
                  Explore
              </Link>
            </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
};

export default Explore;










