<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
   return [
    'title' => fake()->sentence(4),
   'description' => fake()->text(500),
    'category' => fake()->randomElement([
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Cloud Computing',
        'Machine Learning',
        'Game Development'   ,
        'AI & ML' ,
        'Cyber Security'

    ]),
    'price' => fake()->numberBetween(10, 300),
    'benefits' => json_encode([
        fake()->sentence(),
        fake()->sentence(),
        fake()->sentence()
    ]),
    'features' => json_encode([
        'HD video content',
        'Certificate of completion',
        'Downloadable resources',
        'Q&A support',
        fake()->randomElement(['Lifetime access', '1-year access'])
    ]),
    'requirements' => json_encode([
        'Basic computer knowledge',
        fake()->randomElement(['No programming experience', 'Some programming experience']),
        'Internet connection'
    ]),

       'thumbnail' => fake()->randomElement([
"https://images.unsplash.com/photo-1518773553398-650c184e0bb3",
"https://images.unsplash.com/photo-1503602642458-232111445657",
"https://images.unsplash.com/photo-1551288049-bebda4e38f71",
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
 "https://images.unsplash.com/photo-1556157382-97eda2a7a2f1",
"https://images.unsplash.com/photo-1556761175-4b46a572b786",
"https://images.unsplash.com/photo-1552664730-d307ca884978",
"https://images.unsplash.com/photo-1518773553398-650c184e0bb3",
"https://images.unsplash.com/photo-1503602642458-232111445657",
"https://images.unsplash.com/photo-1551288049-bebda4e38f71",
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    ]),
'user_id' => \App\Models\User::factory(),

    'duration' => fake()->randomElement([
        '4 weeks',
        '6 weeks',
        '8 weeks',
        '10 weeks',
        '12 weeks'
    ]),

];
    }
}
