<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Section;
use Illuminate\Http\Request;

class QuizController extends Controller
{
  public function index(){

    return inertia('quizdashboard/QuizSubmissionsPage',[
           'quizz'=>Quiz::all(),

    ]);
}

    public function create(Section $section)
    {
        return inertia('quizdashboard/CreateQuizPage', [
            'sections' => $section
        ]);
    }


    public function store(Request $request, Section $section)
    {

        $validatedQuiz = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:1|max:100',

        ]);

        $validatedQuiz['course_id'] = $section->course_id;
        $quiz = $section->quizzes()->create($validatedQuiz);


        $validatedQuestions = $request->validate([
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string',
            'questions.*.points' => 'required|integer|min:1',
            'questions.*.options' => 'required|array|min:2|max:6',
            'questions.*.options.*.option' => 'required|string',
            'questions.*.options.*.is_correct' => 'required|boolean'
        ]);

        foreach ($validatedQuestions['questions'] as $questionData) {
            $question = $quiz->questions()->create([
                'question' => $questionData['question'],
                'points' => $questionData['points']
            ]);


            $question->options()->createMany($questionData['options']);
        }

        return redirect('/')->with('success', 'Quiz created successfully!');


    }
}
