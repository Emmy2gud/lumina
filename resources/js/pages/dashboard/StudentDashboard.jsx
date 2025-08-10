
import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { PlayCircle, BookOpen, Clock, Award, ChevronRight, Calendar, CheckCircle, User, BarChart, PieChart, Flag } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StudentProgress from '../../components/dashboard/StudentProgress';
import CourseCard from '../../components/course/CourseCard';

const StudentDashboard = () => {
  // Sample enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Master the basics of React, including components, props, and state.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Jane Smith",
      progress: 68,
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "UI Design Basics",
      description: "Learn the principles of effective UI design and create beautiful interfaces.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Emma Davis",
      progress: 42,
      lastAccessed: "Yesterday"
    },
    {
      id: 3,
      title: "JavaScript ES6 Essentials",
      description: "Understand modern JavaScript features and improve your code quality.",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Robert Brown",
      progress: 23,
      lastAccessed: "5 days ago"
    }
  ];

  // Sample recommended courses
  const recommendedCourses = [
    {
      id: 4,
      title: "Advanced React Patterns",
      description: "Take your React skills to the next level with advanced patterns and techniques",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Sarah Williams",
      rating: 4.9,
      students: 15632,
      lessons: 42,
      duration: "18 hours",
      price: "$79.99",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Redux for State Management",
      description: "Master Redux and learn how to manage complex state in your applications",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=500&h=280",
      author: "Jessica Taylor",
      rating: 4.8,
      students: 12754,
      lessons: 38,
      duration: "15 hours",
      price: "$69.99",
      level: "Intermediate"
    }
  ];

  // Sample upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      course: "React Fundamentals",
      assignment: "Final Project",
      due: "Oct 25, 2023",
      daysLeft: 3
    },
    {
      id: 2,
      course: "UI Design Basics",
      assignment: "Portfolio Design",
      due: "Oct 30, 2023",
      daysLeft: 8
    }
  ];

  // Sample activity data for chart
  const activityData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 1.0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 1.0 }
  ];

  // Calculate the max hours for scaling
  const maxHours = Math.max(...activityData.map(day => day.hours));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-16 md:pt-0 flex">
        {/* Sidebar */}
        <Sidebar isTeacher={false} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">
                Track your progress, manage your courses, and continue learning
              </p>
            </div>

            {/* Student Progress */}
            <StudentProgress />

            {/* Continue Learning Section */}
            <section className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link
                          to={`/courses/${course.id}`}
                          className="bg-white/20 hover:bg-white/30 p-3 rounded-full"
                        >
                          <PlayCircle className="h-8 w-8 text-white" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">by {course.author}</p>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{course.progress}% completed</span>
                          <span className="text-learnify-primary">Resume</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-learnify-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last accessed: {course.lastAccessed}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/courses"
                  className="inline-flex items-center text-learnify-primary hover:text-learnify-secondary font-medium"
                >
                  View All Enrolled Courses
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </section>

            {/* Calendar and Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Activity Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="font-bold text-lg mb-6">Weekly Activity</h2>

                <div className="h-48">
                  <div className="flex h-40 items-end space-x-2">
                    {activityData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-learnify-primary/80 hover:bg-learnify-primary rounded-t transition-colors"
                          style={{ height: `${(item.hours / maxHours) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">{item.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Total Learning Time</p>
                    <p className="text-lg font-bold text-learnify-primary">11.5 hours</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ↑ 28% from last week
                    </span>
                  </div>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="font-bold text-lg mb-6">Upcoming Deadlines</h2>

                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start">
                      <div className={`p-2 rounded-md mr-3 ${
                        deadline.daysLeft <= 3
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{deadline.assignment}</h3>
                        <p className="text-sm text-gray-500">{deadline.course}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Due: {deadline.due}</span>
                          <span className={`text-xs font-medium ${
                            deadline.daysLeft <= 3
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`}>
                            {deadline.daysLeft} days left
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {upcomingDeadlines.length === 0 && (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600">No upcoming deadlines!</p>
                  </div>
                )}

                <div className="mt-6 text-center border-t border-gray-100 pt-4">
                  <Link
                    to="/calendar"
                    className="inline-flex items-center text-learnify-primary hover:text-learnify-secondary font-medium text-sm"
                  >
                    View Calendar
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Learning Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="font-bold text-lg mb-6">Learning Stats</h2>

                <div className="space-y-6">
                  {/* Skills Breakdown */}
                  <div>
                    <h3 className="font-medium text-sm mb-3 flex items-center">
                      <PieChart className="h-4 w-4 mr-2 text-learnify-primary" />
                      Skills Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>React</span>
                          <span>68%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-learnify-primary rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>UI Design</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-learnify-secondary rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>JavaScript</span>
                          <span>23%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-learnify-tertiary rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Streak */}
                  <div className="bg-learnify-softPurple p-4 rounded-lg text-center">
                    <h3 className="font-medium text-sm mb-2 flex items-center justify-center">
                      <Flag className="h-4 w-4 mr-2 text-learnify-primary" />
                      Current Streak
                    </h3>
                    <p className="text-3xl font-bold text-learnify-primary">7 days</p>
                    <p className="text-xs text-gray-600 mt-1">Keep learning to maintain your streak!</p>
                  </div>

                  {/* Quiz Performance */}
                  <div>
                    <h3 className="font-medium text-sm mb-3 flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-learnify-primary" />
                      Quiz Performance
                    </h3>
                    <div className="bg-green-100 text-green-800 p-3 rounded-md flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">85% average score</p>
                        <p className="text-xs">You're in the top 15% of students!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <section className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended For You</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}

                <div className="bg-learnify-softPurple rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col items-center justify-center p-8 text-center">
                  <User className="h-12 w-12 text-learnify-primary mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-600 mb-4">
                    Complete your profile to get more tailored course recommendations.
                  </p>
                  <Link
                    to="/profile"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-learnify-primary px-4 py-2 text-sm font-medium text-white hover:bg-learnify-secondary transition-colors"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </section>

            {/* AI Learning Assistant */}
            <section className="mt-8">
              <div className="bg-gradient-to-r from-learnify-primary to-learnify-secondary rounded-lg p-6 md:p-8 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      Need Help with Your Learning?
                    </h2>
                    <p className="mb-4 opacity-90">
                      Our AI Learning Assistant can answer your questions, explain difficult concepts, and help you through challenging assignments.
                    </p>
                    <Link
                      to="/ai"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-learnify-primary hover:bg-opacity-90 transition-colors"
                    >
                      Try AI Assistant
                    </Link>
                  </div>
                  <div className="md:w-1/3">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300&h=200"
                      alt="AI Assistant"
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
