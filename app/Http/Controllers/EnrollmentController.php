<?php

namespace App\Http\Controllers;


use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
  public function index()
    {
        $enrollments = Enrollment::with('course')
            ->where('user_id', auth()->id())
            ->get();

        return response()->json([
            'success' => true,
            'data' => $enrollments
        ]);
    }

    public function show($id)
    {
        $enrollment = Enrollment::with('course')
            ->where('user_id', auth()->id())
            ->where('id', $id)
            ->first();

        if (!$enrollment) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollment not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $enrollment
        ]);
    }
}
