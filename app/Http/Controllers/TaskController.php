<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Retrieve and render the index page for tasks.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Tasks/Index', [
            'tasks' => Task::select('id', 'title', 'is_completed', 'order')
                ->where('user_id', auth()->id())
                ->orderBy('order')
                ->get()
        ]);
    }

    /**
     * Store a newly created task in storage.
     *
     * @param  \App\Http\Requests\TaskRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(TaskRequest $request)
    {
        try {
            $data = $request->validated();

            // Verify order is not negative
            if ($data['order'] <= 0) throw new \Exception('El orden no puede ser negativo.');

            $data['user_id'] = auth()->id();

            Task::create($data);

            return redirect()->route('tasks.index')->with('message', 'Tarea creada.')->with('type', 'success');
        } catch (\Exception $e) {
            return redirect()->route('tasks.index')->with('message', $e->getMessage())->with('type', 'error');
        }        
    }

    /**
     * Update a task.
     *
     * @param TaskRequest $request The request object containing the task data.
     * @param int $id The ID of the task to be updated.
     * @return \Illuminate\Http\RedirectResponse Redirects to the tasks index page with a success or error message.
     */
    public function update(TaskRequest $request, int $id)
    {
        /* try { */
            $task = Task::find($id);
            
            // Check if the task exists
            if (!$task) throw new \Exception('Tarea no encontrada.');

            $data = $request->validated();

            // Verify order is not negative
            if ($data['order'] <= 0) throw new \Exception('El orden no puede ser negativo.');

            $task->update($data);

            return redirect()->route('tasks.index')->with('message', 'Tarea actualizada.')->with('type', 'success');
        /* } catch (\Exception $e) {
            return redirect()->route('tasks.index')->with('message', $e->getMessage()."\n".print_r($request->validated()))->with('type', 'error');
        } */
    }

    /**
     * Delete a task.
     *
     * @param int $id The ID of the task to be deleted.
     * @return \Illuminate\Http\RedirectResponse Redirects to the tasks index page with a success or error message.
     */
    public function destroy(int $id)
    {
        try {
            $task = Task::find($id);
            
            // Check if the task exists
            if (!$task) throw new \Exception('Tarea no encontrada.');

            $task->update(['order' => 0]);

            $task->delete();

            return redirect()->route('tasks.index')->with('message', 'Tarea eliminada.')->with('type', 'success');
        } catch (\Exception $e) {
            return redirect()->route('tasks.index')->with('message', $e->getMessage())->with('type', 'error');
        
        }
    }

    /**
     * Change the status of a task.
     *
     * @param int $id The ID of the task to change the status.
     * @return \Illuminate\Http\RedirectResponse Redirects to the tasks index page with a success or error message.
     */
    public function changeStatus(int $id)
    {
        try {
            $task = Task::find($id);
            
            // Check if the task exists
            if (!$task) throw new \Exception('Tarea no encontrada.');

            $task->update(['is_completed' => !$task->is_completed]);

            return redirect()->route('tasks.index')
                            ->with('message', $task->is_completed?'¡Tarea completada, felicidades! 🎉':'¿Aún no finalizas tu tarea?🤔')
                            ->with('type', $task->is_completed?'success':'warning');
        } catch (\Exception $e) {
            return redirect()->route('tasks.index')->with('message', $e->getMessage())->with('type', 'error');
        }
    }


    /**
     * Sorts the tasks based on the provided order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sort(Request $request)
    {
        try {
            $data = $request->validate([
                'tasks' => ['required', 'array'],
            ]);

            // Update the order of the tasks by looping through the array and finding the task by ID
            foreach ($data['tasks'] as $index => $task) {
                Task::find($task['id'])->update(['order' => $task['order']]);
            }

            return redirect()->route('tasks.index')->with('message', 'Orden actualizado.')->with('type', 'success');
        } catch (\Exception $e) {
            return redirect()->route('tasks.index')->with('message', $e->getMessage())->with('type', 'error');
        }
    }

}
