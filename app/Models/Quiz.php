<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [

        'title',
        'description',
        'duration',
        'passing_score',
        'section_id',
        'course_id',



    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

}
