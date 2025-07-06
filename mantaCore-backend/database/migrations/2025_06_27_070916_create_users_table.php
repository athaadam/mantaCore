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
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->string('password');
            $table->string('role');
            $table->string('status')->default('active'); // ✅ Status user, default-nya aktif
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
