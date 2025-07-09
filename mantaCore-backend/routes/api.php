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
    DashboardController
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
        //user
        Route::post('/editProfile', [UserController::class, 'editProfile']);
        Route::post('/changePassword', [UserController::class, 'changePassword']);
        Route::delete('/deleteAccount', [UserController::class, 'deleteAccount']);

        //cashier
        Route::middleware('cashier')->group(function () {
            // invoices
            Route::post('/createInvoice', [InvoiceController::class, 'createInvoice']); 
            Route::get('/getAllInvoices', [InvoiceController::class, 'getAllInvoices']);
            Route::get('/getInvoice/{id}', [InvoiceController::class, 'getInvoiceById']);
            Route::post('/updateInvoice/{id}', [InvoiceController::class, 'updateInvoice']);
            Route::delete('/deleteInvoice/{id}', [InvoiceController::class, 'deleteInvoice']);
            Route::get('/filterInvoices', [InvoiceController::class, 'filterInvoices']);
            Route::get('/sales-report', [InvoiceController::class, 'salesReport']);


            //costumer
            Route::get('/getAllCostumers', [CostumerController::class, 'getAllCostumers']);
            Route::post('/createCostumer', [CostumerController::class, 'createCostumer']);
            Route::get('/getCostumer/{id}', [CostumerController::class, 'getCostumerById']);
            Route::post('/updateCostumer/{id}', [CostumerController::class, 'updateCostumer']);
        });

        //management
        Route::middleware('management')->group(function () {

             //purchases
            Route::get('/getAllPurchases', [PurchaseController::class, 'getAllPurchases']);
            Route::post('/createPurchase', [PurchaseController::class, 'createPurchase']);
            Route::get('/getPurchase/{id}', [PurchaseController::class, 'getPurchaseById']);
            Route::get('/getMyPurchases', [PurchaseController::class, 'getMyPurchases']);
            Route::post('/updatePurchase/{id}', [PurchaseController::class, 'updatePurchase']);
            Route::delete('/deletePurchase/{id}', [PurchaseController::class, 'deletePurchase']);

            // items
            Route::get('/getAllItems', [ItemController::class, 'getAllItems']);
            Route::get('/getItem/{id}', [ItemController::class, 'getItemById']);
            Route::post('/createItem', [ItemController::class, 'createItem']);
            Route::post('/updateItem/{id}', [ItemController::class, 'updateItem']);
            Route::delete('/deleteItem/{id}', [ItemController::class, 'deleteItem']);

             //account manage
            Route::post('/addUser', [AccountManage::class, 'addUser']);
            Route::delete('/deleteUser/{userID}', [AccountManage::class, 'deleteUser']);
            Route::post('/updateUser/{userID}', [AccountManage::class, 'updateUser']);

            //user management
            Route::get('/getAllUsers', [UserController::class, 'getAllUsers']);
            Route::get('/getUserByName/{username}', [UserController::class, 'getUserByName']);

        });

        //admin
        Route::middleware('admin')->group(function () {
           //dashboard
            Route::get('/totalPenjualan', [DashboardController::class, 'totalPenjualan']);
            Route::get('/todayProfitLoss', [DashboardController::class, 'todayProfitLoss']);
            Route::get('/lifetimeProfitLoss', [DashboardController::class, 'lifetimeProfitLoss']);
            Route::get('/topSellingItems', [DashboardController::class, 'topSales']);
        });

        Route::middleware('role.management')->group(function () {
            
        }); 

        Route::middleware('role.cashier')->group(function () {
            
        });
    });
});
