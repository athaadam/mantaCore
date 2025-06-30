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

    //purchases
    Route::get('/getAllPurchases', [PurchaseController::class, 'getAllPurchases']);
    Route::post('/createPurchase', [PurchaseController::class, 'createPurchase']);
    Route::get('/getPurchase/{id}', [PurchaseController::class, 'getPurchaseById']);
    Route::post('/updatePurchase/{id}', [PurchaseController::class, 'updatePurchase']);
    Route::delete('/deletePurchase/{id}', [PurchaseController::class, 'deletePurchase']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
            'company' => $request->user()->company,
        ]);
    });
});
