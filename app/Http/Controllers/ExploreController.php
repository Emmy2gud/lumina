<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class ExploreController extends Controller
{
   public function index(){
         $courses = Course::with('user')
    ->withCount([
        'sections as lessons_count' => function ($query) {
            $query->join('lessons', 'sections.id', '=', 'lessons.section_id');
        }
    ])
    ->paginate(30)
   ;


        return inertia('explore/Explore', [
            'courses' => $courses
        ]);
   }
}
