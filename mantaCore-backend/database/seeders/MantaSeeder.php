<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use DB;

class MantaSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Insert Company
        $companyID = DB::table('companies')->insertGetId([
            'companyName' => 'PT Manta Core',
            'subscription_start' => now()->subMonths(1),
            'subscription_until' => now()->addMonths(11),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Insert Users
        $users = [
            ['username' => 'adminuser', 'email' => 'admin@manta.com', 'role' => 'admin'],
            ['username' => 'cashieruser', 'email' => 'cashier@manta.com', 'role' => 'cashier'],
            ['username' => 'managementuser', 'email' => 'management@manta.com', 'role' => 'management'],
        ];

        foreach ($users as $user) {
            $user['password'] = Hash::make('password'); // default password
            $user['companyID'] = $companyID;
            $user['created_at'] = now();
            $user['updated_at'] = now();
            DB::table('users')->insert($user);
        }

        $userIDs = DB::table('users')->pluck('userID');

        // 3. Buat 10 Costumer dan 10 Item
        for ($i = 1; $i <= 10; $i++) {
            DB::table('costumers')->insert([
                'companyID' => $companyID,
                'username' => 'costumer' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('items')->insert([
                'companyID' => $companyID,
                'name' => 'Item ' . $i,
                'itemPrice' => rand(1000, 50000),
                'category' => 'General',
                'type' => 'Unit',
                'units' => 'pcs',
                'stock' => rand(50, 200),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $costumerIDs = DB::table('costumers')->pluck('costumerID');
        $itemIDs = DB::table('items')->pluck('itemID');

        // 4. Generate 100 Invoices dan 100 Purchases selama 3 bulan
        for ($i = 1; $i <= 100; $i++) {
            $date = Carbon::now()->subDays(rand(0, 90))->toDateString();
            $userID = $userIDs->random();
            $costumerID = $costumerIDs->random();
            $itemID = $itemIDs->random();
            $quantity = rand(1, 5);
            $price = DB::table('items')->where('itemID', $itemID)->value('itemPrice');
            $subtotal = $quantity * $price;

            // Invoice
            $invoiceID = DB::table('invoices')->insertGetId([
                'userID' => $userID,
                'companyID' => $companyID,
                'costumerID' => $costumerID,
                'date' => $date,
                'amount' => $subtotal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('invoice_items')->insert([
                'invoiceID' => $invoiceID,
                'itemID' => $itemID,
                'type' => 'sell',
                'quantity' => $quantity,
                'unitPrice' => $price,
                'subTotal' => $subtotal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Purchase
            $purchaseID = DB::table('purchases')->insertGetId([
                'userID' => $userID,
                'companyID' => $companyID,
                'status' => 'completed',
                'date' => $date,
                'amount' => $subtotal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('purchase_items')->insert([
                'purchaseID' => $purchaseID,
                'itemID' => $itemID,
                'type' => 'buy',
                'quantity' => $quantity,
                'unitPrice' => $price,
                'subTotal' => $subtotal,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
