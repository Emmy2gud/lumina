
import { Download, File, FileText, Video, FileAudio, Eye } from 'lucide-react';

const MaterialCard = ({ material }) => {
  // Default material data if not provided
  const defaultMaterial = {
    id: 1,
    title: "React Fundamentals Cheatsheet",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2023-10-15",
    downloads: 342,
    thumbnail: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&q=80&w=300&h=200"
  };

  const materialData = material || defaultMaterial;

  // Function to get the appropriate icon based on file type
  const getFileIcon = () => {
    switch (materialData.type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="h-8 w-8 text-blue-500" />;
      case 'mp4':
      case 'video':
        return <Video className="h-8 w-8 text-purple-500" />;
      case 'mp3':
      case 'audio':
        return <FileAudio className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 flex items-start">
        <div className="mr-4">
          {materialData.thumbnail ? (
            <img
              src={materialData.thumbnail}
              alt={materialData.title}
              className="w-16 h-16 object-cover rounded-md"
            />
          ) : (
            <div className="w-16 h-16 bg-learnify-softPurple rounded-md flex items-center justify-center">
              {getFileIcon()}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{materialData.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="capitalize mr-3">{materialData.type} file</span>
            <span className="mr-3">{materialData.size}</span>

          </div>
          <div>
          <span className='text-xs whitespace-nowrap text-gray-500 '>Uploaded on {new Date(materialData.uploadDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <div className="flex items-center mr-4">
              <Download className="h-3 w-3 mr-1" />
              <span>{materialData.downloads} downloads</span>
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
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
