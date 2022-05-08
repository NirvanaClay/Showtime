<?php

namespace App\Models;

use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    public $timestamps = false;
    public $fillable = ['title', 'image_url', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
