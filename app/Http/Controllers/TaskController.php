<?php

namespace App\Http\Controllers;


use App\Http\Requests\Task\TaskCreateUpdateRequest;
use App\Models\Task;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::query();
        if($title_filter = $request->input("title")){
            $query->where("title", "LIKE" ,"%".$title_filter."%");
        }
        if($complete_filter = $request->boolean("completed")){
            $query->where("complete","=", $complete_filter);
        }

        return $query->orderBy('order')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskCreateUpdateRequest $request)
    {
        $task = Task::create($request->validated());
        return response()->json([
            "message" => "success",
            "task" => $task
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Task::find($task->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskCreateUpdateRequest $request, Task $task)
    {
        $task->update($request->validated());
        return response()->json([
            "message" => "success",
            "task" => $task->refresh()
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Update the complete status on task
     */
    public function updateCompleteStatus(Request $request, Task $task) {
        $validator = Validator::make($request->all(), [
            'complete' => 'required|boolean'
        ]);

        if ($validator->fails())
            return response($validator->errors()->toJson(), Response::HTTP_BAD_REQUEST);
        
        $task->update($validator->validated());
        return response()->json(["message" => "success"], Response::HTTP_ACCEPTED);
    }

    public function updateSortTask(Request $request) {
        $validator = Validator::make($request->all(), [
            "task_id" => "required|integer",
            "old_idx" => "required|integer",
            "new_idx" => "required|integer"
        ]);

        if($validator->fails())
            return response($validator->errors()->toJson(), Response::HTTP_BAD_REQUEST);

        $task_id = $request->task_id;
        $old_index = $request->old_idx;
        $new_index = $request->new_idx;

        if($new_index > $old_index)
        {
            
            Task::where("order", "<=", $new_index)
                ->where("order",">", $old_index)
                ->update(["order"=> \DB::raw("`order`-1")]);
        }
        else
        {
            Task::where("order", ">=", $new_index)
                ->where("order","<", $old_index)
                ->update(["order"=> \DB::raw("`order`+1")]);
        }

        Task::where("id", "=", $task_id)->update(["order"=> $new_index]);
        return response()->json([
            "message" => "success update order on task",
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            "message" => "success delete",
            "task" => $task
        ], Response::HTTP_NO_CONTENT);
    }

    private function getUser() {
        return Auth::user();
    }
}
