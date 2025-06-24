<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/account-manage', function () {
    return view('accountmanage');
});

Route::get('/sales', function () {
    return view('sales');
});

Route::get('/purchase-approval', function () {
    return view('purchaseapproval');
});

Route::get('/inventory', function () {
    return view('inventory');
});

Route::get('/profile', function () {
    return view('profile');
});
