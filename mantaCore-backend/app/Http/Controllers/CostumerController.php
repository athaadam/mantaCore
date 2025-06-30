<?php

namespace App\Http\Controllers;

use App\Models\Costumer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CostumerController extends Controller
{
    public function index(): Response { return response(Costumer::all()); }

    public function store(Request $request): Response {
        $data = $request->validate(['username' => 'required|string|unique:costumers,username']);
        $costumer = Costumer::create($data);
        return response($costumer, 201);
    }

    public function show(Costumer $costumer): Response { return response($costumer); }

    public function update(Request $request, Costumer $costumer): Response {
        $data = $request->validate([
            'username' => 'sometimes|required|string|unique:costumers,username,' . $costumer->costumerID . ',costumerID',
        ]);
        $costumer->update($data);
        return response($costumer);
    }

    public function destroy(Costumer $costumer): Response {
        $costumer->delete();
        return response(null, 204);
    }
}