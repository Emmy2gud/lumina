<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
   protected $fillable = ['user_id', 'course_id', 'payment_id','enrolled','status'];
}
