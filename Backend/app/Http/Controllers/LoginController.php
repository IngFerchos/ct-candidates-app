<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Incorrect credentials'], 401);
        }

        $token = $user->createToken('password')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }
    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 400);
        }

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => "Logout"], 200);
    }
    public function isLogged(){
        $user = Auth::guard('sanctum')->user();
        if(!$user){
            return response()->json(["message" => "token valido"],401);
        };

        return response()->json(["message" => "token valido"],200);
    }
}
