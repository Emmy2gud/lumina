<?php
namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function addToCart($courseId)
    {
        $course = Course::with('user')->findOrFail($courseId);

        if (Auth::check()) {
            // Database cart implementation
            $cartItem = CartItem::firstOrCreate([
                'user_id' => Auth::id(),
                'course_id' => $courseId
            ], [
                'quantity' => 1
            ]);

            // If item already existed, increment quantity
            if (!$cartItem->wasRecentlyCreated) {
                $cartItem->increment('quantity');
            }
        } else {
            // Session cart implementation
            $cart = session('cart', []);

            if (isset($cart[$courseId])) {
                $cart[$courseId]['quantity'] += 1;
            } else {
                $cart[$courseId] = [
                    "name" => $course->title,
                    "price" => $course->price,
                    "quantity" => 1,
                    "image" => $course->thumbnail,
                    "description" => $course->description,
                    "instructor" => $course->user->name
                ];
            }

            session()->put("cart", $cart);
        }

        return redirect()->back()->with("success", "Item added to cart!");
    }

    // For updating quantities
    public function updateCart(Request $request, $courseId)
    {

        $course = Course::findOrFail($courseId);
        $request->validate([
            'quantity_change' => 'required|integer|min:-1,1'
        ]);
        $quantityChange = $request->input('quantity_change');

        if (Auth::check()) {

            $cartItem = CartItem::where([
                'user_id' => Auth::id(),
                'course_id' => $courseId
            ]);

            $cartItem = CartItem::firstOrNew([
                'user_id' => Auth::id(),
                'course_id' => $courseId
            ]);

            $newQuantity = ($cartItem->quantity ?? 0) + $quantityChange;
            $cartItem->quantity = max(1, $newQuantity);
            $cartItem->save();
        } else {
            $cart = session('cart', []);



            if (isset($cart[$courseId])) {
                $cart[$courseId]['quantity'] = $request->quantity;
                session()->put("cart", $cart);
            } else {
                return redirect()->back()->with("error", "Item not found in cart");
            }

            session()->put("cart", $cart);
        }

        return redirect()->back()->with("success", "Cart updated successfully!");
    }
    public function showCart()
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
    return Inertia::render('cart/Cart', [
            'cart' => $cart,
            'cartCount' => count($cart)
        ]);
    }
    public function removeFromCart(Request $request, $courseId)
    {

        $removed = false;

        if (Auth::check()) {

            $removed = CartItem::where('user_id', Auth::id())
                ->where('course_id', $courseId)
                ->delete() > 0;
        } else {
            // Remove from session for guests
            $cart = session('cart', []);

            if (isset($cart[$courseId])) {
                unset($cart[$courseId]);
                session()->put('cart', $cart);
                $removed = true;
            }
        }

    }

    public function clearCart()
    {
        session()->forget('cart');
        return redirect()->back()->with("success", "Cart cleared successfully!");
    }
    public function syncCart()
    {
        if (Auth::check()) {
            $guestCart = session()->get('cart', []);

            foreach ($guestCart as $item) {
                CartItem::updateOrCreate(
                    ['user_id' => Auth::id(), 'course_id' => $item['id']],
                    ['quantity' => $item['quantity']]
                );
            }

            session()->forget('cart');
            return Auth::user()->cartItems()->with('course')->get();
        }

        return [];
    }


}
