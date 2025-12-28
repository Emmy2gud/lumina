
import { useState } from 'react';
import { ArrowUpFromLine, Search, Filter, Trash2, Eye, Download, FileText, Video, FileArchive, File, Plus } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import MaterialCard from '../../components/course/MaterialCard';

const MaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileType, setFileType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isTeacher, setIsTeacher] = useState(true); // Toggle to test teacher/student view
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sample materials data
  const materials = [
    {
      id: 1,
      title: "React Fundamentals Cheatsheet",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2023-10-15",
      downloads: 342,
      course: "React Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 2,
      title: "JavaScript ES6 Reference Guide",
      type: "pdf",
      size: "1.8 MB",
      uploadDate: "2023-10-12",
      downloads: 256,
      course: "JavaScript ES6 Essentials",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 3,
      title: "UI Design Principles Video Lecture",
      type: "mp4",
      size: "68 MB",
      uploadDate: "2023-10-08",
      downloads: 187,
      course: "UI Design Basics",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 4,
      title: "React Project Starter Files",
      type: "zip",
      size: "12.6 MB",
      uploadDate: "2023-10-05",
      downloads: 421,
      course: "React Fundamentals",
      thumbnail: null
    },
    {
      id: 5,
      title: "Web Accessibility Guidelines",
      type: "pdf",
      size: "3.2 MB",
      uploadDate: "2023-09-28",
      downloads: 175,
      course: "UI Design Basics",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 6,
      title: "CSS Animations Tutorial",
      type: "mp4",
      size: "42 MB",
      uploadDate: "2023-09-22",
      downloads: 198,
      course: "UI Design Basics",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=300&h=200"
    }
  ];

  // Filter and sort materials
  const filteredMaterials = materials
    .filter(material => {
      // Filter by search term
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            material.course.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by file type
      const matchesType = fileType === 'all' || material.type === fileType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      // Sort by selected criterion
      if (sortBy === 'newest') {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      } else if (sortBy === 'popularity') {
        return b.downloads - a.downloads;
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Simulate file upload
  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // Function to get the appropriate icon based on file type
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'mp4':
      case 'video':
        return <Video className="h-6 w-6 text-purple-500" />;
      case 'zip':
        return <FileArchive className="h-6 w-6 text-yellow-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">


      <div className="pt-16 md:pt-0 flex">



        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-0">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Materials Library</h1>
                  <p className="text-text-secondary">
                    {isTeacher
                      ? "Upload and manage course materials"
                      : "Access and download course materials"}
                  </p>
                </div>

                {isTeacher && (
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-learnify-primary px-4 py-2 text-sm font-medium text-white hover:bg-learnify-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUpFromLine className="h-5 w-5 mr-2" />
                    Upload Material
                  </button>
                )}
              </div>

              {/* Upload Progress Bar (Teacher only) */}
              {isTeacher && isUploading && (
                <div className="mt-4 bg-surface-primary p-4 rounded-lg shadow-sm border border-border-light">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Uploading file...</span>
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-learnify-primary h-2.5 rounded-full transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Search and Filters */}
            <div className="bg-surface-primary p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border-medium rounded-md w-full focus:outline-none focus:ring-2 focus:ring-learnify-primary focus:border-transparent"
                  />
                </div>

                {/* File Type Filter */}
                <div className="w-full md:w-40">
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-4 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-learnify-primary focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="pdf">PDF Files</option>
                    <option value="mp4">Video Files</option>
                    <option value="zip">Archives</option>
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="w-full md:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-learnify-primary focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popularity">Most Downloaded</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-4">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <div key={material.id} className="bg-surface-primary rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 flex items-start">
                      <div className="mr-4">
                        {material.thumbnail ? (
                          <img
                            src={material.thumbnail}
                            alt={material.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-learnify-softPurple rounded-md flex items-center justify-center">
                            {getFileIcon(material.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">{material.title}</h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 mb-2 gap-3">
                          <span className="capitalize">{material.type} file</span>
                          <span>{material.size}</span>
                          <span>Added: {new Date(material.uploadDate).toLocaleDateString()}</span>
                          <span>Course: {material.course}</span>
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                          <div className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            <span>{material.downloads} downloads</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="text-learnify-primary hover:bg-learnify-softPurple p-2 rounded-md transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-learnify-primary hover:bg-learnify-softPurple p-2 rounded-md transition-colors">
                          <Download className="h-5 w-5" />
                        </button>
                        {isTeacher && (
                          <button className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-surface-primary rounded-lg shadow-sm">
                  <div className="w-16 h-16 bg-learnify-softPurple rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-learnify-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No materials found</h3>
                  <p className="text-text-secondary mb-6">
                    {searchTerm || fileType !== 'all'
                      ? "Try adjusting your search or filters"
                      : isTeacher
                      ? "Upload your first material to get started"
                      : "No materials have been uploaded yet"
                    }
                  </p>
                  {isTeacher && (
                    <button
                      onClick={handleUpload}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-learnify-primary px-4 py-2 text-sm font-medium text-white hover:bg-learnify-secondary transition-colors"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Upload Material
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Course Materials Sections */}
            <div className="mt-12 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-text-primary mb-4">React Fundamentals Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials
                    .filter(material => material.course === "React Fundamentals")
                    .map(material => (
                      <MaterialCard key={material.id} material={material} />
                    ))
                  }
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-4">UI Design Basics Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials
                    .filter(material => material.course === "UI Design Basics")
                    .map(material => (
                      <MaterialCard key={material.id} material={material} />
                    ))
                  }
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-4">JavaScript ES6 Essentials Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials
                    .filter(material => material.course === "JavaScript ES6 Essentials")
                    .map(material => (
                      <MaterialCard key={material.id} material={material} />
                    ))
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;










