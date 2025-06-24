<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckLogin;

// Rute publik
Route::get('/', function () {
    return view('index');
})->name('home');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::middleware([CheckLogin::class])->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
    Route::get('/account-manage', fn() => view('accountmanage'));
    Route::get('/sales', fn() => view('sales'));
    Route::get('/purchase-approval', fn() => view('purchaseapproval'));
    Route::get('/inventory', fn() => view('inventory'));
    Route::get('/profile', fn() => view('profile'));
});

