<?php

namespace Tests\Feature;

use App\Models\User;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    public function test_register()
    {
        $userData = [
            'name' => 'Tanbir',
            'email' => 'tanbir@gmail.com',
            'password' => '123456',
            'password_confirmation' => '123456'
        ];

        $response = $this->post('api/v1/register', $userData);

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'User registration completed successfully!',
        ]);
    }

    public function test_login()
    {
        $response = $this->post('/api/v1/login', [
            'email' => 'tanbir@gmail.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'You are logged in!',
        ]);
    }

    public function test_logout()
    {
        $user = User::where('email','tanbir@gmail.com')->first();
        $token = $user->createToken('Authorization')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->post('/api/v1/logout');

        $response->assertStatus(200)->assertJson([
            'success' => 'true',
            'message' => 'You are logged out!',
        ]);
    }
}
