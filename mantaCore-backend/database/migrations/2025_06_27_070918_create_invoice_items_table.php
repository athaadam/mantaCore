<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id('invoiceItemID');
            $table->foreignId('invoiceID')->constrained('invoices', 'invoiceID')->cascadeOnDelete();
            $table->foreignId('itemID')->constrained('items', 'itemID')->cascadeOnDelete();
            $table->string('type');
            $table->integer('quantity');
            $table->decimal('unitPrice', 12, 2);
            $table->decimal('subTotal', 12, 2);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('invoice_items');
    }
};