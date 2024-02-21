<?php

namespace Tests\Unit;

use App\Models\Todo;
use App\Services\TodoService;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TodoServiceTest extends TestCase
{
    use DatabaseTransactions;
    
    public function testCreateOrUpdate()
    {
        $service = new TodoService();
        $todo = $service->createOrUpdate([
            'user_id' => 1,
            'title' => 'Test Todo',
            'description' => 'This is a test todo',
            'is_completed' => false,
        ]);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals('Test Todo', $todo->title);
        $this->assertEquals('This is a test todo', $todo->description);
        $this->assertEquals(false, $todo->is_completed);
        $this->assertEquals(1, $todo->user_id);
    }

    public function testUpdateStatus()
    {
        $service = new TodoService();
        $todo = Todo::first();
        $updatedTodo = $service->updateStatus(['is_completed' => true], $todo);

        $this->assertInstanceOf(Todo::class, $updatedTodo);
        $this->assertEquals(true, $updatedTodo->is_completed);
    }
}
