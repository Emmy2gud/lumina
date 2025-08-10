<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\AIChatSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SectionController;
use App\Http\Middleware\TeachersMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'home/HomePage')->middleware('auth');
Route::inertia('/flashcard', 'flashcards/FlashcardsPage');

Route::get('/profiles/{user}', [ProfileController::class, 'show'])->middleware('auth');
Route::post('/profiles/{user}', [ProfileController::class, 'update'])->middleware('auth');
Route::get('/quiz', function () {
    return inertia('quiz/QuizPage');
});
Route::get(('/register'), [AuthController::class, 'register'])->name('register');
Route::post(('/register'), [AuthController::class, 'store'])->name('register');
Route::get(('/login'), [AuthController::class, 'login'])->name('login');
Route::post(('/login'), [AuthController::class, 'authenticate']);
Route::get(('/logout'), [AuthController::class, 'logout'])->name('logout');


Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'teacher') {
        return Inertia::render('dashboard/TeacherDashboard');
    }
    elseif ($user->role === 'student') {
        return Inertia::render('dashboard/StudentDashboard');
    }

    return back();
})->middleware('auth');
Route::get('/courses/{course}/sections/create', [SectionController::class, 'create'])
    ->name('sections.create');
Route::get('/sections/view', [SectionController::class, 'index']);
Route::post('/courses/{course}/sections', [SectionController::class, 'store'])
    ->name('sections.store');
//material upload nested route
Route::get('/courses/{course}/materials/create', [MaterialController::class, 'create'])
    ->name('sections.create');
Route::get('/materials/view', [MaterialController::class, 'index']);
Route::post('/courses/{course}/materials', [MaterialController::class, 'store'])
    ->name('sections.store');

// Route::get('/sections/{section}/edit', [SectionController::class, 'edit'])->name('sections.edit');
// Route::put('/sections/{section}', [SectionController::class, 'update'])->name('sections.update');
// Route::delete('/sections/{section}', [SectionController::class, 'destroy'])->name('sections.destroy');

Route::get('/sections/{section}/lessons/create',[LessonController::class, 'create'] );
Route::get('/lessons/view', [LessonController::class, 'index']);
Route::post('/sections/{section}/lessons', [LessonController::class, 'store'])
    ->name('lessons.store');
Route::get('/lessons/{lesson}/view', [LessonController::class, 'show']);

Route::get('/sections/{section}/quizzes/create',[QuizController::class, 'create'] );
Route::post('/sections/{section}/quizzes', [QuizController::class, 'store'])
    ->name('quizzes.store');
    Route::get('/quiz/submissions',[QuizController::class, 'index'] );


Route::resource('/courses',CourseController::class);
Route::get('/coursespage', [CourseController::class, 'home']);
Route::get('/course/{course}/view', [CourseController::class, 'show']);

// Route::get('/openai', [App\Http\Controllers\AiChatController::class, 'testai']);
Route::post('/ai/messages', [AIChatController::class, 'store']);
Route::get('/ai', [AIChatController::class, 'index']);
Route::post('/ai-assistant/session', [AIChatSessionController::class, 'createSession']);
Route::get('/ai', [AIChatSessionController::class, 'index']);
Route::delete('/ai/{aIChatSession}', [AIChatSessionController::class, 'destroy']);

Route::get('/ai/sessions/{id}', [AIChatSessionController::class, 'show']);



// Route::get('/materials', function () {
//     return inertia('materials/MaterialsPage');
// });
// Route::get('/materialsupload', function () {
//     return inertia('materials/UploadMaterialPage');
// });
Route::get('/createquiz', function () {
    return inertia('quizdashboard/CreateQuizPage');
});
Route::get('/quiztable', function () {
    return inertia('quizdashboard/QuizSubmissionsPage');
});
Route::get('/quizform', function () {
    return inertia('quizdashboard/CreateQuizPage');
});
