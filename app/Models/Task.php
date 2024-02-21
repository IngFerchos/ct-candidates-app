<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (Task $task) {
            $last_order = \DB::table("tasks")->max("order");
            $task->order = $last_order ? $last_order+1: 1;
        });

        static::deleted(function (Task $task) {
            \DB::table("tasks")->where("order", ">", $task->order)
                ->update(['order' => \DB::raw('`order`-1')]);
        });
    }

    protected $fillable = [
        'title',
        'order',
        'complete'
    ];

    protected $casts = [
        'complete' => 'boolean'
    ];
}
