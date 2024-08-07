<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determine if the given task can be viewed by the user.
     */
    public function view(User $user, Task $task)
    {
        return $user->id === $task->user_id;
    }

    /**
     * Determine if the given task can be created by the user.
     */
    public function create(User $user)
    {
        return true; // Allow all authenticated users to create tasks
    }

    /**
     * Determine if the given task can be updated by the user.
     */
    public function update(User $user, Task $task)
    {
        return $user->id === $task->user_id;
    }

    /**
     * Determine if the given task can be deleted by the user.
     */
    public function delete(User $user, Task $task)
    {
        return $user->id === $task->user_id;
    }
}
