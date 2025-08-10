
import { BookOpen, Clock, Award, CheckCircle } from 'lucide-react';

const StudentProgress = ({ progress }) => {
  // Default progress data if not provided
  const defaultProgress = {
    coursesEnrolled: 5,
    coursesCompleted: 2,
    currentCourse: "React Fundamentals",
    currentProgress: 68,
    certificatesEarned: 2,
    totalHoursLearned: 42,
    nextMilestone: "Complete React Hooks section",
    achievements: [
      { name: "First Course Completed", date: "2023-09-15", icon: "award" },
      { name: "5-Day Streak", date: "2023-10-10", icon: "flame" },
      { name: "Perfect Quiz Score", date: "2023-10-12", icon: "medal" }
    ],
    upcomingDeadlines: [
      { course: "React Fundamentals", assignment: "Final Project", due: "2023-10-25" },
      { course: "UI Design Basics", assignment: "Portfolio Design", due: "2023-10-30" }
    ]
  };

  const progressData = progress || defaultProgress;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Your Learning Progress</h3>
        
        <div className="space-y-6">
          {/* Current Course */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Current Course:</span>
              <span className="font-medium">{progressData.currentCourse}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-learnify-primary h-2.5 rounded-full" 
                style={{ width: `${progressData.currentProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{progressData.currentProgress}% complete</span>
              <span className="text-xs text-gray-500">Estimated 2 hours left</span>
            </div>
          </div>
          
          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-learnify-softPurple rounded-lg p-4 flex items-start">
              <BookOpen className="h-6 w-6 text-learnify-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Enrolled Courses</p>
                <p className="font-bold text-lg">{progressData.coursesEnrolled}</p>
              </div>
            </div>
            <div className="bg-learnify-softPurple rounded-lg p-4 flex items-start">
              <CheckCircle className="h-6 w-6 text-learnify-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="font-bold text-lg">{progressData.coursesCompleted}</p>
              </div>
            </div>
          </div>
          
          {/* Time Spent */}
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-learnify-primary mr-3" />
            <div>
              <p className="text-xs text-gray-500">Total Learning Time</p>
              <p className="font-medium">{progressData.totalHoursLearned} hours</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements & Next Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Your Achievements</h3>
        
        <div className="space-y-6">
          {/* Certificates */}
          <div className="flex items-center">
            <Award className="h-10 w-10 text-learnify-primary mr-4" />
            <div>
              <p className="font-medium">You've earned {progressData.certificatesEarned} certificates!</p>
              <p className="text-sm text-gray-600">Keep going to earn more achievements</p>
            </div>
          </div>
          
          {/* Recent Achievements */}
          <div>
            <h4 className="font-medium text-sm mb-3">Recent Achievements</h4>
            <div className="space-y-3">
              {progressData.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-learnify-softPurple p-3 rounded-md"
                >
                  <Award className="h-5 w-5 text-learnify-primary mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-xs text-gray-500">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Next Milestone */}
          <div>
            <h4 className="font-medium text-sm mb-3">Next Milestone</h4>
            <div className="bg-learnify-softYellow p-3 rounded-md">
              <p className="font-medium">{progressData.nextMilestone}</p>
              <p className="text-xs text-gray-600 mt-1">
                Complete this to earn your next achievement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
