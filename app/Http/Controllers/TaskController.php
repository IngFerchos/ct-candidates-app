<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::where('user_id', auth()->id());

        if ($request->has('filter') && $request->filter != '') {
            $query->where('title', 'like', '%' . $request->filter . '%');
        }

        if ($request->has('sort_by') && $request->sort_by != '') {
            $query->orderBy($request->sort_by, $request->sort_direction ?? 'asc');
        } else {
            $query->orderBy('order', 'asc');
        }

        $tasks = $query->get();

        return view('tasks.index', compact('tasks'));
    }






    public function create()
    {
        return view('tasks.create');
    }

    public function show(Task $task)
    {
        return view('tasks.show', compact('task'));
    }

    public function edit(Task $task)
    {
        return view('tasks.edit', compact('task'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'order' => 'required|integer',
        ]);

        $task = new Task($request->all());
        $task->user_id = auth()->id();
        $task->save();

        return redirect()->route('tasks.index')
                        ->with('success', 'Task created successfully.');
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'required',
            'order' => 'required|integer',
        ]);

        $task->update($request->all());

        return redirect()->route('tasks.index')
                        ->with('success', 'Task updated successfully.');
    }



    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
                         ->with('success', 'Task deleted successfully.');
    }
}
