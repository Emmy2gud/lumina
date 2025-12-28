import {
  Users,
  BookOpen,
  Award,
  Percent,
  TrendingUp,
} from "lucide-react";

const TeacherStats = ({ stats }) => {
  const defaultStats = {
    totalStudents: 1245,
    totalCourses: 8,
    completionRate: 78,
    averageRating: 4.7,
    totalRevenue: "$12,480",
    studentGrowth: 12,
    courseEngagement: 85,
  };

  const s = stats || defaultStats;

  const Card = ({ children }) => (
    <div className="
      relative overflow-hidden
      rounded-2xl p-6
     bg-white/50
      boder border-1 border-gray-600/10
      shadow-md
      backdrop-blur
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10
    ">
      {children}
    </div>
  );

  const IconWrapper = ({ color, children }) => (
    <div className={`p-3 rounded-xl ${color}`}>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <Card>
        <div className="flex items-center justify-between">
          <IconWrapper color="bg-purple-500/20 text-purple-400">
            <Users className="w-6 h-6" />
          </IconWrapper>

          <span className="flex items-center bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{s.studentGrowth}%
          </span>
        </div>

        <p className="mt-6 text-3xl font-bold text-black">
          {s.totalStudents.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">Total Students</p>
      </Card>

      {/* Courses */}
      <Card>
        <div className="flex items-center justify-between">
          <IconWrapper color="bg-blue-500/20 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </IconWrapper>
          <span className="bg-blue-500/20 text-blue-400 text-sm px-2 py-1 rounded-full">Courses</span>
        </div>

        <p className="mt-6 text-3xl font-bold text-black">
          {s.totalCourses}
        </p>

        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <div>
            <p>Active</p>
            <p className="text-black font-medium">
              {Math.round(s.totalCourses * 0.8)}
            </p>
          </div>
          <div>
            <p>Draft</p>
            <p className="text-wblackfont-medium">
              {Math.round(s.totalCourses * 0.2)}
            </p>
          </div>
          <div>
            <p>Archived</p>
            <p className="text-black font-medium">0</p>
          </div>
        </div>
      </Card>

      {/* Completion Rate */}
      <Card>
        <div className="flex items-center justify-between">
          <IconWrapper color="bg-green-500/20 text-green-400">
            <Award className="w-6 h-6" />
          </IconWrapper>
          <span className="  bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded-full">Completion</span>
        </div>

        <p className="mt-6 text-3xl font-bold text-black">
          {s.completionRate}%
        </p>

        <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${s.completionRate}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Avg across all courses
        </p>
      </Card>

      {/* Revenue */}
      <Card>
        <div className="flex items-center justify-between">
          <IconWrapper color="bg-emerald-500/20 text-emerald-400">
            <Percent className="w-6 h-6" />
          </IconWrapper>

          <span className="flex items-center bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 mr-1" />
            8%
          </span>
        </div>

        <p className="mt-6 text-3xl font-bold text-black">
          {s.totalRevenue}
        </p>
        <p className="text-sm text-gray-400">Total Revenue</p>
      </Card>
    </div>
  );
};

export default TeacherStats;
