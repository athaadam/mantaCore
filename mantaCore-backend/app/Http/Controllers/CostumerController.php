<?php

namespace App\Http\Controllers;

use App\Models\Costumer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CostumerController extends Controller
{
    // ✅ GET: Semua costumer
    public function getAllCostumers(): JsonResponse
    {
        $costumers = Costumer::all();
        return response()->json($costumers);
    }

    // ✅ GET: Costumer by ID
    public function getCostumerById(int $id): JsonResponse
    {
        $costumer = Costumer::find($id);

        if (!$costumer) {
            return response()->json(['message' => 'Costumer not found'], 404);
        }

        return response()->json($costumer);
    }

    // ✅ POST: Tambah costumer baru
    public function createCostumer(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:costumers,username',
        ]);

        $costumer = Costumer::create($validated);

        return response()->json([
            'message'  => 'Costumer created successfully',
            'costumer' => $costumer,
        ], 201);
    }

    // ✅ PUT: Update costumer
    public function updateCostumer(Request $request, int $id): JsonResponse
    {
        $costumer = Costumer::find($id);
        if (!$costumer) {
            return response()->json(['message' => 'Costumer not found'], 404);
        }

        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:costumers,username,' . $id . ',costumerID',
        ]);

        $costumer->update($validated);

        return response()->json([
            'message'  => 'Costumer updated successfully',
            'costumer' => $costumer,
        ]);
    }

    // ✅ DELETE: Hapus costumer
    public function deleteCostumer(int $id): JsonResponse
    {
        $costumer = Costumer::find($id);
        if (!$costumer) {
            return response()->json(['message' => 'Costumer not found'], 404);
        }

        $costumer->delete();

        return response()->json(['message' => 'Costumer deleted successfully']);
    }
}
