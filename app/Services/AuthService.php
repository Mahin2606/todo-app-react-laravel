<?php

namespace App\Services;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class AuthService extends Service
{
    public function register($data)
    {
        $user = User::create([
            'name' => data_get($data, 'name'),
            'email' => data_get($data, 'email'),
            'password' => Hash::make(data_get($data, 'password'))
        ]);

        return $user->fresh();
    }
}
