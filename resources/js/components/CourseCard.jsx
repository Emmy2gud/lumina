import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const CourseCard = ({ course, className }) => {
  const { post, processing } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function HandleCartSubmit(id) {
    return function(e) {
      e.preventDefault();
      console.log('Adding to cart:', id);

      post(`/add-to-cart/${id}`, {
        forceFormData: true,
        onStart: () => setIsSubmitting(true),
        onFinish: () => setIsSubmitting(false),
      });
    }
  }

  return (

             <form onSubmit={HandleCartSubmit(course.id)} encType='multipart/form-data'>
    <Card className={cn("overflow-hidden card-hover bg-white border-0 shadow-lg", className)}>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={course.thumbnail}
            alt={`${course.title} course thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {course.badge && (
            <Badge className="absolute left-2 top-2 text-white" variant="secondary">
              {course.badge}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
                      <Link
            href={`/course/${course.id}/view`}

          >
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {course.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            {course.user.fullname}
          </p>

          <div className="mt-2 flex items-center gap-1 text-xs">
            <Star className="text-[hsl(var(--brand-2))]" />
            <span className="font-medium">7.8</span>

            {/* <span className="text-muted-foreground">({course.reviews.toLocaleString()})</span> */}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs">
    <span className="text-sm text-gray-600 mb-4 line-clamp-2 ">{course.description}</span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="" />{course.duration}</span>
            <span className="flex items-center gap-1"><PlayCircle className="" />{course.lessons}{ course.lessons?'':'0'} lessons</span>
          </div>
  </Link>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-base font-semibold">${course.price}</div>
            <button
              type="submit"
              className="text-sm story-link"
              disabled={isSubmitting || processing}
            >
              {isSubmitting || processing ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </CardContent>

    </Card>
    </form>


  );
};

export default CourseCard;
