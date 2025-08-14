<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullname'   => fake()->name(),
            'email'  => fake()->unique()->safeEmail(),
            'profile'=> 'https://i.pravatar.cc/300?img=' . rand(1, 70),
            'skills' => fake()->randomElement([
                'HTML, CSS, JavaScript',
                'PHP, Laravel, MySQL',
                'React, Node.js, MongoDB',
                'Python, Data Analysis',
                'UI/UX Design, Figma',
                'Digital Marketing, SEO',
            ]),
            'role'         => fake()->randomElement(['teacher', 'student']),
            'bio'               => $this->faker->sentence(),
            'email_verified_at' => now(),
            'password'          => static::$password ??= Hash::make('password'),
            'remember_token'    => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
