import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Filter,
  Grid,
  List,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { courses } from "@/data/studentMockData";


// Extended course data with more details
const extendedCourses = [
  {
    ...courses[0],
    description: "Master calculus, algebra, and differential equations with hands-on problem solving.",
    rating: 4.8,
    studentsEnrolled: 1245,
    difficulty: "Advanced",
    totalDuration: "24 hours",
    quizCount: 8,
    lastAccessed: "2 hours ago",
    certificateAvailable: true,
  },
  {
    ...courses[1],
    description: "Explore mechanics, thermodynamics, and wave physics through interactive experiments.",
    rating: 4.6,
    studentsEnrolled: 987,
    difficulty: "Intermediate",
    totalDuration: "20 hours",
    quizCount: 6,
    lastAccessed: "1 day ago",
    certificateAvailable: true,
  },
  {
    ...courses[2],
    description: "Learn organic reactions, molecular structures, and lab techniques.",
    rating: 4.9,
    studentsEnrolled: 756,
    difficulty: "Advanced",
    totalDuration: "18 hours",
    quizCount: 7,
    lastAccessed: "3 hours ago",
    certificateAvailable: true,
  },
  {
    ...courses[3],
    description: "Analyze classic literature, improve writing skills, and explore poetry.",
    rating: 4.5,
    studentsEnrolled: 654,
    difficulty: "Intermediate",
    totalDuration: "16 hours",
    quizCount: 5,
    lastAccessed: "2 days ago",
    certificateAvailable: false,
  },
  {
    ...courses[4],
    description: "Build a strong foundation in programming concepts and algorithms.",
    rating: 4.9,
    studentsEnrolled: 2341,
    difficulty: "Beginner",
    totalDuration: "22 hours",
    quizCount: 10,
    lastAccessed: "Completed",
    certificateAvailable: true,
  },
  {
    id: "c6",
    title: "Data Science Essentials",
    thumbnail: "📊",
    progress: 25,
    totalLessons: 20,
    completedLessons: 5,
    timeSpent: "4h 30m",
    nextLesson: "Data Visualization",
    instructor: "Dr. Alex Rivera",
    category: "Technology",
    description: "Learn data analysis, visualization, and machine learning basics.",
    rating: 4.7,
    studentsEnrolled: 1876,
    difficulty: "Intermediate",
    totalDuration: "28 hours",
    quizCount: 8,
    lastAccessed: "4 hours ago",
    certificateAvailable: true,
  },
  {
    id: "c7",
    title: "World History: Modern Era",
    thumbnail: "🌍",
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    timeSpent: "0h",
    nextLesson: "Introduction",
    instructor: "Prof. Maria Santos",
    category: "Humanities",
    description: "Explore major historical events and their impact on modern society.",
    rating: 4.4,
    studentsEnrolled: 432,
    difficulty: "Beginner",
    totalDuration: "14 hours",
    quizCount: 5,
    lastAccessed: "Not started",
    certificateAvailable: false,
  },
  {
    id: "c8",
    title: "Creative Writing Workshop",
    thumbnail: "✍️",
    progress: 15,
    totalLessons: 12,
    completedLessons: 2,
    timeSpent: "2h 15m",
    nextLesson: "Character Development",
    instructor: "Ms. Julia Wright",
    category: "Humanities",
    description: "Develop your storytelling skills and find your unique voice.",
    rating: 4.6,
    studentsEnrolled: 567,
    difficulty: "Beginner",
    totalDuration: "10 hours",
    quizCount: 3,
    lastAccessed: "1 week ago",
    certificateAvailable: false,
  },
];

const difficultyColors = {
  Beginner: "bg-success/20 text-success border-success/30",
  Intermediate: "bg-warning/20 text-warning border-warning/30",
  Advanced: "bg-danger/20 text-danger border-danger/30",
};

