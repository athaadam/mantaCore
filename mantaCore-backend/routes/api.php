<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // invoices
    Route::get('/getAllInvoices', [InvoiceController::class, 'getAllInvoices']);
    Route::post('/createInvoice', [InvoiceController::class, 'createInvoice']);
    Route::get('/getInvoice/{id}', [InvoiceController::class, 'getInvoiceById']);
    Route::post('/updateInvoice/{id}', [InvoiceController::class, 'updateInvoice']);
    Route::delete('/deleteInvoice/{id}', [InvoiceController::class, 'deleteInvoice']);

    // items
    Route::get('/getAllItems', [ItemController::class, 'getAllItems']);
    Route::get('/getItem/{id}', [ItemController::class, 'getItemById']);
    Route::post('/createItem', [ItemController::class, 'createItem']);
    Route::post('/updateItem/{id}', [ItemController::class, 'updateItem']);
    Route::delete('/deleteItem/{id}', [ItemController::class, 'deleteItem']);

    Route::apiResources([
        'companies'      => CompanyController::class,
        'purchases'      => PurchaseController::class,
        'purchase-items' => PurchaseItemController::class,
        'users'          => UserController::class,
    ]);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
