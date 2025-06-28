<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\{
    CompanyController,
    CostumerController,
    ItemController,
    InvoiceController,
    InvoiceItemController,
    PurchaseController,
    PurchaseItemController,
    UserController
};

Route::apiResources([
    'companies'      => CompanyController::class,
    'costumers'      => CostumerController::class,
    'items'          => ItemController::class,
    'invoices'       => InvoiceController::class,
    'invoice-items'  => InvoiceItemController::class,
    'purchases'      => PurchaseController::class,
    'purchase-items' => PurchaseItemController::class,
    'users'          => UserController::class,
]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
