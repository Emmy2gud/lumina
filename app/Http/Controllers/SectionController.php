<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
 public function index(){
 $sections = Section::latest()->paginate(10);
    return inertia('coursedashboard/SectionViewPage',[
           'sections'=>$sections,


    ]

);
 }

    public function create(Course $course)
    {
        return inertia('coursedashboard/AddSectionPage', [
            'course' => $course
        ]);
    }

    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $course->sections()->create($validated);

        return redirect('/courses')->with('success', 'section created successfully!');
    }

       public function show(Section $section)
    {
        return inertia('courses/CourseDetailsPage', [
            'section'     => $section->with(['quizzes']),

        ]);
    }

}
