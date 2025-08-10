
import { useState } from 'react';

import { ChevronDown, ChevronUp, Play, File, Clock, Lock, CheckCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

const CourseSections = ({ sections }) => {
  const [expandedSections, setExpandedSections] = useState([0]); // First section expanded by default

  // Toggle section expand/collapse
  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  // Default sections if not provided
  const defaultSections = [
    {
      title: "Getting Started with React",
      lessons: [
        { title: "Welcome to the Course", duration: "5:20", type: "video", isCompleted: true, isLocked: false },
        { title: "Setting Up Your Environment", duration: "12:45", type: "video", isCompleted: true, isLocked: false },
        { title: "Creating Your First Component", duration: "8:33", type: "video", isCompleted: false, isLocked: false },
        { title: "React Basics Quiz", duration: "10 questions", type: "quiz", isCompleted: false, isLocked: false }
      ]
    },
    {
      title: "React State and Props",
      lessons: [
        { title: "Understanding Component State", duration: "14:15", type: "video", isCompleted: false, isLocked: false },
        { title: "Working with Props", duration: "10:22", type: "video", isCompleted: false, isLocked: false },
        { title: "State Management Exercise", duration: "15 mins", type: "exercise", isCompleted: false, isLocked: false },
        { title: "State vs Props Quiz", duration: "5 questions", type: "quiz", isCompleted: false, isLocked: true }
      ]
    },
    {
      title: "Hooks and Advanced Concepts",
      lessons: [
        { title: "Introduction to Hooks", duration: "11:55", type: "video", isCompleted: false, isLocked: true },
        { title: "useState and useEffect", duration: "18:30", type: "video", isCompleted: false, isLocked: true },
        { title: "Custom Hooks", duration: "14:45", type: "video", isCompleted: false, isLocked: true },
        { title: "Final Project", duration: "1 hour", type: "project", isCompleted: false, isLocked: true }
      ]
    }
  ];

  const courseSections = sections || defaultSections;


  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'quiz':
        return <File className="w-4 h-4" />;
      case 'exercise':
        return <File className="w-4 h-4" />;
      case 'project':
        return <File className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg">
      {courseSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border-b border-gray-200 last:border-b-0">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(sectionIndex)}
            className="w-full flex items-center justify-between p-4 focus:outline-none"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{section.title}</span>
              <span className="ml-2 text-xs text-gray-500">
                ({section.lessons.length} lessons)
              </span>
            </div>
            <div className="flex items-center">
              {expandedSections.includes(sectionIndex) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </button>


          {expandedSections.includes(sectionIndex) && (
            <div className="bg-gray-50 px-4 py-2">
              {section.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className={`flex items-center p-3 rounded-md my-1 ${
                    lesson.is_completed
                      ? 'bg-green-400'
                      : 'bg-white'
                  } ${
                    lesson.isLocked
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:bg-learnify-softPurple cursor-pointer'
                  }`}
                >
                  <div className={`p-2 rounded-full mr-3 ${
                    lesson.isCompleted
                      ? 'bg-green-100 text-green-500'
                      : 'bg-learnify-softPurple text-learnify-primary'
                  }`}>
                    {lesson.isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      getLessonIcon(lesson.type)
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                <Link href={`/lessons/${lesson.id}/view`}>
                <span className={`font-medium ${lesson.isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                        {lesson.title}
                      </span>
                </Link>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.duration}
                        </span>
                        {lesson.isLocked && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {/* <p className="text-xs text-gray-500 mt-1">
                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseSections;
