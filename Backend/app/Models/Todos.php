<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'title',
        'order',
        'done'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
