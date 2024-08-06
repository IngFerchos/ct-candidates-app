<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->tasks()->orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        return $request->user()->tasks()->create([
            'title' => $request->title,
            'order' => $request->order,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'order' => 'sometimes|integer',
            'is_completed' => 'sometimes|boolean',
        ]);

        $this->authorize('update', $task);

        $task->update($request->only('title', 'order', 'is_completed'));

        return $task;
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->noContent();
    }
    
    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return $task;
    }
}
