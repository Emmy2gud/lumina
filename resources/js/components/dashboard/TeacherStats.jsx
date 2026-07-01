import { Users, BookOpen, Award, Percent, TrendingUp } from "lucide-react";

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
        <div
            className="
      relative overflow-hidden
      rounded-2xl p-6
     bg-white/50
      boder border-1 border-gray-600/10
      shadow-md
      backdrop-blur
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10
    "
        >
            {children}
        </div>
    );

    const IconWrapper = ({ color, children }) => (
        <div className={`p-3 rounded-xl ${color}`}>{children}</div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


            <Card className="p-4 border-border-medium bg-card-warning">
                <p className="text-sm text-secondary">Total Students</p>
                <div className="flex justify-between">
               <div className="flex justify-between items-center gap-2 mt-2">
                    <IconWrapper color="bg-primary-500 text-white">
                        <Users className="w- h-6" />
                    </IconWrapper>
                    <p className="text-2xl font-bold text-primary"> {s.totalStudents.toLocaleString()}</p>
                </div>
                <span className="flex items-center bg-success text-white text-sm px-2 h-6 rounded-full mt-4">
                        <TrendingUp className="w-4 h-4 mr-1" />+
                        {s.studentGrowth}%
                    </span>
                </div>
 
            </Card>

            <Card className="p-4 border-border-medium bg-card-blue">
                <p className="text-sm text-secondary">Total Courses</p>
                <div className="flex justify-between">
               <div className="flex justify-between items-center gap-2 mt-2">
                    <IconWrapper color="bg-primary-500 text-white">
                        <BookOpen className="w-6 h-6" />
                    </IconWrapper>
                    <p className="text-2xl font-bold text-primary-500">{s.totalCourses}</p>
                </div>
                </div>
            </Card>
            
            <Card className="p-4 border-border-medium bg-card-green">
                <p className="text-sm text-secondary">Completion Rate</p>
                <div className="flex justify-between">
               <div className="flex justify-between items-center gap-2 mt-2">
                    <IconWrapper color="bg-primary-500 text-white">
                        <Award className="w-6 h-6" />
                    </IconWrapper>
                    <p className="text-2xl font-bold text-primary-500">{s.completionRate}%</p>
                </div>
                </div>
            </Card>
            
            <Card className="p-4 border-border-medium bg-card-emerald"> 
                <p className="text-sm text-secondary">Total Revenue</p>
                <div className="flex justify-between">
               <div className="flex justify-between items-center gap-2 mt-2">
                    <IconWrapper color="bg-primary-500 text-white">
                        <Percent className="w-6 h-6" />
                    </IconWrapper>
                    <p className="text-2xl font-bold text-primary-500">{s.totalRevenue}</p>
                </div>
                <span className="flex items-center bg-success text-white text-sm px-2 h-6 rounded-full mt-4">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        8%
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default TeacherStats;
