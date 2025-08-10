<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Section;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(){

        return inertia('coursedashboard/LessonViewPage',[
               'lessons'=>Lesson::all(),


        ]

    );
     }
  public function create(Section $section){
    return inertia('coursedashboard/AddLessonsPage', [
        'section' => $section
    ]);
  }


  public function store(Request $request, Section $section)
  {



      $validated = $request->validate([
          'title' => 'required|string|max:255',
          'content' => 'nullable|string',
         'file_upload' => 'nullable|mimes:mp4,mov,avi,wmv|max:81920',
          'file_type' => 'nullable|string|max:255',
          'file_size' => 'nullable|string|max:255',
         'duration' => 'nullable|string|max:255',


      ]);
        // Handle file upload

      $section->lessons()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'file_upload' => $request->hasFile('file_upload')
            ? $request->file('file_upload')->store('lessons', 'public') : null,
            'duration' => $validated['duration'],

      ]);
      return redirect('/sections/view')->with('success', 'Lesson created successfully.');

  }


  public function show(Lesson $lesson)
  {
      return inertia('courses/VideoViewPage', [
         'lesson' => $lesson,
      ]);
  }
}
