
import { Users, BookOpen, Award, Percent, TrendingUp } from 'lucide-react';

const TeacherStats = ({ stats }) => {
  // Default stats if not provided
  const defaultStats = {
    totalStudents: 1245,
    totalCourses: 8,
    completionRate: 78,
    averageRating: 4.7,
    totalRevenue: "$12,480",
    studentGrowth: 12,
    courseEngagement: 85
  };

  const teacherStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Students Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-soft-purple p-3 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="text-2xl font-bold">{teacherStats.totalStudents}</p>
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{teacherStats.studentGrowth}% from last month</span>
        </div>
      </div>

      {/* Courses Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-soft-purple p-3 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
            <p className="text-2xl font-bold">{teacherStats.totalCourses}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-gray-500">Active</p>
            <p className="font-medium">{Math.round(teacherStats.totalCourses * 0.8)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Draft</p>
            <p className="font-medium">{Math.round(teacherStats.totalCourses * 0.2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Archived</p>
            <p className="font-medium">0</p>
          </div>
        </div>
      </div>

      {/* Course Completion Rate */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-soft-purple p-3 rounded-lg">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="text-2xl font-bold">{teacherStats.completionRate}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${teacherStats.completionRate}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Average across all courses</p>
      </div>

      {/* Revenue Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-soft-purple p-3 rounded-lg">
            <Percent className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold">{teacherStats.totalRevenue}</p>
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>8% increase this month</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherStats;
