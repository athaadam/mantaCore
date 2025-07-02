<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id('userID');
            $table->foreignId('companyID')->constrained('companies', 'companyID')->cascadeOnDelete();
            $table->string('username')->unique();
            $table->string('email')->unique();        // Tambahkan email
            $table->string('phone_number')->nullable(); 
            $table->string('password');
            $table->string('role');
            $table->rememberToken();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('users');
    }
};
