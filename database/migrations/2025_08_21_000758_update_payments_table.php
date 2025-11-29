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
       Schema::table('payments', function (Blueprint $table) {

        $table->integer('amount')->change();
        $table->string('currency', 10)->default('NGN')->change();
        $table->json('payload')->nullable()->change();
        $table->string('status')->default('pending')->change();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            //
        });
    }
};
