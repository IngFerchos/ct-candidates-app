<?php

use App\Http\Controllers\TodoController;
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
Route::get('/todos', [TodoController::class, 'findAll'])->middleware('auth:sanctum');
Route::get('/todos/{id}', [TodoController::class, 'findOne'])->middleware('auth:sanctum');
Route::post('/todos', [TodoController::class, 'create'])->middleware('auth:sanctum');
Route::patch('/todos/{id}', [TodoController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/todos/{id}', [TodoController::class, 'delete'])->middleware('auth:sanctum');
