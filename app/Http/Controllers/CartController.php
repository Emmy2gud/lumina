<?php
namespace App\Http\Controllers;

use App\Models\Course;

class CartController extends Controller
{
    public function addtoCart($id)
    {
        $product = Course::find($id);
        $cart    = session('cart', []);

        $cart[$id] = [
            "name"        => $product->title,
            "price"       => $product->price,
            "quantity"    => 1,
            "image"       => $product->thumbnail,
            "description" => $product->description,
        ];

      $result=  session()->put("cart",$cart);
         dd( $cart[$id]);
     return redirect()->route('add-to-cart.addtoCart')->with("success","you have succesfully added a product to your cart!");


    }
}
