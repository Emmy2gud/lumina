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
        Schema::table('new', function (Blueprint $table) {
            Schema::rename('ai_chatmessages', 'a_i_chat_messages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new', function (Blueprint $table) {
            Schema::rename('a_i_chat_messages', 'ai_chatmessages');
        });
    }
};
