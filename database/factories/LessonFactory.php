<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'title' => $this->faker->sentence(4),
        'content' => $this->faker->paragraphs(3, true),
        'file_upload' => $this->faker->imageUrl(),
        'duration' => $this->faker->numberBetween(1, 60) . ' minutes',
        'order' => $this->faker->numberBetween(1, 10),
         'is_free' => $this->faker->boolean(30),
         'section_id' => Section::factory()
        ];
    }
}
