<?php

use App\Http\Controllers\AuthController;
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

Route::prefix('/v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::put('/todos/update-status/{todo}', [TodoController::class, 'updateStatus']);
        Route::apiResource('/todos', TodoController::class)->only(['index', 'store', 'update']);
    });
});
