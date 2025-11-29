import { useState } from 'react';
import { BookOpen, Clock, Lightbulb, HelpCircle, Sparkles, ChevronDown, CheckCircle, WandSparkles, X, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

const AITutorPanel = ({ lessonTitle, videoTranscript }) => {
  const [expandedSection, setExpandedSection] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [tutorContent, setTutorContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Mock tutor content - in production, this would call an API
  const mockTutorContent = {
    summary: {
      title: "Summary",
      icon: BookOpen,
      content: "This lesson covers the fundamental concepts of React, including component creation and state management. You'll learn how to set up a React project, create functional components with hooks, and manage component state. The lesson emphasizes best practices and practical examples that you can apply immediately to your own projects."
    },
    timestamps: {
      title: "Key Timestamps",
      icon: Clock,
      items: [
        { time: "00:15", topic: "What is React and why you should learn it" },
        { time: "02:30", topic: "Setting up your first React project" },
        { time: "04:45", topic: "Understanding components and JSX syntax" },
        { time: "06:20", topic: "Working with the useState hook" },
        { time: "08:10", topic: "Props: passing data between components" }
      ]
    }

  };

  const SectionIcon = ({ icon: Icon }) => <Icon className="h-5 w-5" />;

  const renderSection = () => {
    const content = tutorContent || mockTutorContent;

    switch (expandedSection) {
      case 'summary':
        return <p className="text-gray-700 leading-relaxed">{content.summary.content}</p>;

      case 'timestamps':
        return (
          <div className="space-y-4">
            {content.timestamps.items.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⏱️ {item.time}
                  </span>
                </div>
                <p className="text-gray-800 text-sm font-medium mb-4">{item.topic}</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setModalLoading(true);
                      setModalOpen(true);
                      setModalContent(`AI explanation for: ${item.topic}`);
                      setTimeout(() => setModalLoading(false), 800);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-shadow"
                  >
                    <WandSparkles className="w-4 h-4" /> AI Explanation
                  </button>
                  <button
                    onClick={() => {
                      setModalLoading(true);
                      setModalOpen(true);
                      setModalContent(`Real-world scenario for: ${item.topic}`);
                      setTimeout(() => setModalLoading(false), 800);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-purple-600 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-50 transition-colors"
                  >
                    <Zap className="w-4 h-4" /> Real-World Scenario
                  </button>
                </div>
              </div>
            ))}
          </div>
        );





      default:
        return null;
    }
  };

  const sections = [
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'timestamps', label: 'Timestamps', icon: Clock },

  ];

  return (
    <>
      <div className="h-full flex flex-col bg-gradient-to-br from-white via-slate-50 to-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Learning Tutor</h2>
            <p className="text-sm text-white/80">Master this lesson with AI guidance</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 px-4 pt-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setExpandedSection(id)}
              className={`px-3 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                expandedSection === id
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {renderSection()}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5" />
            Ask a Follow-up Question
          </button>
        </div>
      </div>

      {/* Modal for AI Explanations and Real-World Scenarios */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">AI Guidance</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {modalLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{modalContent}</p>
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Understand the core concept thoroughly</li>
                      <li>Practice with real examples</li>
                      <li>Apply it to your own projects</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-8 py-4 flex gap-3 justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AITutorPanel;
