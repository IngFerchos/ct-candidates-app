@extends('layouts.app')

@section('content')
    <input id="user_id" value="{{Auth::user()->id}}" name="user_id" type="hidden">
    <input id="user_name" value="{{Auth::user()->name}}" name="user_id" type="hidden">
    <div id="usertasks"></div>
<script src="{{ asset('js/app.js') }}" defer></script>        
@endsection
