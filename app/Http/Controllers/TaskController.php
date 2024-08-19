<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->order = $request->order;
        $task->is_completed = $request->is_completed ?? false;
        $task->save();

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        $task = Task::findOrFail($id);
        $task->title = $request->title;
        $task->order = $request->order;
        $task->is_completed = $request->is_completed ?? false;
        $task->save();

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $tasks = Task::where('title', 'LIKE', "%{$query}%")
                     ->orWhere('order', 'LIKE', "%{$query}%")
                     ->get();
        return response()->json($tasks);
    }
}
