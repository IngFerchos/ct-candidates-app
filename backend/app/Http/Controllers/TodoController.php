<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{

    public function getTodoByUser(Request $request): JsonResponse
    {
        $user = Auth::user();    
        
        $queryComplete = $request->query('complete',null);

        $query = Todo::where('user_id', $user->id);

        if ($queryComplete != null) {

            $queryComplete = filter_var($queryComplete, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            $query->where('complete', $queryComplete);
        }

        $todos = $query->orderBy('order', 'asc')->get();
        return response()->json($todos);
    }

    public function postTodo(Request $request): JsonResponse
    {
        $user = Auth::user();

        $request->validate([
            'order' => 'required|integer',
            'title' => 'required|string|max:200',
            'complete' => 'boolean'
        ]);

        $todo = Todo::create([
            'user_id' => $user->id, 
            'order' => $request->input('order'),
            'title' => $request->input('title'),
            'complete' => $request->input('complete', false)
        ]);
        return response()->json($todo, 200);
    }

    public function deleteTodo($id): JsonResponse
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'message' => 'Todo not found'
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully'
        ], 200);
    }
    public function updateTodo(Request $request): JsonResponse
    {
        $user = Auth::user();

        $request->validate([
            'todos' => 'required|array', 
            'todos.*.id' => 'required|exists:todos,id', 
            'todos.*.order' => 'integer|nullable',
            'todos.*.title' => 'string|max:200|nullable',
            'todos.*.complete' => 'boolean|nullable'
        ]);

        $todos = $request->input('todos');


        $updatedTodos = [];

        foreach ($todos as $todoData) {
            $todo = Todo::find($todoData['id']);
            
                $todo->update($todoData);
                $updatedTodos[] = $todo;
        }

        return response()->json($updatedTodos);
    }
}
