
import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { Star, Clock, Users, BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default values if props are not provided
  const {
    id = 1,
    title = "Introduction to React",
    description = "Learn the fundamentals of React and build modern user interfaces",
    image = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=280",
    author = "John Doe",
    rating = 4.7,
    students = 2453,
    lessons = 24,
    duration = "10 hours",
    price = "$49.99",
    level = "Beginner"
  } = course || {};

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full h-44 object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full">
          {level}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center mb-3">
          <p className="text-sm text-gray-600">By {author}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-3">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Users className="h-3 w-3 mr-1" />
            <span>{students} students</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary">{price}</span>
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
