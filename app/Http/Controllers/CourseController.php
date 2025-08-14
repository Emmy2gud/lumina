<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
// Add this new method to your existing controller
public function home()
{
    $courses = Course::paginate(20);

    return inertia('courses/CoursesPage', [
        'courses' => $courses
    ]);
}
    // this controller handles the course dashboard
    public function index()
    {

        return inertia('coursedashboard/CourseViewPage', [
            'courses' => Course::all()
        ]);
    }

    //thus shows the create course page
    public function create()
    {
        return inertia('coursedashboard/CreateCoursePage');
    }

    //this handles the creation of the course
    public function store(Request $request)
    {


        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'requirements' => 'required|string',
            'benefits' => 'required|string',
            'features' => 'required|string',


        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],

            'thumbnail' => $request->hasFile('thumbnail')
            ? $request->file('thumbnail')->store('thumbnails', 'public')
            : null,
            'requirements' => json_encode(array_map('trim', explode(',', $validated['requirements']))),
            'benefits' => json_encode(array_map('trim', explode(',', $validated['benefits']))),
            'features' => json_encode(array_map('trim', explode(',', $validated['features']))),


        ]);


        return redirect('/courses')->with('success', 'Course created successfully.');

    }

    //this is shows or a read about a specific course
    public function show(Course $course)
    {
        return inertia('courses/CourseDetailsPage', [
            'course' => $course->load('sections.lessons')
        ]);
    }

    //this shows the edit course page
    public function edit($id)
    {
        // Handle displaying the edit form for a specific course
        return inertia('coursedashboard/EditCoursePage');
    }

    //this handles the update of the course
    public function update(Request $request, $id)
    {
        // Handle updating the course
        // For example, you can validate the request and update the course in the database
        // $validated = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'required|string',
        //     // Add other validation rules as needed
        // ]);

        // Course::findOrFail($id)->update($validated);

        return redirect()->route('courses.index')->with('success', 'Course updated successfully.');
    }
    public function destroy($id)
    {
        // Handle deleting the course
        // Course::destroy($id);

        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }

    public function category($category)
    {
     $courses = Course::with('user')
                ->where('category', $category)
                ->get();
        $categories = Course::select('category')->distinct()->pluck('category');

        return Inertia::render('category/Category', [
            'courses' => $courses,
            'categories' => $categories,
            'activeCategory' => $category
        ]);
    }
}
