<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AIChatMessage extends Model
{
    protected $table = 'a_i_chat_messages';

    protected $fillable = [
        'session_id',
        'user_id',
        'message',
        'metadata',
        'sender',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'metadata' => 'array',
    ];


    public function session()
    {
        return $this->belongsTo(AIChatSession::class, 'session_id');
    }
}
