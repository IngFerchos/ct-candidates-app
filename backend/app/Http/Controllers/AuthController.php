<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $payload = [
                'userID' => $user->id
            ];

            $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            return response()->json([
                'access_token' => $jwt,
                'token_type' => 'bearer',
                'expires_in' => 60*60*24*3 //3 days
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
