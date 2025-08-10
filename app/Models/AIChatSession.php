<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AIChatSession extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'created_at',
        'updated_at',
    ];

    protected $table = 'a_i_chat_sessions';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function messages()
    {
        // Explicitly specify the foreign key
        return $this->hasMany(AIChatMessage::class, 'session_id');
    }
}
