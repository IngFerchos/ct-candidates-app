<!-- resources/views/tasks/index.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h2 class="my-4">Todo List</h2>
        </div>
        <div class="col-lg-12 text-right mb-3">
            <a class="btn btn-success" href="{{ route('tasks.create') }}"> Create New Task</a>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-lg-12">
            <form action="{{ route('tasks.index') }}" method="GET">
                <div class="input-group">
                    <input type="text" name="filter" class="form-control" placeholder="Search by title" value="{{ request()->filter }}">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Filter</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    @if ($message = Session::get('success'))
    <div class="alert alert-success">
        <p>{{ $message }}</p>
    </div>
    @endif

    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>No</th>
                <th>
                    <a href="{{ route('tasks.index', array_merge(request()->all(), ['sort_by' => 'title', 'sort_direction' => request()->sort_direction == 'asc' ? 'desc' : 'asc'])) }}" class="text-light">
                        Title
                        <i class="fas fa-sort{{ request()->sort_by == 'title' ? (request()->sort_direction == 'asc' ? '-up' : '-down') : '' }}"></i>
                    </a>
                </th>
                <th>
                    <a href="{{ route('tasks.index', array_merge(request()->all(), ['sort_by' => 'order', 'sort_direction' => request()->sort_direction == 'asc' ? 'desc' : 'asc'])) }}" class="text-light">
                        Order
                        <i class="fas fa-sort{{ request()->sort_by == 'order' ? (request()->sort_direction == 'asc' ? '-up' : '-down') : '' }}"></i>
                    </a>
                </th>
                <th>
                    <a href="{{ route('tasks.index', array_merge(request()->all(), ['sort_by' => 'completed', 'sort_direction' => request()->sort_direction == 'asc' ? 'desc' : 'asc'])) }}" class="text-light">
                        Completed
                        <i class="fas fa-sort{{ request()->sort_by == 'completed' ? (request()->sort_direction == 'asc' ? '-up' : '-down') : '' }}"></i>
                    </a>
                </th>
                <th width="280px">Action</th>
            </tr>
        </thead>
        <tbody>
            @php $i = 0; @endphp
            @foreach ($tasks as $task)
            <tr>
                <td>{{ ++$i }}</td>
                <td>{{ $task->title }}</td>
                <td>{{ $task->order }}</td>
                <td>{{ $task->completed ? 'Yes' : 'No' }}</td>
                <td>
                    <form action="{{ route('tasks.destroy', $task->id) }}" method="POST">
                        <a class="btn btn-info" href="{{ route('tasks.show', $task->id) }}">Show</a>
                        <a class="btn btn-primary" href="{{ route('tasks.edit', $task->id) }}">Edit</a>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
