<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;

use Throwable;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    use ApiResponse;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return $this->response(false, 'Todo not found!', null, ['todo' => 'Invalid todo id given by the user!'], 404);
        }
        
        if ($exception instanceof AuthorizationException) {
            return $this->response(false, 'You are not authorized to make actions in this todo!', null, ['todo' => 'Unauthorized todo id given by the user!'], 403);
        }

        return parent::render($request, $exception);
    }
}
