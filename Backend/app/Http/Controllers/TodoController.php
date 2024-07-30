<?php

namespace App\Http\Controllers;

use App\Models\Todos;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function findAll() {
        $todos = Todos::all();
        return response()->json($todos);
    }

    public function findOne($id) {
        $todo = Todos::find($id);
        if(!$todo){
            return response()->json(['message'=>'Todo does not exist' ]);
        }
        return response()->json($todo);
    }

    public function create(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'order' => 'required|integer',
        ]);
        $newTodo = Todos::create($data);
        return response()->json($newTodo, 201);
    }

    public function update(Request $request, $id){
        $data = $request->validate([
            'title' => 'string',
            'order' => 'integer',
            'done' => 'boolean'
        ]);

        $todo = Todos::find($id);

        if(!$todo){
            return response()->json(['message' => 'Todo does not exist'], 404);
        }
        $todo->update($data);

        return response()->json($todo);
    }

    public function delete($id){
        $todo = Todos::find($id);
        if(!$todo){
            return response()->json(['message' => 'Todo does not exist'], 404);
        }
        $todo->delete();

        return response()->json(['message' => 'Todo eliminado']);
    }
}
