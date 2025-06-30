<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    // Get all items
    public function getAllItems(): Response
    {
        $items = Item::all();
        return response($items, 200);
    }

    // Get item by ID
    public function getItemById(int $id): Response
    {
        $item = Item::find($id);
        if (!$item) {
            return response(['message' => 'Item not found'], 404);
        }
        return response($item, 200);
    }

    // Create a new item
    public function createItem(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'        => 'required|string|max:255',
                'itemPrice'   => 'required|numeric|min:0',
                'category'    => 'nullable|string|max:255',
                'type'        => 'nullable|string|max:255',
                'units'       => 'nullable|string|max:50',
                'description' => 'nullable|string',
            ]);

            $item = Item::create($validated);

            return response()->json([
                'message' => 'Item created successfully',
                'item'    => $item
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Error occurred while creating item',
                'error'   => $e->getMessage(),
                // uncomment di debugging lokal:
                // 'trace'   => $e->getTrace()
            ], 500);
        }
    }

    // Update an existing item
    public function updateItem(Request $request, int $id): JsonResponse
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'itemPrice'   => 'sometimes|required|numeric|min:0',
            'category'    => 'nullable|string|max:255',
            'type'        => 'nullable|string|max:255',
            'units'       => 'nullable|string|max:50',
            'description' => 'nullable|string',
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Item updated successfully',
            'item'    => $item
        ]);
    }

    // Delete an item
    public function deleteItem(int $id): JsonResponse
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
