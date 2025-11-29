<?php

namespace App\Http\Middleware;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'role' => $request->user()->role,
                    'email' => $request->user()->email,
                    'fullname' => $request->user()->name,

                ] : null,
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],

            'categories' => fn() => Course::select('category')->distinct()->pluck('category'),
            'cartCount' => function () {
                if (Auth::check()) {
                    return Auth::user()->cartItems()->count();
                }
                return count(session('cart', []));
            },
'cart' => function () {
    if (Auth::check()) {
        $cartItems = Auth::user()->cartItems()->with('course.user')->get();

     return $cartItems->mapWithKeys(function ($cartItem) {
                        return [
                            $cartItem->course_id => [
                                "id" => $cartItem->course_id,
                                "name" => $cartItem->course->title,
                                "price" => $cartItem->course->price,
                                "quantity" => $cartItem->quantity,
                                "image" => $cartItem->course->thumbnail,
                                "description" => $cartItem->course->description,
                                "instructor" => $cartItem->course->user->name
                            ]
                        ];
                    })->toArray();


    } else {
       return session()->get('cart', []);
    }
}

        ]);
    }


}
