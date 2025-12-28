import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Send,
} from "lucide-react";
import { submissions, tutorStats, } from "@/data/quizMockData";
import { toast } from "sonner";

const StatCard = ({
  icon: Icon,
  title,
  value,
  trend,
  trendPositive,
  color,
}) => (
  <Card className="p-6 border border-border/40 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm mt-1 ${
              trendPositive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <TrendingUp className={`w-3 h-3 ${!trendPositive && "rotate-180"}`} />
            <span>
              {trendPositive ? "+" : ""}
              {trend} from yesterday
            </span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-2xl bg-gradient-to-br shadow-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </Card>
);

const GradingModal = ({
  submission,
  onClose,
  onGrade,
}) => {
  const [score, setScore] = useState(submission.score?.toString() || "");
  const [feedback, setFeedback] = useState(submission.feedback || "");

  const handleSubmit = () => {
    const numScore = parseInt(score);
    if (isNaN(numScore) || numScore < 0 || numScore > submission.totalPoints) {
      toast.error(`Score must be between 0 and ${submission.totalPoints}`);
      return;
    }
    onGrade(submission.id, numScore, feedback);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            Grade Submission
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold text-primary">
              {submission.studentAvatar}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {submission.studentName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {submission.courseName}
              </p>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assignment</span>
              <span className="font-medium text-foreground">
                {submission.assignmentTitle}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <Badge variant="secondary" className="capitalize">
                {submission.assignmentType.replace("-", " ")}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Submitted</span>
              <span className="text-foreground">{submission.submittedOn}</span>
            </div>
          </div>

          {/* Grading Section */}
          <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Score (out of {submission.totalPoints})
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter score"
                  className="w-32"
                  min={0}
                  max={submission.totalPoints}
                />
                <span className="text-muted-foreground">
                  / {submission.totalPoints} points
                </span>
                {score && (
                  <Badge
                    className={
                      parseInt(score) >= 80
                        ? "bg-status-success/20 text-status-success"
                        : parseInt(score) >= 60
                        ? "bg-status-warning/20 text-status-warning"
                        : "bg-status-danger/20 text-status-danger"
                    }
                  >
                    {Math.round((parseInt(score) / submission.totalPoints) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Feedback
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback for the student..."
                rows={4}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => toast.info("Draft saved")}>
              Save Draft
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Send className="w-4 h-4" />
              Submit Grade
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StudentSubmissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [submissionData, setSubmissionData] = useState(submissions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredSubmissions = submissionData.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedSubmissions.length === paginatedSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(paginatedSubmissions.map((s) => s.id));
    }
  };

  const handleSelectSubmission = (id) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGrade = (id, score, feedback) => {
    setSubmissionData((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, score, feedback, status: "graded"}
          : sub
      )
    );
    toast.success("Grade submitted successfully!");
  };

  const getScoreColor = (score ,total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "bg-status-success/20 text-status-success";
    if (percentage >= 60) return "bg-status-warning/20 text-status-warning";
    return "bg-status-danger/20 text-status-danger";
  };

  return (
    <div className="min-h-screen bg-background">


      <main className="container mx-auto px-4 py-6 space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Student Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and grade student assignments and quizzes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FileText}
            title="Total Submissions"
            value={tutorStats.totalSubmissions}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Pending Reviews"
            value={tutorStats.pendingReviews}
            trend={tutorStats.pendingTrend}
            trendPositive={false}
            color="bg-gradient-to-br from-amber-500 to-orange-500"
          />
          <StatCard
            icon={CheckCircle}
            title="Graded Today"
            value={tutorStats.gradedToday}
            trend={tutorStats.gradedTrend}
            trendPositive={true}
            color="bg-gradient-to-br from-emerald-500 to-green-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Average Score"
            value={`${tutorStats.averageScore}%`}
            color="bg-gradient-to-br from-purple-500 to-violet-600"
          />
        </div>

        {/* Filters & Search */}
        <Card className="p-6 border border-border/40 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by student name or assignment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-border/40 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-44 h-11 border-border/40 focus:border-primary/50 focus:ring-primary/20">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
              </SelectContent>
            </Select>
            {searchQuery || statusFilter !== "all" ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="gap-2 h-11 hover:bg-accent/20"
              >
                <X className="w-4 h-4" />
                Reset
              </Button>
            ) : null}
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedSubmissions.length > 0 && (
          <Card className="p-6 border border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm shadow-lg shadow-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {selectedSubmissions.length} item(s) selected
              </span>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2 h-9 border-border/40 hover:border-primary/50 hover:bg-primary/5">
                  <Download className="w-4 h-4" />
                  Download All
                </Button>
                <Button variant="outline" size="sm" className="gap-2 h-9 border-border/40 hover:border-primary/50 hover:bg-primary/5">
                  <Send className="w-4 h-4" />
                  Send Reminder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSubmissions([])}
                  className="h-9 hover:bg-accent/20"
                >
                  Deselect All
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Submissions Table */}
        <Card className="border border-border/40 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 bg-gradient-to-r from-muted/30 to-muted/20">
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={
                        selectedSubmissions.length === paginatedSubmissions.length &&
                        paginatedSubmissions.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                    Student
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                    Quiz
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">
                    Course
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden lg:table-cell">
                    Submitted
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubmissions.map((submission, index) => (
                  <tr
                    key={submission.id}
                    className={`border-b border-border/30 hover:bg-accent/10 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                    }`}
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedSubmissions.includes(submission.id)}
                        onCheckedChange={() =>
                          handleSelectSubmission(submission.id)
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                          {submission.studentAvatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {submission.studentName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {submission.studentId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-foreground">
                        {submission.assignmentTitle}
                      </p>
                      <Badge variant="outline" className="mt-1 capitalize text-xs">
                        {submission.assignmentType.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-muted-foreground">
                        {submission.courseName}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <p className="text-foreground">{submission.submittedOn}</p>
                      <p className="text-xs text-muted-foreground">
                        {submission.relativeTime}
                      </p>
                    </td>
                    <td className="p-4">
                      {submission.status === "graded" ? (
                        <Badge
                          className={getScoreColor(

                            submission.totalPoints
                          )}
                        >
                          {submission.score}/{submission.totalPoints}
                        </Badge>
                      ) : (
                        <Badge className="bg-status-warning/20 text-status-warning">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toast.info("Viewing submission...")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setGradingSubmission(submission)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            toast.info(`Messaging ${submission.studentName}...`)
                          }
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-6 border-t border-border/30 bg-muted/5">
            <span className="text-sm font-medium text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of{" "}
              {filteredSubmissions.length} submissions
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="h-9 w-9 border-border/40 hover:border-primary/50 hover:bg-primary/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 ${
                    currentPage === page
                      ? "bg-primary hover:bg-primary/90 shadow-sm"
                      : "border-border/40 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-9 w-9 border-border/40 hover:border-primary/50 hover:bg-primary/5"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* Grading Modal */}
      {gradingSubmission && (
        <GradingModal
          submission={gradingSubmission}
          onClose={() => setGradingSubmission(null)}
          onGrade={handleGrade}
        />
      )}
    </div>
  );
};

export default StudentSubmissions










