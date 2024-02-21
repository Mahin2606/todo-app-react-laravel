<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\AuthService;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use DatabaseTransactions;

    public function test_register(): void
    {
        $service = new AuthService();
        $user = $service->register([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'password' => '123456',
        ]);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('Test User', $user->name);
        $this->assertEquals('test@gmail.com', $user->email);
        $this->assertTrue(Hash::check('123456', $user->password));
    }
}
