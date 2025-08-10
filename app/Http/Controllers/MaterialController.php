<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
 public function create(Course $course)
 {


     return inertia('materials/UploadMaterialPage', [
         'course' => $course,
     ]);
 }


    public function store(Request $request, Course $course)
    {
       $validate= $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'file_upload' => 'required|file|mimes:pdf,doc,docx,ppt,pptx,xls,xlsx|max:2048',
            'file_type' => 'required|string|in:pdf,doc,docx,ppt,pptx,xls,xlsx',
            'file_size' => 'required|string|max:2048',
            'relatedCourse' =>'nullable|string',


        ]);


        $filePath = $request->file('file_upload')->store('materials', 'public');

        // Store the material in the database
        $course->materials()->create([
            'title' => $validate['title'],
            'description' => $validate['description'],
            'file_upload' => $filePath,
            'file_type' => $validate['file_type'],
            'file_size' => $validate['file_size'],
            'relatedCourse' => $validate['relatedCourse'],
        ]);

        return redirect('/dashboard')->with('success', 'Material uploaded successfully.');
    }
}
