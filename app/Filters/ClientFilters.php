<?php
namespace App\Filters;
use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ClientFilters extends QueryFilters
{
    protected $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
        parent::__construct($request);
    }

    public function name($term) {
        return $this->builder->where('name', 'LIKE', "$term%");
    }

    public function sort_name($type = null) {
        return $this->builder->orderBy('name', (!$type || $type == 'asc') ? 'desc' : 'asc');
    }
}
