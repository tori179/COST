<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tai_chinhs', function (Blueprint $table) {
            $table->string('hash')->nullable();
            $table->integer('is_thanh_toan')->default(0)->comment('0: chưa thanh toán, 1: đã thanh toán');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tai_chinhs', function (Blueprint $table) {
            //
        });
    }
};
