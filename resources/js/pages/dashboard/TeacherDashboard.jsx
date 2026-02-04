import { students, sessions, messages } from "@/data/mockData";
import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { Book, Edit, Trash2, Plus, TrendingUp, Download, Pencil, Eye, BarChart2, PieChart,Users,Star,MessageSquare} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import TeacherStats from '../../components/dashboard/TeacherStats';
import { StudentCard } from '@/components/dashboard/StudentCard';
import { GoalsTracker } from "@/components/dashboard/GoalsTracker";
import { ResourcesWidget } from "@/components/dashboard/ResourcesWidget";
import { PerformanceChart } from "@/components/dashboard/chart/PerformanceChart";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "The Complete React Developer Course",
      students: 1245,
      rating: 4.8,
      published: "2023-06-15",
      revenue: "$12,450",
      status: "Published"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      students: 876,
      rating: 4.7,
      published: "2023-08-03",
      revenue: "$8,760",
      status: "Published"
    },
    {
      id: 3,
      title: "Vue.js for Beginners",
      students: 432,
      rating: 4.5,
      published: "2023-09-20",
      revenue: "$4,320",
      status: "Published"
    },
    {
      id: 4,
      title: "Angular Masterclass",
      students: 0,
      rating: 0,
      published: "-",
      revenue: "$0",
      status: "Draft"
    }
  ];

  // Sample data for revenue chart
  const revenueData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1900 },
    { month: 'Mar', amount: 1500 },
    { month: 'Apr', amount: 2100 },
    { month: 'May', amount: 2400 },
    { month: 'Jun', amount: 1800 },
    { month: 'Jul', amount: 2200 },
    { month: 'Aug', amount: 2600 },
    { month: 'Sep', amount: 2300 },
    { month: 'Oct', amount: 2500 },
    { month: 'Nov', amount: 2800 },
    { month: 'Dec', amount: 3100 }
  ];

  // Find the max revenue for the chart scaling
  const maxRevenue = Math.max(...revenueData.map(item => item.amount));

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'enrollment',
      content: 'New student enrolled in "The Complete React Developer Course"',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'review',
      content: 'New 5-star review on "Advanced JavaScript Concepts"',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'comment',
      content: 'New comment: "Great explanation of React hooks!"',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'enrollment',
      content: '5 new students enrolled in "Vue.js for Beginners"',
      time: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-2">


      <div className="pt-16 md:pt-0 flex">



        {/* Main Content */}
        <div className="flex-1 p-4 ">
          <div className="max-w-6xl mx-auto">


            {/* Stats Cards */}
            <TeacherStats />

            {/* Courses and Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Courses Table */}
              <div className="lg:col-span-4  bg-surface-primary/50
       border-1 border-gray-600/10 rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="font-bold text-lg">Your Courses</h2>
                  <Link
                    to="/create-course"
                    className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-learnify-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New Course
                  </Link>
                </div>

                <div className="">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-secondary">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-surface-secondary">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Book className="h-8 w-8 text-violet-600 opacity-75 mr-3" />
                              <div>
                                <div className="font-medium text-text-primary">{course.title}</div>
                                <div className="text-xs text-gray-500">
                                  Published: {course.published !== '-' ? new Date(course.published).toLocaleDateString() : 'Not published'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {course.students}
                          </td>
                          <td className="px-6 py-4">
                            {course.rating > 0 ? (
                              <div className="flex items-center">
                                <span className="text-sm font-medium mr-1">{course.rating}</span>
                                <svg className="h-4 w-4 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                            ) : (
                              <span className="text-sm text-text-muted">No ratings</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {course.revenue}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center text-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              course.status === 'Published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800 '
                            }`}>
                              {course.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-learnify-primary hover:text-learnify-secondary">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-text-muted hover:text-text-secondary">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-gray-100 text-center">
                  <Link
                    to="/courses"
                    className="text-sm text-learnify-primary hover:text-learnify-secondary font-medium"
                  >
                    View All Courses
                  </Link>
                </div>
              </div>

              {/* Revenue Chart */}

            </div>

            {/* Student Engagement and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Student Engagement */}
              <div className="bg-surface-primary rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-lg mb-6">Student Engagement</h2>

                <div className="space-y-6">
                  {/* Donut Chart - Completion Rate */}
                  <div className="relative h-40 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="15"
                      />

                      {/* Foreground circle - 78% completion */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#9b87f5"
                        strokeWidth="15"
                        strokeDasharray="251.2"
                        strokeDashoffset="55.3"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-3xl font-bold text-learnify-primary">78%</p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-learnify-softPurple p-3 rounded-md text-center">
                      <p className="text-sm text-text-secondary">Avg. Rating</p>
                      <p className="font-bold text-lg text-learnify-primary flex items-center justify-center">
                        4.8
                        <svg className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </p>
                    </div>
                    <div className="bg-learnify-softPurple p-3 rounded-md text-center">
                      <p className="text-sm text-text-secondary">Engagement</p>
                      <p className="font-bold text-lg text-learnify-primary">85%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-surface-primary rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-lg mb-6">Recent Activity</h2>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className={`p-2 rounded-full mr-3 ${
                        activity.type === 'enrollment'
                          ? 'bg-green-100 text-green-600'
                          : activity.type === 'review'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'enrollment' ? (
                          <Users className="h-5 w-5" />
                        ) : activity.type === 'review' ? (
                          <Star className="h-5 w-5" />
                        ) : (
                          <MessageSquare className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-text-secondary">{activity.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-sm text-learnify-primary hover:text-learnify-secondary font-medium">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>

            {/* To-Do List and Analytics */}
            <div>
                    <div className="flex items-center justify-between my-5">
                  <h2 className="text-lg font-semibold text-foreground">Your Students</h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                {/* list of students */}
                {students.slice(0, 6).map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}

            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-8">
                <GoalsTracker/>
                <ResourcesWidget/>

            </div>
            {/* <div className="mt-8">
                <PerformanceChart students={students}/>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;










