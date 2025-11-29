<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{

    public function initialize(Request $request)
    {

        $user = Auth::user();

        // Generate a unique transaction reference for the aystack stuff.
        $reference = 'PSK_' . uniqid();

        // Get items from user's cart
        $cartItems = \DB::table('cart_items')
            ->join('courses', 'cart_items.course_id', '=', 'courses.id')
            ->where('cart_items.user_id', $user->id)
            ->select('courses.title', 'courses.price', 'cart_items.quantity')
            ->get();

        // If cart is empty, stop here
        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        // Calculate total amount (price × quantity)
        $totalAmount = $cartItems->sum(fn($item) => $item->price * $item->quantity);

        // Send request to Paystack to initialize transaction
        $response = Http::withToken(config('services.paystack.secret_key'))
            ->post('https://api.paystack.co/transaction/initialize', [
                'email' => $user->email,
                'amount' => $totalAmount * 100, // Paystack expects kobo, not naira
                'currency' => 'NGN',
                'reference' => $reference,
                'callback_url' => env('PAYSTACK_CALLBACK_URL'),
            ]);

        $resBody = $response->json();

        // If Paystack returns error
        if (!$resBody['status']) {
            return back()->with('error', 'Payment initialization failed.');
        }

        // Save payment as "pending" in our database
        Payment::create([
            'user_id' => $user->id,
            'transaction_id' => $reference,
            'amount' => $totalAmount * 100,
            'currency' => 'NGN',
            'status' => 'pending',
        ]);

      
        return Inertia::location($resBody['data']['authorization_url']);
    }

    /**
     * STEP 2: Handle Paystack Callback (after user pays)
     */
    public function callback(Request $request)
    {
        // Get the reference sent back by Paystack
        $reference = $request->query('reference');

        // Verify payment with Paystack
        $response = Http::withToken(config('services.paystack.secret_key'))
            ->get("https://api.paystack.co/transaction/verify/{$reference}");

        $resBody = $response->json();

        // If Paystack says verification failed
        if (!$resBody['status']) {
            return redirect()->route('payment.failed')
                ->with('error', 'Payment verification failed.');
        }

        // Get the actual transaction data
        $data = $resBody['data'];

        // Find the payment record in our database
        $payment = Payment::where('transaction_id', $reference)->first();

        // If transaction is successful
        if ($data['status'] === 'success') {
            $payment->update(['status' => 'success']);

        //    Enroll the user into courses here

            return redirect()->route('payment.success');
        }

        // Otherwise mark as failed
        $payment->update(['status' => 'failed']);

        return redirect()->route('payment.failed');
    }

    /**
     * STEP 3: Success & Failed pages
     */
    public function success()
    {
        return " Payment successful! You now have access to your courses.";
    }

    public function failed()
    {
        return " Payment failed. Please try again.";
    }
}
