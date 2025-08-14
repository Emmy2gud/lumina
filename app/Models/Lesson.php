<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
        use HasFactory;
    protected $fillable = [
        'title',
        'section_id',
        'content',
        'file_upload',
        'duration',
        'order',
        'is_free',

    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

        public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
