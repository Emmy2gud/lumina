<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseTableseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run()
{

      Course::factory(200)
    ->create()
    ->each(function ($course) {
    Section::factory(rand(3, 7))->create([
            'course_id' => $course->id,
        ]);
    });

}
}
