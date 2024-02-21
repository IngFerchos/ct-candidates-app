<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::get('refresh','refresh');
});

Route::controller(TaskController::class)->prefix('tasks')->group(function (){
    Route::get('','index');
    Route::get('{task}','show');
    Route::post('', 'store');
    Route::put('update_order', 'updateSortTask');
    Route::put('{task}', 'update');
    Route::put('complete_status/{task}', 'updateCompleteStatus');
    Route::delete('{task}', 'destroy');
});

