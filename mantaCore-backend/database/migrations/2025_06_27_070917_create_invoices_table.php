<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id('invoiceID');
            $table->foreignId('userID')->constrained('users', 'userID')->cascadeOnDelete();
            $table->foreignId('companyID')->constrained('companies', 'companyID')->cascadeOnDelete();
            $table->foreignId('costumerID')->constrained('costumers', 'costumerID')->cascadeOnDelete();
            $table->date('date');
            $table->decimal('amount', 12, 2)->default(0);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('invoices');
    }
};
