<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {

        if (Auth::check()) {
            $cartItems = Auth::user()->cartItems()->with('course.user')->get();

            $cart = $cartItems->mapWithKeys(function ($cartItem) {
                return [
                    $cartItem->course_id => [
                        "id" => $cartItem->course_id,
                        "name" => $cartItem->course->title,
                        "price" => $cartItem->course->price,
                        "quantity" => $cartItem->quantity,
                        "image" => $cartItem->course->thumbnail,
                        "description" => $cartItem->course->description,
                        "instructor" => $cartItem->course->user->fullname
                    ]
                ];
            })->toArray();
        } else {
            $cart = session()->get('cart', []);
        }
        return Inertia::render('checkout/Checkout', [
            'cart' => $cart,
            'cartCount' => count($cart)
        ]);
    }
}
