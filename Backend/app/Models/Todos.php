<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo((User::class));
    }
    public $timestamps = true;
    protected $fillable = [
        'title',
        'order',
        'done',
        'user_id'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
