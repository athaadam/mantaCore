<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('costumers', function (Blueprint $table) {
            $table->id('costumerID');
            $table->unsignedBigInteger('companyID'); // ✅ kolom foreign key ke company
            $table->string('username')->unique();
            $table->string('email');
            $table->string('phone_number');
            $table->timestamps();

            // ✅ definisi foreign key constraint
            $table->foreign('companyID')->references('companyID')->on('companies')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('costumers');
    }
};
