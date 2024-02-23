<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class TasksController extends Controller
{

    public function index()
    {

        return Inertia::render('Dashboard', [
            'tasks' => Task::query()
                ->with(['user'])
                ->when(FacadesRequest::input('filter'), function ($query, $filter) {
                    $query->where('state', $filter);
                })
                ->when(FacadesRequest::input('search'), function ($query, $search) {
                    $query->where(function ($subquery) use ($search) {
                        $subquery->where('title', 'like', "%{$search}%");
                    });
                })->latest() 
                ->paginate(3)
                ->withQueryString(),
            'filters' => FacadesRequest::only(['search', 'filter'])
        ]);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        try {
            $user = $request->user();
            Task::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'user_id' => $user->id,
                'state' => 0
            ]);

            return redirect()->route('dashboard.index')->with('success', 'Task created successfuly');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        try {
            Task::where('id', $id)->update([
                'title' => $request->input('title'),
                'description' => $request->input('description')
            ]);

            return redirect()->route('dashboard.index')->with('success', 'Task updated successfuly');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function state(Task $task)
    {
        try {
            Task::where('id', $task->id)->update([
                'state' => !$task->state,
            ]);

            return redirect()->route('dashboard.index')->with('success', 'Task updated successfuly');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function destroy(string $id)
    {
        Task::destroy($id);
        return redirect()->route('dashboard.index')->with('success', 'Task deleted successfuly');
    }
}
