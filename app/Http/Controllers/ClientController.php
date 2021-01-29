<?php

namespace App\Http\Controllers;

use App\Filters\ClientFilters;
use App\Http\Requests\ClientRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    protected $defalt_per_page = 17;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('json.response');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param ClientFilters $filters
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, ClientFilters $filters): \Illuminate\Http\JsonResponse
    {
        $per_page = $request->get('per_page', $this->defalt_per_page);
        $clients = Client::filter($filters)->paginate($per_page);
        return response()->json($clients);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $response = array('response' => '', 'success'=>false);
        $validator = \Validator::make($request->all(), $this->getRulesValidation($request->method()));
        if ($validator->fails()) {
            $response['response'] = $validator->messages();
        }else{
            $client = Client::findOrFail($id);
            $client->fill($request->except(['id']));
            $client->save();
            $response['response'] = $client;
            $response['success'] = true;
        }
        return $response;
    }


    protected function getRulesValidation($method)
    {
        $rules = [
            'name' => 'required|string',
            'last_name' => 'required|string',
            'profession' => 'required|string',
            'age' => 'numeric|required|min:12|max:74',
        ];

        switch ($method)
        {
            case 'POST':
                return $rules;
            case 'PUT':
                return [
                        'id' => 'required|integer|exists:clients,id',
                    ] + $rules;
            // case 'PATCH':
            case 'DELETE':
                return [
                    'id' => 'required|integer|exists:clients,id'
                ];
            default: [];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response = array('response' => '', 'success'=>false);

        $client = Client::findOrFail($id);
        if($client->delete()){
            $response['response'] = ['id' => $id];
            $response['success'] = true;
        }

        return $response;
    }
}
