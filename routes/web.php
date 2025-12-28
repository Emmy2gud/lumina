<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\AIChatSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'home/HomePage')->middleware('auth');
Route::inertia('/flashcard', 'flashcards/FlashcardsPage');

Route::get('/profiles/{user}', [ProfileController::class, 'show'])->middleware('auth');
Route::post('/profiles/{user}', [ProfileController::class, 'update'])->middleware('auth');

Route::get(('/register'), [AuthController::class, 'register'])->name('register');
Route::post(('/register'), [AuthController::class, 'store'])->name('register');
Route::get(('/login'), [AuthController::class, 'login'])->name('login');
Route::post(('/login'), [AuthController::class, 'authenticate']);
Route::get(('/logout'), [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'teacher') {
        return Inertia::render('dashboard/TeacherDashboard');
    } elseif ($user->role === 'student') {
        return Inertia::render('dashboard/StudentDashboard');
    }

    return back();
})->middleware('auth');

Route::get('/courses/{course}/sections/create', [SectionController::class, 'create'])
    ->name('sections.create');
Route::get('/sections/view', [SectionController::class, 'index']);
Route::post('/courses/{course}/sections', [SectionController::class, 'store'])
    ->name('sections.store');
// material upload nested route
Route::get('/courses/{course}/materials/create', [MaterialController::class, 'create'])
    ->name('sections.create');
Route::get('/materials/view', [MaterialController::class, 'index']);
Route::post('/courses/{course}/materials', [MaterialController::class, 'store'])
    ->name('sections.store');

// Route::get('/sections/{section}/edit', [SectionController::class, 'edit'])->name('sections.edit');
// Route::put('/sections/{section}', [SectionController::class, 'update'])->name('sections.update');
// Route::delete('/sections/{section}', [SectionController::class, 'destroy'])->name('sections.destroy');

Route::get('/sections/{section}/lessons/create', [LessonController::class, 'create']);
Route::get('/lessons/view', [LessonController::class, 'index']);
Route::post('/sections/{section}/lessons', [LessonController::class, 'store'])
    ->name('lessons.store');
Route::get('/lessons/{lesson}/view', [LessonController::class, 'show']);

Route::get('/sections/{section}/quizzes/create', [QuizController::class, 'create']);
Route::get('/sections/{section}/quizzes', [QuizController::class, 'store'])
    ->name('quizzes.store');
Route::get('/sections/{section}/quizzes', [QuizController::class, 'index']);

Route::resource('/courses', CourseController::class);

Route::get('/coursespage', [CourseController::class, 'home']);
Route::get('/course/{course}/view', [CourseController::class, 'show']);
Route::get('/course/{category}', [CourseController::class, 'category'])->name('courses.category');

// Route::get('/openai', [App\Http\Controllers\AiChatController::class, 'testai']);
Route::post('/ai/messages', [AIChatController::class, 'store']);
Route::get('/ai', [AIChatController::class, 'index']);
Route::post('/ai-assistant/session', [AIChatSessionController::class, 'createSession']);
Route::get('/ai', [AIChatSessionController::class, 'index']);
Route::delete('/ai/{aIChatSession}', [AIChatSessionController::class, 'destroy']);

Route::get('/ai/sessions/{id}', [AIChatSessionController::class, 'show']);

Route::get('/cart', function () {
    return inertia('cart/Cart');
});

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

Route::get('/cart', [CartController::class, 'showCart']);
Route::post('/cart/add/{courseId}', [CartController::class, 'addToCart'])->name('cart.add');
Route::post('/cart/update/{courseId}', [CartController::class, 'updateCart'])->name('cart.update');
Route::delete('/cart/{course}', [CartController::class, 'removeFromCart']);
Route::post('/cart/sync', [CartController::class, 'syncCart']);

Route::get('/payment/checkout', [CheckoutController::class, 'index']);

// Explore page (courses list)
Route::get('/explore', [ExploreController::class, 'index'])->name('explore');

Route::post('/payment/initialize', [PaymentController::class, 'initialize'])
    ->name('payment.initialize');

Route::get('/callback', [PaymentController::class, 'callback'])
    ->name('callback');

Route::get('/payment/success', [PaymentController::class, 'success'])->name('payment.success');

Route::get('payment/failed', [PaymentController::class, 'failed'])->name('payment.failed');
// notifications
Route::get('/notifications', function () {
    return Inertia::render('notification/NotificationsPage');
});
Route::get('/q&asection', function () {
    return Inertia::render('q&a/QAndA');
});
Route::get('/leaderboard', function () {
    return Inertia::render('leader/LeaderboardPage');
});
Route::get('/student/submissions', function () {
    return Inertia::render('quizdashboard/student/StudentSubmissions');
});
