
import { useState } from 'react';
import { Star, Clock, Users, BookOpen, CheckCircle, Award, BarChart, Languages } from 'lucide-react';

const CourseContent = ({ course }) => {


//   const defaultCourse = {
//     title: "The Complete React Developer Course 2023",
//     description: "Learn React by building real projects. Includes hooks, routing, Redux, and more.",
//     image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=400",
//     url:"https://youtu.be/5t0FjA3AygU?si=o0WXZBSZY7g4yI7h",

//     author: "Jane Smith",
//     authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
//     rating: 4.8,
//     reviews: 1245,
//     students: 34520,
//     lessons: 86,
//     duration: "32 hours",
//     level: "All Levels",
//     lastUpdated: "October 2023",
//     language: "English",
//     price: "$79.99",
//     discountPrice: "$14.99",
//     features: [
//       "Lifetime access",
//       "Certificate of completion",
//       "Downloadable resources",
//       "Mobile and TV access"
//     ]
//   };

//   const courseData = course || defaultCourse;

  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Course Hero Section */}
      <div className="relative">
      <iframe
  className="w-full h-96"
  src={`https://www.youtube.com/embed/5t0FjA3AygU`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
        {/* <img
          src={courseData.image}
          alt={courseData.title}
          className="w-full h-96 object-cover"
        /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
            <p className="text-lg mb-4">{courseData.description}</p>

            <div className="flex items-center flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{courseData.rating}</span>
                <span className="ml-1 text-gray-300">({courseData.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>{courseData.students} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-1" />
                <span>{courseData.lessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src={courseData.authorImage}
                alt={courseData.author}
                className="w-10 h-10 rounded-full mr-3 border-2 border-white"
              />
              <span>Created by <span className="font-medium">{courseData.author}</span></span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Course Info Bar */}
      <div className="bg-learnify-softPurple px-6 py-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="font-medium">{new Date(course.created_at).toLocaleDateString()}</p>
          </div>
          {/* <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="font-medium">{courseData.level}</p>
          </div> */}
          {/* <div className="flex items-center">
            <Languages className="h-5 w-5 mr-2 text-learnify-primary" />
            <span>{courseData.language}</span>
          </div> */}
        </div>

        <div className="flex items-center">
          {isEnrolled ? (
            <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Enrolled</span>
            </div>
          ) : (
            <div className="flex items-center">
              {/* <div className="mr-4">
                <span className="text-learnify-primary text-2xl font-bold">{courseData.discountPrice}</span>
                <span className="text-gray-400 line-through ml-2">{courseData.price}</span>
              </div> */}
              <button
                onClick={handleEnroll}
                className="bg-learnify-primary text-white px-6 py-3 rounded-md hover:bg-learnify-secondary transition-colors"
              >
                Enroll Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Features */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-4">This course includes:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

             {JSON.parse(course.features).map((feature, i) => (
            <div key={i} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-learnify-primary mr-3" />
              <span>{feature}</span>
            </div>
               ))}

        </div>
      </div>

      {/* Course Highlights */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-learnify-softPurple p-4 rounded-lg flex items-start">
          <Award className="h-8 w-8 text-learnify-primary mr-4" />
          <div>
            <h3 className="font-bold mb-1">Certificate</h3>
            <p className="text-sm text-gray-600">Earn a certificate upon completion</p>
          </div>
        </div>
        <div className="bg-learnify-softPurple p-4 rounded-lg flex items-start">
          <BarChart className="h-8 w-8 text-learnify-primary mr-4" />
          <div>
            <h3 className="font-bold mb-1">Progress Tracking</h3>
            <p className="text-sm text-gray-600">Monitor your learning journey</p>
          </div>
        </div>
        <div className="bg-learnify-softPurple p-4 rounded-lg flex items-start">
          <Users className="h-8 w-8 text-learnify-primary mr-4" />
          <div>
            <h3 className="font-bold mb-1">Community</h3>
            {/* <p className="text-sm text-gray-600">Learn alongside {courseData.students} students</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
