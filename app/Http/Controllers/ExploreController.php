<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class ExploreController extends Controller
{
 public function index()
    {
        // Base query with user and lessons count
        $baseQuery = Course::with('user')
            ->withCount([
                'sections as lessons_count' => function ($query) {
                    $query->join('lessons', 'sections.id', '=', 'lessons.section_id');
                }
            ]);

        // All courses
        $courses = (clone $baseQuery)->paginate(20);

        // Categories with limits
        $categories = [
            'Web Development' => (clone $baseQuery)->where('category', 'Web Development')->paginate(10),
            'Mobile Development' => (clone $baseQuery)->where('category', 'Mobile Development')->paginate(10),
        ];

        return inertia('explore/Explore', [
            'courses' => $courses,
            'coursecategories' => $categories
        ]);
    }
}
