
import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, BookOpen, Clock } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CourseCard from '../../components/course/CourseCard';
import { Link } from '@inertiajs/react';

const CoursesPage = ({courses}) => {
    console.log(courses)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);



  // Categories
  const categories = [
    'All',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Marketing',
    'IT & Software',
    'Business'
  ];

  // Levels
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Durations
  const durations = ['All', 'Short (<5h)', 'Medium (5-20h)', 'Long (>20h)'];

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses.data];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'All') {
      result = result.filter(course => course.level === selectedLevel);
    }

    // Filter by duration
    if (selectedDuration !== 'All') {
      if (selectedDuration === 'Short (<5h)') {
        result = result.filter(course => parseInt(course.duration) < 5);
      } else if (selectedDuration === 'Medium (5-20h)') {
        result = result.filter(
          course => parseInt(course.duration) >= 5 && parseInt(course.duration) <= 20
        );
      } else if (selectedDuration === 'Long (>20h)') {
        result = result.filter(course => parseInt(course.duration) > 20);
      }
    }

    // Sort courses
    if (sortBy === 'popular') {
      result.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // In a real app, you would sort by date
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="pt-24 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
            <p className="text-gray-600">
              Discover our wide range of courses to enhance your skills
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="w-full md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Filters (Mobile) */}
            {showFilters && (
              <div className="mt-4 md:hidden space-y-4 p-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="radio"
                            id={`category-${category}`}
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="h-4 w-4 accent-primary  focus:ring-primary-500 focus:outline-none"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Level</h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center">
                          <input
                            type="radio"
                            id={`level-${level}`}
                            name="level"
                            checked={selectedLevel === level}
                            onChange={() => setSelectedLevel(level)}
                            className="h-4 w-4 accent-primary  focus:ring-primary-500 focus:outline-none"
                          />
                          <label
                            htmlFor={`level-${level}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3"></h4>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <div key={duration} className="flex items-center">
                          <input
                            type="radio"
                            id={`duration-${duration}`}
                            name="duration"
                            checked={selectedDuration === duration}
                            onChange={() => setSelectedDuration(duration)}
                            className="h-4 w-4 accent-primary  focus:ring-primary-500 focus:outline-none"
                          />
                          <label
                            htmlFor={`duration-${duration}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {duration}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-soft-purple text-white px-2 py-1 rounded-full">
                    javascript
                  </span>
                  <span className="text-xs bg-soft-purple text-white px-2 py-1 rounded-full">
                    react
                  </span>
                  <span className="text-xs bg-soft-purple text-white px-2 py-1 rounded-full">
                    python
                  </span>
                  <span className="text-xs bg-soft-purple text-white px-2 py-1 rounded-full">
                    machine learning
                  </span>
                  <span className="text-xs bg-soft-purple text-white px-2 py-1 rounded-full">
                    design
                  </span>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1">
              {/* Results summary */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  {filteredCourses.length} courses found
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>

                {/* View toggle buttons */}
                <div className="hidden md:flex space-x-2">
                  <button className="p-2 rounded bg-soft-purple text-white">
                    <BookOpen className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded bg-white border border-gray-200 text-gray-500 hover:bg-soft-purple hover:text-primary">
                    <Clock className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Courses */}
              {courses.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.data.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-lg text-gray-600 mb-4">
                    No courses found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedLevel('All');
                      setSelectedDuration('All');
                    }}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}


                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    {/* <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-soft-purple hover:text-primary">
                    Prev
                    </button>
                    <button className="px-3 py-1 rounded-md bg-primary text-white">
                       {courses.from}
                    </button> */}

                     {courses.links.map((link)=>(
                        <Link prefetch key={link.label } preserveScroll={true} href={link.url ?? ''} className={`px-3 py-1 rounded-md  border border-gray-300 text-gray-500 hover:bg-soft-purple hover:text-white ${link.active?"bg-primary text-white":null}`} dangerouslySetInnerHTML={{__html:link.label}} />



                     ))

                     }

                    {/* <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-soft-purple hover:text-primary">
                      {courses.last_page}
                    </button>
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-soft-purple hover:text-primary">
                      Next
                    </button> */}
                  </nav>
                </div>



            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CoursesPage;
