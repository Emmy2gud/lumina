
import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { Star, Clock, Users, BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
console.log(course)
  // Default values if props are not provided

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={
course.thumbnail}
          alt={course.title}
          className={`w-full h-44 object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full">
          {/* {course.level} */}Beginner
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center mb-3">
          <p className="text-sm text-gray-600">By john Doe </p>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-3">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            {/* <span className="text-sm font-medium ml-1">{course.rating}</span> */}
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Users className="h-3 w-3 mr-1" />
            <span>1,250 students</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>24 lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary">${course.price}</span>
          <Link
            href={`/course/${course.id}/view`}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
