<?php

namespace App\Http\Controllers;

use App\Models\Todo;

use App\Services\TodoService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    private $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'is_completed' => 'nullable|in:true,false,1,0',
            'per_page' => 'nullable|numeric|integer'
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        $isCompleted = $request->get('is_completed');
        $perPage = $request->get('per_page', 10);

        try {
            $todoList = Todo::where('user_id', Auth::user()->id)
            ->when(!blank($isCompleted), function ($query) use ($isCompleted) {
                return $query->where('is_completed', $isCompleted);
            })->latest()
            ->paginate($perPage);
            return $this->response(true, 'Todo list!', $todoList);
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'nullable|in:true,false'
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        try {
            $request->merge(['user_id' => Auth::user()->id]);
            $todo = $this->todoService->createOrUpdate($request->all());
            return $this->response(true, 'Your todo has been created successfully!', $todo);
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorize('update', $todo);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'nullable|in:true,false'
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        try {
            $todo = $this->todoService->createOrUpdate($request->all(), $todo);
            return $this->response(true, 'Your todo has been updated successfully!', $todo);
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }

    public function updateStatus(Request $request, Todo $todo)
    {
        $this->authorize('update', $todo);

        $validator = Validator::make($request->all(), [
            'is_completed' => 'required|boolean|in:true,false,1,0'
        ]);

        if ($validator->fails()) {
            return $this->response(false, 'Please provide valid information!', null, $validator->errors(), 400);
        }

        try {
            $todo = $this->todoService->updateStatus($request->all(), $todo);
            return $this->response(true, 'Your todo status has been updated successfully!', $todo);
        } catch (\Exception $e) {
            return $this->response(false, $e->getMessage() ?? 'Something went wrong!', null, $e->getTrace(), 500);
        }
    }
}
