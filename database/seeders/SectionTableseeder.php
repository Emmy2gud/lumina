<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionTableseeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    // so basically what is happening faker create 10 section,For each section, Faker creates between 3–7 lessons linked to it.
public function run()
{
Section::factory(10)
    ->create()
    ->each(function ($section) {
        Lesson::factory(rand(3, 7))->create([
            'section_id' => $section->id,
        ]);
    });

}
}
