<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('companies', function (Blueprint $table) {
            $table->id('companyID');
            $table->string('companyName');
            $table->string('companyCode')->unique(); // Kode unik untuk perusahaan
            $table->timestamp('subscription_start')->nullable(); // Tanggal mulai langganan
            $table->timestamp('subscription_until')->nullable(); // Tanggal akhir langganan
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('companies');
    }
};
