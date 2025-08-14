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
        $table->dropForeign('courses_lesson_id_foreign');

        // Then drop the column
        $table->dropColumn('lesson_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
                $table->dropForeign(['lesson_id']);
        $table->dropColumn('lesson_id');
        });
    }
};
