<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
     use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'category',
        'thumbnail',
        'requirements',
        'benefits',
        'features',
        'user_id',



    ];

    protected $casts = [
        'requirements' => 'array',
        'benefits' => 'array',
        'features' => 'array',
    ];

     // A user can create many courses (if they're a tutor)
// Course.php
public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

     // A course has many sections
     public function sections()
     {
         return $this->hasMany(Section::class);
     }

public function lessons()
{
    return $this->hasManyThrough(
        Lesson::class,
        Section::class,
        'course_id',   // FK on sections table
        'section_id',  // FK on lessons table
        'id',          // PK on courses table
        'id'           // PK on sections table
    );
}



     public function materials()
     {
         return $this->hasMany(Material::class);
     }


     public function quizzes()
     {
         return $this->hasMany(Quiz::class);
     }





}
