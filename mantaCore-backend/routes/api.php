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
    UserController,
    AccountManage,
};

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
            'company' => $request->user()->company,
        ]);
    });

    Route::middleware('subscription')->group(function () {

        //cashier
        Route::middleware('cashier')->group(function () {
            // invoices
            Route::post('/createInvoice', [InvoiceController::class, 'createInvoice']);
            Route::get('/getmyInvoices', [InvoiceController::class, 'getMyInvoices']);
            Route::get('/getInvoice/{id}', [InvoiceController::class, 'getInvoiceById']);
            Route::post('/updateInvoice/{id}', [InvoiceController::class, 'updateInvoice']);
            Route::delete('/deleteInvoice/{id}', [InvoiceController::class, 'deleteInvoice']);

            //costumer
            Route::get('/getAllCostumers', [CostumerController::class, 'getAllCostumers']);
            Route::post('/createCostumer', [CostumerController::class, 'createCostumer']);
            Route::get('/getCostumer/{id}', [CostumerController::class, 'getCostumerById']);
            Route::post('/updateCostumer/{id}', [CostumerController::class, 'updateCostumer']);
            Route::delete('/deleteCostumer/{id}', [CostumerController::class, 'deleteCostumer']);
        });

        //management
        Route::middleware('management')->group(function () {

            // items
            Route::get('/getAllItems', [ItemController::class, 'getAllItems']);
            Route::get('/getItem/{id}', [ItemController::class, 'getItemById']);
            Route::post('/createItem', [ItemController::class, 'createItem']);
            Route::post('/updateItem/{id}', [ItemController::class, 'updateItem']);
            Route::delete('/deleteItem/{id}', [ItemController::class, 'deleteItem']);

            //purchases
            Route::post('/createPurchase', [PurchaseController::class, 'createPurchase']);
            Route::get('/getPurchase/{id}', [PurchaseController::class, 'getPurchaseById']);
            Route::get('/getMyPurchases', [PurchaseController::class, 'getMyPurchases']);
            Route::post('/updatePurchase/{id}', [PurchaseController::class, 'updatePurchase']);
            Route::delete('/deletePurchase/{id}', [PurchaseController::class, 'deletePurchase']);
        });

        //admin
        Route::middleware('admin')->group(function () {
            //account manage
            Route::post('/addUser', [AccountManage::class, 'addUser']);
            Route::delete('/deleteUser/{userID}', [AccountManage::class, 'deleteUser']);
            Route::post('/updateUser/{userID}', [AccountManage::class, 'updateUser']);

            // invoices
            Route::get('/getAllInvoices', [InvoiceController::class, 'getAllInvoices']);
            Route::get('/getInvoice/{id}', [InvoiceController::class, 'getInvoiceById']);
            Route::post('/updateInvoice/{id}', [InvoiceController::class, 'updateInvoice']);
            Route::delete('/deleteInvoice/{id}', [InvoiceController::class, 'deleteInvoice']);

            //costumer
            Route::get('/getAllCostumers', [CostumerController::class, 'getAllCostumers']);
            Route::get('/getCostumer/{id}', [CostumerController::class, 'getCostumerById']);
            Route::post('/updateCostumer/{id}', [CostumerController::class, 'updateCostumer']);
            Route::delete('/deleteCostumer/{id}', [CostumerController::class, 'deleteCostumer']);

             //purchases
            Route::get('/getAllPurchases', [PurchaseController::class, 'getAllPurchases']);
            Route::get('/getPurchase/{id}', [PurchaseController::class, 'getPurchaseById']);
            Route::post('/updatePurchase/{id}', [PurchaseController::class, 'updatePurchase']);
            Route::delete('/deletePurchase/{id}', [PurchaseController::class, 'deletePurchase']);

            // items
            Route::get('/getAllItems', [ItemController::class, 'getAllItems']);
            Route::get('/getItem/{id}', [ItemController::class, 'getItemById']);
            Route::post('/createItem', [ItemController::class, 'createItem']);
            Route::post('/updateItem/{id}', [ItemController::class, 'updateItem']);
            Route::delete('/deleteItem/{id}', [ItemController::class, 'deleteItem']);

            //user controller
            Route::get('/getAllUsers', [UserController::class, 'getAllUsers']);
            Route::get('/getUserByName/{username}', [UserController::class, 'getUserByName']);
            Route::post('/editProfile', [UserController::class, 'editProfile']);
            Route::post('/changePassword', [UserController::class, 'changePassword']);
            Route::delete('/deleteAccount', [UserController::class, 'deleteAccount']);
        });
    });
});
