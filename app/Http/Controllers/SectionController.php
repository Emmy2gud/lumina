<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
 public function index(){

    return inertia('coursedashboard/SectionViewPage',[
           'sections'=>Section::all(),


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

}
