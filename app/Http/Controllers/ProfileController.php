<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{


    public function show(User $user)
    {



        return inertia('profile/ProfilePage', [
            'profileUser' => [
                'id' => $user->id,
                'fullname' => $user->fullname,
                'email' => $user->email,
                'bio' => $user->bio,
                'skills' => $user->skills,
                'role' => $user->role,
                'profile'=>$user->profile,
                'created_at' => $user->created_at->diffForHumans(),
            ]
        ]);


    }


    public function edit(Request $request)
    {
        $user = $request->user();

        return inertia('Profile', [
            'profileuser' => $user,

        ]);
    }
    public function update(Request $request, User $user)
    {


        $validated = $request->validate([
            'profile' => 'nullable|image',
            'fullname' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'role'=>'nullable|string|max:255',
             'skills' => 'nullable|string'

        ]);

        if (request('profile')) {
            $imagePath = request()->file('profile')->store('profile', 'public');
            $validated['profile'] = $imagePath;

            if ($user->profile) {
                Storage::delete($user->profile);
            }
        }

        // if ($request->hasFile('profile')) {

        //     if ($user->profile) {
        //         Storage::delete('public/'.$user->profile);
        //     }

        //     $imagePath = $request->file('profile')->store('profiles', 'public');
        //     $validated['profile'] = $imagePath;
        // }

        $skillsArray = [];
        if (!empty($validated['skills'])) {
            $skillsArray = array_map('trim', explode(',', $validated['skills']));
            $skillsArray = array_filter($skillsArray);
        }
        $user->update([
            'profile' => $validated['profile'],
            'fullname' => $validated['fullname'],
            'bio' => $validated['bio'],
            'role'=>$validated['role'],
            'skills' =>$skillsArray,

        ]);

        return back()->with('success', 'Profile updated successfully!');
    }
}
