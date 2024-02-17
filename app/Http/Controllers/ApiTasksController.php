<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;

class ApiTasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Tasks::all();
        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $recordTask = New Tasks;
        $recordTask->title = $request->title;
        $recordTask->order = $request->order;
        $recordTask->completed = $request->completed;
        $recordTask->usercreate = $request->usercreate;
        $recordTask->userassigned = $request->userassigned;
        $recordTask->save();        
        return 'Data saved-'.$recordTask->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $recordTask= Tasks::findorFail($id);
        $recordTask->title = $request->title;
        $recordTask->order = $request->order;
        $recordTask->completed = $request->completed;
        $recordTask->usercreate = $request->usercreate;
        $recordTask->userassigned = $request->userassigned;
        $recordTask->save();        
        return 'Data updated';
    }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy(string $id)
    {
        $recordTask= Tasks::findorFail($id);
        $recordTask->delete();
        return 'Record Deleted';
    }
}
