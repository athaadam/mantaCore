<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


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
