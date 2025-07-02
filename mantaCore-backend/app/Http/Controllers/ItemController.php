<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    // ✅ Get all items milik company user
    public function getAllItems(Request $request): Response
    {
        $companyID = $request->user()->companyID;

        $items = Item::where('companyID', $companyID)->get();
        return response($items, 200);
    }

    // ✅ Get item by ID (cek company juga)
    public function getItemById(Request $request, int $id): Response
    {
        $companyID = $request->user()->companyID;

        $item = Item::where('companyID', $companyID)->find($id);
        if (!$item) {
            return response(['message' => 'Item not found'], 404);
        }

        return response($item, 200);
    }

    // ✅ Create a new item dengan companyID
    public function createItem(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'        => 'required|string|max:255',
                'itemPrice'   => 'required|numeric|min:0',
                'category'    => 'nullable|string|max:255',
                'type'        => 'nullable|string|max:255',
                'units'       => 'nullable|string|max:50',
                'stock'       => 'nullable|integer|min:0',
            ]);

            $validated['stock'] = $validated['stock'] ?? 0;
            $validated['companyID'] = $request->user()->companyID;

            $item = Item::create($validated);

            return response()->json([
                'message' => 'Item created successfully',
                'item'    => $item
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Error occurred while creating item',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // ✅ Update item (cek apakah item milik company user)
    public function updateItem(Request $request, int $id): JsonResponse
    {
        $companyID = $request->user()->companyID;
        $item = Item::where('companyID', $companyID)->find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found or unauthorized'], 404);
        }

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'itemPrice'   => 'sometimes|required|numeric|min:0',
            'category'    => 'nullable|string|max:255',
            'type'        => 'nullable|string|max:255',
            'units'       => 'nullable|string|max:50',
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Item updated successfully',
            'item'    => $item
        ]);
    }

    // ✅ Delete item (cek ownership)
    public function deleteItem(Request $request, int $id): JsonResponse
    {
        $companyID = $request->user()->companyID;
        $item = Item::where('companyID', $companyID)->find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found or unauthorized'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
