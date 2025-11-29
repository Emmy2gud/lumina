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
     Schema::table('quizzes', function (Blueprint $table) {
            if (Schema::hasColumn('quizzes', 'lesson_id')) {
                $table->dropForeign(['lesson_id']);
                $table->dropColumn('lesson_id');
            }
            if (Schema::hasColumn('quizzes', 'course_id')) {
                $table->dropForeign(['course_id']);
                $table->dropColumn('course_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // Restore columns (nullable by default — adjust if you prefer non-nullable)
            if (! Schema::hasColumn('quizzes', 'lesson_id')) {
                $table->foreignId('lesson_id')->nullable()->constrained()->onDelete('cascade');
            }
            if (! Schema::hasColumn('quizzes', 'course_id')) {
                $table->foreignId('course_id')->nullable()->constrained()->onDelete('cascade');
            }
        });
    }
};
