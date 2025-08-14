<?php

namespace Database\Seeders;


use App\Models\Lesson;
use App\Models\Section;
use Database\Factories\LessonFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run()
{
  Lesson::factory(10)->create();
}
}
