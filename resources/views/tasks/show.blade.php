<!-- resources/views/tasks/show.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h2 class="my-4">Show Task</h2>
        </div>
        <div class="col-lg-12">
            <a class="btn btn-primary mb-3" href="{{ route('tasks.index') }}"> Back</a>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mb-3">
            <div class="form-group">
                <strong>Title:</strong>
                {{ $task->title }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 mb-3">
            <div class="form-group">
                <strong>Order:</strong>
                {{ $task->order }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 mb-3">
            <div class="form-group">
                <strong>Completed:</strong>
                {{ $task->completed ? 'Yes' : 'No' }}
            </div>
        </div>
    </div>
</div>
@endsection
