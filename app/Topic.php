<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Topic extends Model
{
    //to allow modification of a table (creation, edition, etc)
    protected $fillable = ['name', 'slug'];

    public function posts():HasMany
    {
        return $this->hasMany(Post::class);
    }
}
