<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'subscription' => \App\Http\Middleware\CheckSubscription::class,
            'admin' => \App\Http\Middleware\CheckisAdmin::class,
            'cashier' => \App\Http\Middleware\CheckisCashier::class,
            'management' => \App\Http\Middleware\CheckisManagement::class,
            'role.management' => \App\Http\Middleware\checkRoleManaegment::class,
            'role.cashier' => \App\Http\Middleware\checkRoleCashier::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
