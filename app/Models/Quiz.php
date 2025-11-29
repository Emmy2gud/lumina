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
  



    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
