<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{

    protected $fillable = [
        'title',
        'description',
        'file_upload',
        'file_type',
        'file_size',
        'relatedCourse',
        'course_id',
    ];

    // A material belongs to a course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
