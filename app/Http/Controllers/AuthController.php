<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register()
    {
        return inertia('auth/SignupPage');


    }

    public function store(Request $request)
    {
        //validate
        $validated = $request->validate([
            'fullname' => 'required|min:3|max:40',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'role' => 'required|in:teacher,student',

        ]);
        //create the user
        $user = User::create([
            'fullname' => $validated['fullname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        //email sending
        // Mail::to($user->email)->send(new WelcomeEmail($user));
        return redirect('/')->with('success', 'Account created sucessfully');


    }

    public function login()
    {

        return inertia('auth/LoginPage');
    }
    public function authenticate(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (auth()->attempt($validated)) {
            $request->session()->regenerate();
            return redirect('/')->with('success', 'Logged in successfully!');
        }

        return back()->withErrors([
            'email' => "No matching user found with the provided email and password"
        ]);
    }



    public function logout()
    {
        auth()->logout();
        request()->session()->regenerateToken();
        return redirect('/login')->with('success', 'Logged out sucessfully!');
    }
}
