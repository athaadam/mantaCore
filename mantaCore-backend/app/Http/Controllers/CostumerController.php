<?php

namespace App\Http\Controllers;

use App\Models\Costumer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CostumerController extends Controller
{
    // ✅ GET: Semua costumer yang company id nya sama dengan user yang login
    public function getAllCostumers(Request $request): JsonResponse
    {
        $user = $request->user();   
        $costumers = Costumer::where('companyID', $user->companyID)->get();
        return response()->json($costumers);
    }

    // ✅ GET: Costumer by ID tapi dicek dlu apakah costumer tersebut ada relasi dengan company yang sama dengan user yang login
    public function getCostumerById(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $costumer = Costumer::where('companyID', $user->companyID)->find($id);

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

}
