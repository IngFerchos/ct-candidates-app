<?php

use App\Http\Controllers\ApiTasksController;
use App\Http\Controllers\ApiUsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('tasks', ApiTasksController::class )->names('api.tasks');
Route::resource('users', ApiUsersController::class )->names('api.users');