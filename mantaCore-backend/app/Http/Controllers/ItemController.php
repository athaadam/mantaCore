<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    public function index(): Response { return response(Item::all()); }

    public function store(Request $request): Response {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'itemPrice'   => 'required|numeric',
            'category'    => 'nullable|string',
            'type'        => 'nullable|string',
            'units'       => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        $item = Item::create($data);
        return response($item, 201);
    }

    public function show(Item $item): Response { return response($item); }

    public function update(Request $request, Item $item): Response {
        $data = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'itemPrice'   => 'sometimes|required|numeric',
            'category'    => 'nullable|string',
            'type'        => 'nullable|string',
            'units'       => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        $item->update($data);
        return response($item);
    }

    public function destroy(Item $item): Response {
        $item->delete();
        return response(null, 204);
    }
}