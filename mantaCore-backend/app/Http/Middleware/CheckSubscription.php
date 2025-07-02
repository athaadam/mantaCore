<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    
     //buatkan middleware yang berfungsi mengecek apakah user memiliki subscription yang aktif
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user || !$user->company || !$user->company->subscription_until) {
            return response()->json(['message' => 'Subscription is required'], 403);
        }
        $subscriptionUntil = $user->company->subscription_until;
        if ($subscriptionUntil < now()) {
            return response()->json(['message' => 'Subscription has expired'], 403);
        }
        return $next($request);
    }
}
