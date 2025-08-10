
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, Check, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const QuizPage = () => {
  const { id } = useParams();

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Sample quiz data (in a real app, this would be fetched from an API)
  const quiz = {
    id: id || '1',
    title: "React Fundamentals Quiz",
    description: "Test your knowledge of React core concepts",
    course: "React Fundamentals",
    timeLimit: 600, // in seconds
    passingScore: 70,
    questions: [
      {
        id: 1,
        text: "What is React?",
        type: "single",
        options: [
          { id: 'a', text: "A JavaScript library for building user interfaces" },
          { id: 'b', text: "A programming language" },
          { id: 'c', text: "A database management system" },
          { id: 'd', text: "A back-end framework" }
        ],
        correctAnswer: 'a'
      },
      {
        id: 2,
        text: "Which of the following is used to pass data from parent to child components in React?",
        type: "single",
        options: [
          { id: 'a', text: "State" },
          { id: 'b', text: "Props" },
          { id: 'c', text: "Context" },
          { id: 'd', text: "Refs" }
        ],
        correctAnswer: 'b'
      },
      {
        id: 3,
        text: "Which hook is used to perform side effects in functional components?",
        type: "single",
        options: [
          { id: 'a', text: "useState" },
          { id: 'b', text: "useContext" },
          { id: 'c', text: "useEffect" },
          { id: 'd', text: "useReducer" }
        ],
        correctAnswer: 'c'
      },
      {
        id: 4,
        text: "What is the correct lifecycle method to make API calls in class components?",
        type: "single",
        options: [
          { id: 'a', text: "componentWillMount" },
          { id: 'b', text: "componentDidMount" },
          { id: 'c', text: "componentWillUpdate" },
          { id: 'd', text: "componentDidUpdate" }
        ],
        correctAnswer: 'b'
      },
      {
        id: 5,
        text: "Which of the following are advantages of using React? (Select all that apply)",
        type: "multiple",
        options: [
          { id: 'a', text: "Virtual DOM for better performance" },
          { id: 'b', text: "Component-based architecture" },
          { id: 'c', text: "Built-in database functionality" },
          { id: 'd', text: "One-way data binding" }
        ],
        correctAnswer: ['a', 'b', 'd']
      },
      {
        id: 6,
        text: "What does JSX stand for?",
        type: "single",
        options: [
          { id: 'a', text: "JavaScript XML" },
          { id: 'b', text: "JavaScript Extension" },
          { id: 'c', text: "JavaScript Syntax Extension" },
          { id: 'd', text: "JavaScript eXecution" }
        ],
        correctAnswer: 'a'
      },
      {
        id: 7,
        text: "How can you optimize performance in React?",
        type: "multiple",
        options: [
          { id: 'a', text: "Using React.memo for functional components" },
          { id: 'b', text: "Using PureComponent for class components" },
          { id: 'c', text: "Using proper keys in lists" },
          { id: 'd', text: "Adding more setState calls" }
        ],
        correctAnswer: ['a', 'b', 'c']
      },
      {
        id: 8,
        text: "What is the purpose of React Router?",
        type: "single",
        options: [
          { id: 'a', text: "To manage state in React applications" },
          { id: 'b', text: "To handle API requests" },
          { id: 'c', text: "To enable navigation in single-page applications" },
          { id: 'd', text: "To improve performance" }
        ],
        correctAnswer: 'c'
      },
      {
        id: 9,
        text: "Which of these is NOT a React hook?",
        type: "single",
        options: [
          { id: 'a', text: "useEffect" },
          { id: 'b', text: "useState" },
          { id: 'c', text: "useDispatch" },
          { id: 'd', text: "useHistory" }
        ],
        correctAnswer: 'c'
      },
      {
        id: 10,
        text: "What happens when you call setState in React?",
        type: "single",
        options: [
          { id: 'a', text: "The component re-renders immediately" },
          { id: 'b', text: "The state updates immediately" },
          { id: 'c', text: "The state updates and triggers a re-render at the next reconciliation" },
          { id: 'd', text: "Nothing happens until you manually refresh the page" }
        ],
        correctAnswer: 'c'
      }
    ]
  };

  // Timer countdown
  useEffect(() => {
    if (!quizSubmitted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizSubmitted]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle option selection
  const handleSelectOption = (questionId, optionId) => {
    const question = quiz.questions.find(q => q.id === questionId);

    if (question.type === 'multiple') {
      // For multiple choice, toggle the selection
      setSelectedAnswers(prev => {
        const currentSelections = prev[questionId] || [];

        if (currentSelections.includes(optionId)) {
          // Remove if already selected
          return {
            ...prev,
            [questionId]: currentSelections.filter(id => id !== optionId)
          };
        } else {
          // Add if not selected
          return {
            ...prev,
            [questionId]: [...currentSelections, optionId]
          };
        }
      });
    } else {
      // For single choice, just set the option
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: optionId
      }));
    }
  };

  // Check if an option is selected
  const isOptionSelected = (questionId, optionId) => {
    const selection = selectedAnswers[questionId];

    if (!selection) return false;

    if (Array.isArray(selection)) {
      return selection.includes(optionId);
    } else {
      return selection === optionId;
    }
  };

  // Check if a question is answered
  const isQuestionAnswered = (questionId) => {
    return !!selectedAnswers[questionId];
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0;

    quiz.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];

      if (question.type === 'multiple') {
        const correctOptions = question.correctAnswer;
        const userOptions = userAnswer || [];

        // Check if arrays have the same elements (order doesn't matter)
        if (
          correctOptions.length === userOptions.length &&
          correctOptions.every(option => userOptions.includes(option))
        ) {
          correctCount++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  // Check if an answer is correct (for results view)
  const isAnswerCorrect = (question) => {
    const userAnswer = selectedAnswers[question.id];

    if (!userAnswer) return false;

    if (question.type === 'multiple') {
      const correctOptions = question.correctAnswer;
      const userOptions = userAnswer || [];

      return (
        correctOptions.length === userOptions.length &&
        correctOptions.every(option => userOptions.includes(option))
      );
    } else {
      return userAnswer === question.correctAnswer;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="pt-24 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
              <p className="text-gray-600 mb-4">{quiz.description}</p>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Course:</span>
                    <span className="font-medium">{quiz.course}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Questions:</span>
                    <span className="font-medium">{quiz.questions.length}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Passing Score:</span>
                    <span className="font-medium">{quiz.passingScore}%</span>
                  </div>
                </div>

                <div className={`flex items-center ${
                  timeLeft < 60 ? 'text-red-500' : timeLeft < 180 ? 'text-yellow-500' : 'text-gray-800'
                }`}>
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {!quizSubmitted ? (
              <>
                {/* Question */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">
                      Question {currentQuestion + 1} of {quiz.questions.length}
                    </h2>
                    <span className={`text-xs px-2 py-1 rounded ${
                      quiz.questions[currentQuestion].type === 'multiple'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {quiz.questions[currentQuestion].type === 'multiple' ? 'Multiple Choice' : 'Single Choice'}
                    </span>
                  </div>

                  <p className="text-lg mb-6">{quiz.questions[currentQuestion].text}</p>

                  <div className="space-y-3">
                    {quiz.questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleSelectOption(quiz.questions[currentQuestion].id, option.id)}
                        className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${
                          isOptionSelected(quiz.questions[currentQuestion].id, option.id)
                            ? 'border-primary bg-soft-purple'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-5 h-5 flex-shrink-0 rounded-sm border ${
                          isOptionSelected(quiz.questions[currentQuestion].id, option.id)
                            ? 'bg-primary border-primary'
                            : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {isOptionSelected(quiz.questions[currentQuestion].id, option.id) && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    ))}
                  </div>

                  {quiz.questions[currentQuestion].type === 'multiple' && (
                    <p className="text-sm text-gray-500 mt-3">Select all that apply</p>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {currentQuestion < quiz.questions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Navigator */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="font-medium mb-4">Question Navigator</h3>
                  <div className="flex flex-wrap gap-2">
                    {quiz.questions.map((question, index) => (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                          index === currentQuestion
                            ? 'bg-learnify-primary text-white'
                            : isQuestionAnswered(question.id)
                            ? 'bg-learnify-softPurple text-learnify-primary'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Quiz Results */
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
                    score >= quiz.passingScore
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {score >= quiz.passingScore ? (
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    ) : (
                      <AlertCircle className="h-12 w-12 text-red-500" />
                    )}
                  </div>

                  <h2 className="text-2xl font-bold mt-4 mb-2">
                    {score >= quiz.passingScore ? 'Congratulations!' : 'Quiz Completed'}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {score >= quiz.passingScore
                      ? 'You passed the quiz!'
                      : 'You did not reach the passing score. Try again?'
                    }
                  </p>

                  <div className="inline-block bg-gray-100 px-6 py-3 rounded-full">
                    <span className="text-gray-700">Your Score: </span>
                    <span className={`font-bold ${
                      score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {score}%
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-4">Question Review</h3>

                <div className="space-y-6">
                  {quiz.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border ${
                        isAnswerCorrect(question)
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">
                          {index + 1}. {question.text}
                        </h4>
                        {isAnswerCorrect(question) ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Incorrect
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isSelected = isOptionSelected(question.id, option.id);
                          const isCorrect = question.type === 'multiple'
                            ? question.correctAnswer.includes(option.id)
                            : question.correctAnswer === option.id;

                          return (
                            <div
                              key={option.id}
                              className={`flex items-center p-3 rounded ${
                                isSelected && isCorrect
                                  ? 'bg-green-100 border border-green-300'
                                  : isSelected && !isCorrect
                                  ? 'bg-red-100 border border-red-300'
                                  : !isSelected && isCorrect
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-white border border-gray-200'
                              }`}
                            >
                              <div className={`w-5 h-5 flex-shrink-0 rounded-sm border ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-green-500 border-green-500'
                                    : 'bg-red-500 border-red-500'
                                  : isCorrect
                                  ? 'border-green-500'
                                  : 'border-gray-300'
                              } flex items-center justify-center mr-3`}>
                                {isSelected && (
                                  <Check className={`h-4 w-4 ${isCorrect ? 'text-white' : 'text-white'}`} />
                                )}
                              </div>
                              <span>{option.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-soft-purple transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                  >
                    Back to Course
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizPage;
