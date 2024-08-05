<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255,email',
            'password' => 'required|string|min:6',
        ]);

        $existingUser = User::where('email', $data['email'])->first();

        if ($existingUser) {
            return response()->json([
                'message' => 'Email already in use',
            ], 400);
        }
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 200);
    }

    public function getUsers()
    {
        $user = Auth::user();

        return response()->json([
            'user' => $user,
        ], 200);
    }
}
