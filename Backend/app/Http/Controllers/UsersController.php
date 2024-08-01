<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function findAll(Request $request){
        $users = User::all();
        return response()->json($users);
    }
    public function create(Request $request) {
        $user = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'password' => 'required|string',
        ]);
        $user['password'] = Hash::make($user['password']);
        $newUser = User::create($user);
        $token = $newUser->createToken('password')->plainTextToken;
        return response()->json(['user' => $newUser, 'token'=> $token], 201);
    }
}
