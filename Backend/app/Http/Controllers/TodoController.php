<?php

namespace App\Http\Controllers;

use App\Models\Todos;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function findAll(Request $request) {
        $user = $request->user();
        $todos = $user->todos;

        return response()->json($todos);
        // $todos = Todos::all();
        // return response()->json($todos);
    }

    public function findOne($id, Request $request) {
        $user = $request->user();
        $todo = Todos::find($id);
        if(!$todo){
            return response()->json(['message'=>'Todo does not exist' ]);
        }
        if($user->id != $todo->user_id){
            return response()->json(["message"=>"Not Found"],404);
        }
        return response()->json($todo);
    }

    public function create(Request $request) {
        $user = $request->user();
        $data = $request->validate([
            'title' => 'required|string',
            'order' => 'required|integer',
        ]);
        $data['user_id'] = $user->id;
        $newTodo = Todos::create($data);
        return response()->json($newTodo, 201);
    }

    public function update(Request $request, $id){
        $user = $request->user();
        $todo = Todos::find($id);
        if(!$todo){
            return response()->json(['message'=>'Todo does not exist' ]);
        }
        if($user->id != $todo->user_id){
            return response()->json(["message"=>"Not Found"],404);
        }
        $data = $request->validate([
            'title' => 'string',
            'order' => 'integer',
            'done' => 'boolean'
        ]);
        if(!$todo){
            return response()->json(['message' => 'Todo does not exist'], 404);
        }
        $todo->update($data);

        return response()->json($todo);
    }

    public function delete($id, Request $request){
        $user = $request->user();
        $todo = Todos::find($id);
        if(!$todo){
            return response()->json(['message'=>'Todo does not exist' ]);
        }
        if($user->id != $todo->user_id){
            return response()->json(["message"=>"Not Found"],404);
        }
        $todo->delete();

        return response()->json(['message' => 'Todo eliminado']);
    }
}
