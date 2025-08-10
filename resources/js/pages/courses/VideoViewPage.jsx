import { useState, useEffect } from 'react';

import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const VideoViewPage = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [relatedVideos, setRelatedVideos] = useState([]);


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
    // Simulate loading related videos
    setRelatedVideos([
      { id: 1, title: "Understanding JSX", duration: "8:45", thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 2, title: "React Props Explained", duration: "12:20", thumbnail: "https://images.unsplash.com/photo-1587620931276-d97f425f62b4?auto=format&fit=crop&q=80&w=240&h=135" },
      { id: 3, title: "State Management Basics", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=240&h=135" },
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
    <div className="min-h-screen bg-gray-50">


      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          {/* Back button and breadcrumb */}
          <div className="mb-6 flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="text-sm">
              <span className="text-gray-500">Curriculum</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{sectionTitle}</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-purple-600">{lesson.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main video content */}
            <div className="lg:col-span-2">
              {/* Video player */}
              <div className="relative bg-black rounded-xl overflow-hidden mb-6">
                <video
                  id="lessonVideo"
                  src={lesson.url}
                  className="w-full aspect-video"
                  poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=450"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                >
                  Your browser does not support the video tag.
                </video>

                {/* Custom controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress bar */}
                  <div
                    id="progressBar"
                    className="h-1 w-full bg-gray-600 rounded-full mb-4 cursor-pointer"
                    onClick={handleProgressBarClick}
                  >
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        onClick={handleMuteToggle}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                      <span className="text-white text-sm">
                        {(progress * lesson.duration.split(':')[0] / 100).toFixed(2)}
                        /
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video info */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
                <p className="text-gray-600 mb-4">{lesson.description || "Learn more about this lesson."}</p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <Share2 className="w-5 h-5 mr-2" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                    <Bookmark className="w-5 h-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Related Lessons</h2>
                <div className="space-y-4">
                  {relatedVideos.map(video => (
                    <div key={video.id} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="relative w-24 h-16 flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h2>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Got questions about this lesson? Ask your instructor or peers in the discussion forum.
                    </p>
                    <button className="mt-3 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Go to Forum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoViewPage;
