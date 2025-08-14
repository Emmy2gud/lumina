<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
public function run(): void
{
    DB::disableQueryLog(); // Reduces memory usage
    Event::fake(); // Disables event listeners

    // Run seeders in optimal order
    $this->call([
        UserTableseeder::class,
    ]);
    gc_collect_cycles();

    $this->call([
        CourseTableseeder::class,
    ]);
    gc_collect_cycles();

    $this->call([
        SectionTableseeder::class,
    ]);
    gc_collect_cycles();

    $this->call([
        LessonTableSeeder::class,
    ]);
    gc_collect_cycles();
}

}
