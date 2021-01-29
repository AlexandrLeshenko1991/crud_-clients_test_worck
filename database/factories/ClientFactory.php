<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Helpers\ClientFactoryHelper;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $names = ClientFactoryHelper::getNames();
        $last_name = ClientFactoryHelper::getLastName();
        $professions = ClientFactoryHelper::getProfessions();

        return [
            'name' => $names[rand(0, (count($names)-1) )],
            'last_name' => $last_name[rand(0, (count($last_name)-1) )],
            'profession' => $professions[rand(0, (count($professions)-1) )],
            'age' => rand(12,74)
        ];
    }
}
