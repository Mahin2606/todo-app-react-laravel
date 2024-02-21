<?php

namespace App\Services;

use App\Models\Todo;

class TodoService extends Service
{
    public function createOrUpdate($data, $todo = null)
    {
        if (blank($todo)) {
            $todo = new Todo();
        }

        $todo->fill($data);
        $todo->save();

        return $todo->fresh();
    }

    public function updateStatus($data, $todo = null)
    {
        $todo->is_completed = data_get($data, 'is_completed');
        $todo->save();
        return $todo->fresh();
    }
}
