
import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Calendar, Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

const QuizSubmissionsPage = ({quizz,questions}) => {
console.log(questions)
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Mock quizzes
  const quizzes = [
    { id: 'react-quiz-1', title: 'React Fundamentals Quiz' },
    { id: 'js-quiz-1', title: 'JavaScript Basics Quiz' },
    { id: 'vue-quiz-1', title: 'Vue.js Introduction Quiz' }
  ];

  // Mock submissions data
  const mockSubmissions = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      quizTitle: 'React Fundamentals Quiz',
      quizId: 'react-quiz-1',
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8.5,
      submittedAt: '2023-04-12T14:30:00.000Z',
      duration: '18 minutes',
      status: 'passed',
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      quizTitle: 'React Fundamentals Quiz',
      quizId: 'react-quiz-1',
      score: 70,
      totalQuestions: 10,
      correctAnswers: 7,
      submittedAt: '2023-04-12T15:45:00.000Z',
      duration: '15 minutes',
      status: 'passed',
    },
    {
      id: 3,
      studentName: 'Charlie Brown',
      quizTitle: 'React Fundamentals Quiz',
      quizId: 'react-quiz-1',
      score: 50,
      totalQuestions: 10,
      correctAnswers: 5,
      submittedAt: '2023-04-13T09:20:00.000Z',
      duration: '20 minutes',
      status: 'failed',
    },
    {
      id: 4,
      studentName: 'Diana Prince',
      quizTitle: 'JavaScript Basics Quiz',
      quizId: 'js-quiz-1',
      score: 90,
      totalQuestions: 15,
      correctAnswers: 13.5,
      submittedAt: '2023-04-14T11:10:00.000Z',
      duration: '22 minutes',
      status: 'passed',
    },
    {
      id: 5,
      studentName: 'Emma Watson',
      quizTitle: 'JavaScript Basics Quiz',
      quizId: 'js-quiz-1',
      score: 60,
      totalQuestions: 15,
      correctAnswers: 9,
      submittedAt: '2023-04-14T16:30:00.000Z',
      duration: '25 minutes',
      status: 'passed',
    }
  ];

  // Filter and load submissions when selected quiz changes
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let filteredSubmissions = mockSubmissions;

      if (selectedQuiz) {
        filteredSubmissions = mockSubmissions.filter(
          submission => submission.quizId === selectedQuiz
        );
      }

      if (searchTerm) {
        filteredSubmissions = filteredSubmissions.filter(
          submission => submission.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setSubmissions(filteredSubmissions);
      setIsLoading(false);
    }, 800);
  }, [selectedQuiz, searchTerm]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="pt-16 md:pt-0 flex">


        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quiz Submissions</h1>
              <p className="text-gray-600">
                Review and grade student quiz submissions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Submissions</CardTitle>
                  <CardDescription>All quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <span className="text-3xl font-bold">{mockSubmissions.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pass Rate</CardTitle>
                  <CardDescription>Average across all quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-green-600 mr-3" />
                    <span className="text-3xl font-bold">
                      {Math.round((mockSubmissions.filter(s => s.status === 'passed').length / mockSubmissions.length) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Last Submission</CardTitle>
                  <CardDescription>Most recent quiz attempt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                    <span className="text-lg font-medium">
                      {formatDate(mockSubmissions[0].submittedAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search students..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="w-full md:w-64">
                    <Select
                      value={selectedQuiz}
                      onValueChange={setSelectedQuiz}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by quiz" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="">All Quizzes</SelectItem>
                        {quizzes.map((quiz) => (
                          <SelectItem key={quiz.id} value={quiz.id}>
                            {quiz.title}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Quiz</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-gray-500">Loading submissions...</p>
                        </TableCell>
                      </TableRow>
                    ) : submissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-gray-500">No submissions found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            {submission.studentName}
                          </TableCell>
                          <TableCell>{submission.quizTitle}</TableCell>
                          <TableCell className="text-center">
                            {submission.score}%
                            <span className="text-gray-500 text-xs ml-1">
                              ({submission.correctAnswers}/{submission.totalQuestions})
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(submission.status)}
                          </TableCell>
                          <TableCell>
                            {formatDate(submission.submittedAt)}
                            <div className="text-xs text-gray-500">
                              Duration: {submission.duration}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {submissions.length} of {mockSubmissions.length} submissions
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmissionsPage;
