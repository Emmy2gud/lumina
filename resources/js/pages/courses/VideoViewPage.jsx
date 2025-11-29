import { useState, useEffect } from 'react';

import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, NotebookPen } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import AITutorPanel from '@/components/tutor/AITutorPanel';

const VideoViewPage = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);


  const lesson = location.state?.lesson || {
    title: "Introduction to React",
    description: "Learn the basics of React and how to create your first component.",
    duration: "10:15",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4"
  };

  const sectionTitle = location.state?.sectionTitle || "Getting Started with React";

  console.log("Video View Page - Location state:", location.state);
  console.log("Video View Page - Lesson data:", lesson);

  useEffect(() => {
    // Simulate loading 5 lessons in this section
    setRelatedVideos([
      { id: 1, title: "Understanding JSX", duration: "8:45", thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 2, title: "React Props Explained", duration: "12:20", thumbnail: "https://images.unsplash.com/photo-1587620931276-d97f425f62b4?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 3, title: "State Management Basics", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 4, title: "Hooks Deep Dive", duration: "18:10", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 5, title: "Context API & Redux", duration: "22:45", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=240&h=135" },
    ]);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById('lessonVideo');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    const video = document.getElementById('lessonVideo');
    if (video) {
      video.muted = !isMuted;
    }
  };

  const handleTimeUpdate = () => {
    const video = document.getElementById('lessonVideo');
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressBarClick = (e) => {
    const video = document.getElementById('lessonVideo');
    if (video) {
      const progressBar = document.getElementById('progressBar');
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
      video.currentTime = pos * video.duration;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Top bar with back and breadcrumb */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 text-sm">
            <span className="text-gray-500">{sectionTitle}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-semibold text-gray-900">{lesson.title}</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Large video player section */}
          <div className="mb-12">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                id="lessonVideo"
                src={lesson.url}
                className="w-full aspect-video bg-black"
                poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200&h=675"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Content grid: 65/35 split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content (65%) */}
            <div className="lg:col-span-2 space-y-10">
              {/* Lesson header */}
              <section>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{lesson.description || "Learn more about this lesson."}</p>
              </section>

              {/* Action buttons */}
              <div className="flex items-center gap-4 py-6 border-t border-b border-gray-200">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  Like
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
                  <Bookmark className="w-5 h-5" />
                  Save
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* AI Tutor Panel - larger, full width */}
              <section className="mt-10">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
                  <AITutorPanel lessonTitle={lesson.title} videoTranscript="" />
                </div>
              </section>

              {/* Engagement section */}
              <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Questions & Discussion</h3>
                <p className="text-gray-600 mb-6">Have a question about this lesson? Ask your instructor or peers in the discussion forum.</p>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Go to Discussion Forum
                </button>
              </section>
            </div>

            {/* Sidebar (35%) */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 sticky top-32">
                {/* Generate Questions Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold">Test Your Knowledge</h3>
                      <p className="text-sm text-indigo-100 mt-1">Generate AI-powered practice questions</p>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-100 mb-4">Check how well you understood this lesson with personalized questions.</p>
                  <button

                    disabled={questionsLoading}
                    className="w-full bg-white text-indigo-600 font-semibold py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {questionsLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                     <NotebookPen/> Generate Questions
                      </>
                    )}
                  </button>
                </div>


                {/* Section Lessons List */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4">
                    <h3 className="text-lg font-bold">Lessons in this Section</h3>
                    <p className="text-sm text-purple-100 mt-1">5 videos • {relatedVideos.reduce((sum, v) => {
                      const mins = parseInt(v.duration.split(':')[0]);
                      return sum + mins;
                    }, 10)} minutes</p>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {/* Current lesson - highlighted */}
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                          ▶
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm">{lesson.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">Currently watching</p>
                        </div>
                      </div>
                    </div>

                    {/* All lessons in list */}
                    {relatedVideos.map((video, idx) => (
                      <div
                        key={video.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm">
                            {idx + 2}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors line-clamp-2">
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson info card */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Lesson Info</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase">Duration</p>
                      <p className="font-semibold text-gray-900">{lesson.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase">Section</p>
                      <p className="font-semibold text-gray-900">{sectionTitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase">Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{lesson.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>


    </div>
  );
};

export default VideoViewPage;
