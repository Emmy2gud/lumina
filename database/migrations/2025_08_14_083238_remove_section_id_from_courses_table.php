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
        Schema::table('courses', function (Blueprint $table) {
           // Drop the foreign key first
        $table->dropForeign('courses_section_id_foreign');

        // Then drop the column
        $table->dropColumn('section_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
           $table->unsignedBigInteger('section_id')->nullable();
        $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
        });
    }
};
