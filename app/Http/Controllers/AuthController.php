<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Traits\WrapInTransaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use WrapInTransaction;

    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|min:3|max:100',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        try {
            $user = $this->wrapInTransaction(function ($data) {
                return $this->authService->register($data);
            }, $request->all());
            return $this->response(true, 'User registration completed successfully!', $user);
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        try {
            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $result['user'] = $user;
                $result['token'] = $user->createToken('Authorization')->accessToken;
                return $this->response(true, 'You are logged in!', $result);
            } else {
                return $this->response(false, 'Invalid credentials!', null, ['user' => 'Invalid credentials given by the user!'], 400);
            }
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }

    public function logout()
    {
        try {
            return $this->wrapInTransaction(function () {
                Auth::user()->tokens->each(function ($token) {
                    $token->delete();
                });
                
                return $this->response(true, 'You are logged out!');
            });
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }
}
