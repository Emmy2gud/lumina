import { useState,useEffect } from 'react';
import {
  Check,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const QuizPage = ({ quiz }) => {
  const questions = quiz.data[0]?.questions || [];
  const quizInfo = quiz.data[0] || {};
  console.log('quiz data:', quizInfo);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(quizInfo.duration * 60);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle option selection
  const handleSelectOption = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Check if an option is selected
  const isOptionSelected = (questionId, optionId) => {
    return selectedAnswers[questionId] === optionId;
  };

  // Check if current question is answered
  const isQuestionAnswered = (questionId) => {
    return !!selectedAnswers[questionId];
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Navigate to specific question
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    console.log('Submitting quiz with answers:', selectedAnswers);
    // Add your submission logic here
  };
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);



    return () => clearTimeout(timer);
  }, [timeLeft]);
  // Format time in mm:ss
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-surface-secondary ">
      <div className="pt-24 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl  ">
            {/* Quiz Header */}
            <div className="bg-surface-primary  mx-auto  rounded-lg shadow-sm p-6 mb-6 border border-border-light w-[1200px]">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {quizInfo.title || 'Quiz'}
              </h1>
              <p className="text-text-secondary mb-4">
                {quizInfo.description || 'Test your knowledge'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Questions:</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Course:</span>
                  <span className="font-medium">
                    {quizInfo.course || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Duration:</span>
                    <span className={`${seconds <=30 ?'text-red-500':''}`}>{`${minutes}:${seconds}`}</span>
                    </div>

                <div className="flex items-center">
                  {' '}
                  <span className="text-gray-500 mr-2">
                    Passing Score:
                  </span>{' '}
                  <span className="font-medium">{quizInfo.passing_score}%</span>
                </div>
              </div>
            </div>

            {/* Current Question */}
            {currentQuestion && (
              <>
                <div className="bg-surface-primary rounded-lg shadow-sm p-6 mb-6 border border-border-light  w-[1200px]">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="font-bold text-text-primary">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                      Single Choice
                    </span>
                  </div>

                  <p className="text-lg mb-6 text-text-muted">{currentQuestion.question}</p>

                  {/* Options */}
                  <div className="space-y-3  ">
                    {currentQuestion.options?.map((opt) => {
                      const selected = isOptionSelected(
                        currentQuestion.id,
                        opt.id
                      );

                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            handleSelectOption(currentQuestion.id, opt.id)
                          }
                          className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors
                            ${selected ? 'border-primary bg-purple-50' : 'border-border-light hover:bg-surface-secondary'}
                          `}
                        >
                          <div
                            className={`w-5 h-5 flex-shrink-0 rounded-sm border flex items-center justify-center mr-3
                              ${selected ? 'bg-primary border-primary' : 'border-border-medium'}
                            `}
                          >
                            {selected && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span>{opt.option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mb-6">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center px-4 py-2 border border-border-medium rounded-md text-text-secondary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {currentQuestionIndex < questions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Navigator */}
                <div className="bg-surface-primary rounded-lg shadow-sm p-6 border border-border-light">
                  <h3 className="font-medium mb-4">Question Navigator</h3>
                  <div className="flex flex-wrap gap-2">
                    {questions.map((question, index) => (
                      <button
                        key={question.id}
                        onClick={() => goToQuestion(index)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                          index === currentQuestionIndex
                            ? 'bg-primary text-white'
                            : isQuestionAnswered(question.id)
                              ? 'bg-purple-100 text-primary'
                              : 'bg-surface-tertiary text-text-secondary hover:bg-gray-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Backend Pagination (if needed for multi-page quizzes) */}
            {quiz.links && quiz.links.length > 3 && (
              <div className="flex justify-center gap-2 mt-6">
                {quiz.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url || '#'}
                    className={`px-3 py-2 rounded border transition-colors
                      ${
                        link.active
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-primary text-text-secondary border-border-medium hover:bg-surface-secondary'
                      }
                      ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;










