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
        Schema::rename('ai_chat_sessions', 'a_i_chat_sessions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('a_i_chat_sessions', 'ai_chat_sessions');
    }
};
