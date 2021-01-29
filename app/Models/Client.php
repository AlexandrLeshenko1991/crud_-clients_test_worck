<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Client extends Model
{
    use HasFactory, Filterable;

    protected $table = 'clients';

    protected $guarded = [];
}