const CourseCard = ({ course, viewMode }) => {

  const isCompleted = course.progress === 100;
  const isNotStarted = course.progress === 0;

  if (viewMode === "list") {
    return (
      <Card className="p-4 border-border-medium bg-card backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-xl bg-card-primary">
            {course.thumbnail}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <Badge variant="outline" className={difficultyColors[course.difficulty] + " border-border-medium"}>
                {course.difficulty}
              </Badge>
              {isCompleted && (
                <Badge className="bg-success/20 text-success border-success/30 border-border-medium">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-sm text-text-secondary line-clamp-1">{course.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-warning fill-warning" />
                {course.rating}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {course.studentsEnrolled.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.totalDuration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {course.totalLessons} lessons
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-text-primary">{course.progress}%</p>
              <p className="text-xs text-text-secondary">Progress</p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-secondary text-white" onClick={() => navigate("/quiz")}>
              {isCompleted ? (
                <>
                  <Award className="w-4 h-4" />
                  Certificate
                </>
              ) : isNotStarted ? (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Continue
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-border-medium bg-card backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
      {/* Thumbnail Header */}
      <div className="relative h-32 bg-gradient-primary-to-secondary/20 flex items-center justify-center">
        <span className="text-6xl">{course.thumbnail}
        <Badge
          variant="outline"
          className={`absolute top-3 right-3 ${difficultyColors[course.difficulty]} border-border-medium`}
        >
          {course.difficulty}
        </Badge>
        </span>
        {isCompleted && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-success/20 text-success border-success/30 border-border-medium">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          </div>
        )}
        {course.certificateAvailable && isCompleted && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-warning/20 text-warning border-warning/30 border-border-medium">
              <Award className="w-3 h-3 mr-1" />
              Certificate
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs bg-card-primary border-border-medium text-text-secondary">
              {course.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-warning">
              <Star className="w-3 h-3 text-warning fill-warning" />
              <span>{course.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-text-secondary mt-1">{course.instructor}</p>
        </div>

        <p className="text-sm text-text-secondary line-clamp-2">
          {course.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.totalDuration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.studentsEnrolled.toLocaleString()}
          </span>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2 bg-border-medium" />
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{course.completedLessons}/{course.totalLessons} modules</span>
            <span>{course.timeSpent} spent</span>
          </div>
        </div>

        {/* Next Lesson */}
        {!isCompleted && course.nextLesson !== "Course Complete" && (
          <div className="p-3 rounded-lg bg-card-primary border border-border-medium">
            <p className="text-xs text-text-secondary mb-1">Next lesson</p>
            <p className="text-sm font-medium text-text-primary flex items-center gap-2">
              {course.nextLesson}
              <ChevronRight className="w-4 h-4 text-primary" />
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button className="w-full gap-2 group-hover:shadow-lg transition-all bg-primary hover:bg-secondary text-white" onClick={() => navigate("/quiz")}>
          {isCompleted ? (
            <>
              <Award className="w-4 h-4" />
              View Certificate
            </>
          ) : isNotStarted ? (
            <>
              <Play className="w-4 h-4" />
              Start Course
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Continue Learning
            </>
          )}
        </Button>

        {/* Last Accessed */}
        <p className="text-xs text-center text-text-secondary">
          Last accessed: {course.lastAccessed}
        </p>
      </div>
    </Card>
  );
};

const StudentCoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredCourses = extendedCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "completed" && course.progress === 100) ||
      (statusFilter === "in-progress" && course.progress > 0 && course.progress < 100) ||
      (statusFilter === "not-started" && course.progress === 0);

    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(extendedCourses.map(c => c.category))];

  return (
    <div className="min-h-screen bg-card">


      <main className="container mx-auto px-4 py-6 space-y-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              My Courses
            </h1>
            <p className="text-text-muted  mt-1">
              Continue your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className=" border-border-medium"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border-border-medium bg-card-primary">
            <p className="text-sm text-text-secondary">Total Enrolled</p>
            <p className="text-2xl font-bold text-text-primary">{extendedCourses.length}</p>
          </Card>
          <Card className="p-4 border-border-medium bg-card-warning">
            <p className="text-sm text-text-secondary">In Progress</p>
            <p className="text-2xl font-bold text-text-primary">
              {extendedCourses.filter(c => c.progress > 0 && c.progress < 100).length}
            </p>
          </Card>
          <Card className="p-4 border-border-medium bg-card-success">
            <p className="text-sm text-text-secondary">Completed</p>
            <p className="text-2xl font-bold text-text-primary">
              {extendedCourses.filter(c => c.progress === 100).length}
            </p>
          </Card>
          <Card className="p-4 border-border-medium bg-card-info">
            <p className="text-sm text-text-secondary">Certificates</p>
            <p className="text-2xl font-bold text-text-primary">
              {extendedCourses.filter(c => c.progress === 100 && c.certificateAvailable).length}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 border-border-medium bg-card backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border-medium bg-card text-text-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 border-border-medium bg-card text-text-primary">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40 border-border-medium bg-card text-text-primary">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Course Grid/List */}
        {filteredCourses.length > 0 ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <Card className="p-12 border-border-medium bg-card backdrop-blur-sm text-center">
            <Sparkles className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No courses found</h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }} className="bg-primary hover:bg-secondary">
              Clear Filters
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StudentCoursePage;
