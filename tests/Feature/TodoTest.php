<?php

namespace Tests\Feature;

use App\Models\User;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TodoTest extends TestCase
{
    use DatabaseTransactions;

    public function test_store()
    {
        $user = User::where('email','tanbir@gmail.com')->first();
        $token = $user->createToken('Authorization')->accessToken;

        $formData = [
            'title' => 'Create backend api with php',
            'description' => 'Need to implement the apis in the backend'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->post('/api/v1/todos', $formData);

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'Your todo has been created successfully!',
        ]);
    }

    public function test_index()
    {
        $user = User::where('email','tanbir@gmail.com')->first();
        $token = $user->createToken('Authorization')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/v1/todos?per_page=10');

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'Todo list!',
        ]);
    }

    public function test_update()
    {
        $user = User::where('email','tanbir@gmail.com')->first();
        $token = $user->createToken('Authorization')->accessToken;

        $data = [
            'title' => 'Create backend api with php and laravel',
            'description' => 'Need to implement the apis and test cases in the backend'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/v1/todos/1', $data);

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'Your todo has been updated successfully!',
        ]);
    }

    public function test_update_status()
    {
        $user = User::where('email','tanbir@gmail.com')->first();
        $token = $user->createToken('Authorization')->accessToken;

        $data = [
            'is_completed' => 1
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/v1/todos/update-status/1', $data);

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'Your todo status has been updated successfully!',
        ]);
    }
}
