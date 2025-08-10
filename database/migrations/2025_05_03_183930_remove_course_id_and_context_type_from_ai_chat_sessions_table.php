<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveCourseIdAndContextTypeFromAiChatSessionsTable extends Migration
{
    public function up()
    {
        Schema::table('a_i_chat_sessions', function (Blueprint $table) {
            $table->dropColumn(['context_id', 'context_type']);
        });
    }

    public function down()
    {
        Schema::table('a_i_chat_sessions', function (Blueprint $table) {
            // Recreate the columns as they were originally
            $table->unsignedBigInteger('context_id')->nullable();
            $table->string('context_type')->nullable();
            // Add any other column options that were originally present
        });
    }
}
