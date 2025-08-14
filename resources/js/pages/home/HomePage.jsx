
import { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import {
  ChevronLeft, ChevronRight, Sparkles, Award, BookOpen,
  BrainCircuit, ChevronDown, GraduationCap, BookOpenCheck,
  BarChart3, Users, Star
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CourseCard from '../../components/course/CourseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomePage = () => {
  // Hero section carousel
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      title: "Learn Smarter with AI!",
      subtitle: "Personalized courses, smart AI tutoring, and real progress tracking.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "Master New Skills Faster",
      subtitle: "Our AI analyzes your learning style and adapts content to help you succeed.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: "Learn Anywhere, Anytime",
      subtitle: "Access thousands of courses from expert instructors on any device.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Featured courses carousel with shadcn/ui
  const featuredCourses = [
    {
      id: 1,
      title: "Complete React Developer in 2023",
      description: "Learn React from scratch! Build powerful, fast, user-friendly and reactive web apps.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=400",
      author: "Jane Smith",
      rating: 4.8,
      students: 12453,
      lessons: 86,
      duration: "32 hours",
      price: "$89.99",
      level: "All Levels"
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning",
      description: "Learn how to use Python for Data Science, Machine Learning, and Data Visualization.",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&q=80&w=800&h=400",
      author: "Michael Johnson",
      rating: 4.9,
      students: 28152,
      lessons: 120,
      duration: "45 hours",
      price: "$94.99",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Web Design for Beginners: Build Beautiful Websites",
      description: "Learn modern web design techniques and create stunning responsive websites.",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=800&h=400",
      author: "Sarah Williams",
      rating: 4.7,
      students: 8632,
      lessons: 65,
      duration: "28 hours",
      price: "$69.99",
      level: "Beginner"
    },
    {
      id: 9,
      title: "AI and Machine Learning Fundamentals",
      description: "Learn the core concepts of artificial intelligence and machine learning from the ground up.",
      image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&q=80&w=800&h=400",
      author: "James Wilson",
      rating: 4.9,
      students: 9247,
      lessons: 78,
      duration: "38 hours",
      price: "$99.99",
      level: "Intermediate"
    }
  ];

  const popularCourses = [
    {
      id: 4,
      title: "JavaScript - The Complete Guide 2023",
      description: "Master JavaScript with the most comprehensive course! Projects, challenges, quizzes, JavaScript ES6+, OOP, AJAX, Webpack.",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Robert Brown",
      rating: 4.8,
      students: 32541,
      lessons: 45,
      duration: "40 hours",
      price: "$94.99",
      level: "All Levels"
    },
    {
      id: 5,
      title: "UI/UX Design Bootcamp",
      description: "Learn UI/UX design from scratch. This course covers everything from user research to high-fidelity prototypes.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Emma Davis",
      rating: 4.9,
      students: 18734,
      lessons: 72,
      duration: "36 hours",
      price: "$84.99",
      level: "Beginner"
    },
    {
      id: 6,
      title: "The Complete Node.js Developer Course",
      description: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=500&h=280",
      author: "David Wilson",
      rating: 4.7,
      students: 24156,
      lessons: 58,
      duration: "35 hours",
      price: "$89.99",
      level: "Intermediate"
    },
    {
      id: 7,
      title: "Flutter & Dart - The Complete Guide",
      description: "A comprehensive guide to building native iOS and Android apps using Flutter and Dart.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Jessica Taylor",
      rating: 4.8,
      students: 15487,
      lessons: 64,
      duration: "42 hours",
      price: "$99.99",
      level: "Intermediate"
    },
    {
      id: 8,
      title: "AWS Certified Solutions Architect",
      description: "Prepare for the AWS Solutions Architect Associate certification with hands-on labs and practice tests.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Alex Johnson",
      rating: 4.9,
      students: 29754,
      lessons: 53,
      duration: "25 hours",
      price: "$119.99",
      level: "Advanced"
    }
  ];

  // Categories with more attractive icons
  const categories = [
    { name: "Web Development", count: 845, icon: BookOpen, color: "bg-purple-100 gradient-text" },
    { name: "Data Science", count: 621, icon: BrainCircuit, color: "bg-indigo-100 text-indigo-600" },
    { name: "Mobile Development", count: 532, icon: BookOpenCheck, color: "bg-blue-100 text-blue-600" },
    { name: "Design", count: 498, icon: BookOpen, color: "bg-pink-100 text-pink-600" },
    { name: "Business", count: 712, icon: BarChart3, color: "bg-orange-100 text-orange-600" },
    { name: "Marketing", count: 453, icon: Users, color: "bg-green-100 text-green-600" },
    { name: "AI & Machine Learning", count: 386, icon: BrainCircuit, color: "bg-purple-100 gradient-text" },
    { name: "IT & Software", count: 925, icon: BookOpen, color: "bg-blue-100 text-blue-600" }
  ];


  const testimonials = [
    {
      id: 1,
      name: "Emma Thompson",
      role: "Web Developer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The React course completely transformed my career. I went from a beginner to landing a job as a frontend developer in just 3 months."
    },
    {
      id: 2,
      name: "David Chen",
      role: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The Python for Data Science course provided me with all the tools I needed to switch careers. The instructors were knowledgeable and supportive."
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The UI/UX Design Bootcamp helped me build a strong portfolio and understand design principles. I'm now working at my dream company thanks to Learnify!"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "AI Researcher",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The AI Fundamentals course demystified complex concepts and algorithms. The hands-on projects allowed me to build a portfolio that impressed my new employer."
    }
  ];


  const platformFeatures = [
    {
      title: "AI-Powered Tutoring",
      description: "Get personalized guidance and instant answers to your questions with our advanced AI tutor that adapts to your learning style.",
      icon: BrainCircuit
    },
    {
      title: "Smart Assessments",
      description: "Our adaptive quizzes identify your knowledge gaps and provide targeted exercises to strengthen your understanding.",
      icon: Award
    },
    {
      title: "Personalized Learning Paths",
      description: "Receive custom course recommendations and learning pathways based on your goals, interests, and progress.",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section with Slider */}
      <section className="pt-16  min-h-[80vh] relative bg-gradient-to-r from-purple-100 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-10">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-purple-100 animate-fade-in">
                <div className="inline-block px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium mb-4">
                  AI-Powered Education
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-playfair">
                  {heroSlides[currentHeroSlide].title}
                </h1>

                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  {heroSlides[currentHeroSlide].subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-tr from-primary to bg-violet-600  hover:bg-purple-700 px-6 py-3 text-base font-medium text-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/courses"
                    className="inline-flex text-primary items-center justify-center rounded-md border-2 border-purple-600 bg-white hover:bg-purple-50 px-6 py-3 text-base font-medium gradient-text transition-colors"
                  >
                    Explore Courses
                  </Link>
                </div>

                <div className="mt-8 flex space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentHeroSlide === index ? 'bg-gradient-to-tr from-primary to bg-violet-600  w-6' : 'bg-purple-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-full h-full bg-purple-200 rounded-lg transform rotate-3"></div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-indigo-200 rounded-lg transform -rotate-3"></div>
                <img
                  src={heroSlides[currentHeroSlide].image}
                  alt="Learning illustration"
                  className="relative z-10 rounded-lg shadow-2xl w-full max-w-md object-cover transform transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar - Floating Effect */}
        <div className="container mb-8 mx-auto px-4 md:px-6 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-xl border border-purple-100 transform hover:shadow-2xl transition-all">
            <div className="text-center p-4 hover:bg-purple-50 rounded-lg transition-colors">
              <p className="text-3xl font-bold text-primary">1.2M+</p>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="text-center p-4 hover:bg-purple-50 rounded-lg transition-colors">
              <p className="text-3xl font-bold text-primary">5,400+</p>
              <p className="text-gray-600">Courses Available</p>
            </div>
            <div className="text-center p-4 hover:bg-purple-50 rounded-lg transition-colors">
              <p className="text-3xl font-bold text-primary">480+</p>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="text-center p-4 hover:bg-purple-50 rounded-lg transition-colors">
              <p className="text-3xl font-bold text-primary">4.8/5</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Explore Top Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the perfect course for you across our wide range of categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} courses</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-purple-100 gradient-text hover:bg-purple-200 rounded-full font-medium transition-colors"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Carousel with shadcn/ui */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">Featured Courses</h2>
              <p className="text-lg text-gray-600">
                Handpicked courses curated by our experts
              </p>
            </div>
            <Link
              to="/courses"
              className="text-primary hover:text-purple-700 font-medium hidden md:flex items-center mt-4 md:mt-0"
            >
              View All Courses
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {featuredCourses.map((course) => (
                <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <CourseCard course={course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 border-purple-200 bg-white hover:bg-purple-50 text-purple-700" />
              <CarouselNext className="static translate-y-0 border-purple-200 bg-white hover:bg-purple-50 text-purple-700" />
            </div>
          </Carousel>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-md border border-purple-600 px-6 py-3 text-base font-medium gradient-text hover:bg-purple-50 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Why Learn with Learnify?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers an unparalleled learning experience with features designed to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 gradient-text" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">Popular Courses</h2>
              <p className="text-lg text-gray-600">
                Most in-demand courses from our students
              </p>
            </div>
            <Link
              to="/courses"
              className="gradient-text hover:text-purple-700 font-medium hidden md:flex items-center mt-4 md:mt-0"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularCourses.slice(0, 8).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-md border border-purple-600 px-6 py-3 text-base font-medium gradient-text hover:bg-purple-50 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their careers with Learnify
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl text-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-4"
                      />
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="relative left-0 translate-x-0 border-purple-200 bg-white hover:bg-purple-50 text-purple-700" />
              <CarouselNext className="relative right-0 translate-x-0 border-purple-200 bg-white hover:bg-purple-50 text-purple-700" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2">
              <span className="inline-block px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-full text-sm font-medium mb-4">
                Start Your Journey Today
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Join thousands of students already learning on Learnify. Unlock your potential with courses taught by industry experts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-base font-bold text-primary hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Sign Up For Free
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about Learnify
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const content = parent.querySelector('.content');
                  const icon = e.currentTarget.querySelector('svg');

                  if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                  }
                }}
              >
                <span className="font-medium text-gray-900">How do courses work on Learnify?</span>
                <ChevronDown className="h-5 w-5 gradient-text transform transition-transform duration-200" />
              </button>
              <div className="content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="px-6 pb-4 text-gray-600">
                  Courses on Learnify are designed to be self-paced. They include video lectures, downloadable resources, quizzes, and projects. You can access your courses anytime on any device with an internet connection.
                </div>
              </div>
            </div>

            <div className="border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const content = parent.querySelector('.content');
                  const icon = e.currentTarget.querySelector('svg');

                  if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                  }
                }}
              >
                <span className="font-medium text-gray-900">Are the certificates recognized by employers?</span>
                <ChevronDown className="h-5 w-5 gradient-text transform transition-transform duration-200" />
              </button>
              <div className="content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="px-6 pb-4 text-gray-600">
                  Yes, many employers recognize Learnify certificates as evidence of skill development. Our certificates showcase your achievement and the skills you've acquired, which can enhance your resume and LinkedIn profile.
                </div>
              </div>
            </div>

            <div className="border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const content = parent.querySelector('.content');
                  const icon = e.currentTarget.querySelector('svg');

                  if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                  }
                }}
              >
                <span className="font-medium text-gray-900">How do I become an instructor?</span>
                <ChevronDown className="h-5 w-5 gradient-text transform transition-transform duration-200" />
              </button>
              <div className="content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="px-6 pb-4 text-gray-600">
                  To become an instructor, sign up for a teacher account, prepare your course content, and submit it for review. Our team will provide feedback and guidance to ensure your course meets our quality standards before it's published.
                </div>
              </div>
            </div>

            <div className="border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const content = parent.querySelector('.content');
                  const icon = e.currentTarget.querySelector('svg');

                  if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                  }
                }}
              >
                <span className="font-medium text-gray-900">What is the refund policy?</span>
                <ChevronDown className="h-5 w-5 gradient-text transform transition-transform duration-200" />
              </button>
              <div className="content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="px-6 pb-4 text-gray-600">
                  We offer a 30-day money-back guarantee for most courses. If you're unsatisfied with your course, you can request a refund within 30 days of purchase as long as you haven't completed more than 30% of the course content.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
