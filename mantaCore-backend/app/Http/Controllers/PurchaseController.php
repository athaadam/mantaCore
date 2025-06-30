<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\PurchaseItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    // GET /api/purchases
    public function getAllPurchases(): JsonResponse
    {
        return response()->json(
            Purchase::with(['user', 'company', 'items.item'])->get()
        );
    }

    // GET /api/purchases/{id}
    public function getPurchaseById(int $id): JsonResponse
    {
        $purchase = Purchase::with(['user', 'company', 'items.item'])->find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }
        return response()->json($purchase);
    }

    // POST /api/purchases
    public function createPurchase(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'userID'     => 'required|exists:users,userID',
                'companyID'  => 'required|exists:companies,companyID',
                'status'     => 'nullable|string|max:100',
                'date'       => 'required|date',
                'amount'     => 'required|numeric|min:0',
                'items'                => 'required|array|min:1',
                'items.*.itemID'       => 'required|exists:items,itemID',
                'items.*.quantity'     => 'required|integer|min:1',
                'items.*.unitPrice'    => 'required|numeric|min:0',
                'items.*.subTotal'     => 'required|numeric|min:0',
                'items.*.type'         => 'nullable|string|max:255',
            ]);

            $purchase = DB::transaction(function () use ($validated) {
                $purchase = Purchase::create([
                    'userID'    => $validated['userID'],
                    'companyID' => $validated['companyID'],
                    'status'    => $validated['status'] ?? "Pending",
                    'date'      => $validated['date'],
                    'amount'    => $validated['amount'],
                ]);

                foreach ($validated['items'] as $item) {
                    PurchaseItem::create([
                        'purchaseID' => $purchase->purchaseID,
                        'itemID'     => $item['itemID'],
                        'quantity'   => $item['quantity'],
                        'unitPrice'  => $item['unitPrice'],
                        'subTotal'   => $item['subTotal'],
                        'type'       => $item['type'] ?? null,
                    ]);
                }

                return $purchase->load('items');
            });

            return response()->json([
                'message' => 'Purchase created successfully',
                'purchase' => $purchase
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Internal server error',
                'error'   => $e->getMessage(),
                'trace'   => $e->getTrace()[0] ?? null,
            ], 500);
        }
    }

    // PUT /api/purchases/{id}
    public function updatePurchase(Request $request, int $id): JsonResponse
    {
        $purchase = Purchase::find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        $data = $request->validate([
            'status'              => 'nullable|string|max:100',
            'date'                => 'sometimes|date',
            'amount'              => 'nullable|numeric|min:0',
            'items'               => 'sometimes|array|min:1',
            'items.*.itemID'      => 'required_with:items|exists:items,itemID',
            'items.*.quantity'    => 'required_with:items|integer|min:1',
            'items.*.unitPrice'   => 'required_with:items|numeric|min:0',
            'items.*.type'        => 'nullable|string|max:255',
        ]);

        $purchase = DB::transaction(function () use ($purchase, $data) {
            $purchase->update([
                'status' => $data['status'] ?? $purchase->status,
                'date'   => $data['date']   ?? $purchase->date,
                'amount' => $data['amount'] ?? $purchase->amount,
            ]);

            if (isset($data['items'])) {
                PurchaseItem::where('purchaseID', $purchase->purchaseID)->delete();

                foreach ($data['items'] as $it) {
                    PurchaseItem::create([
                        'purchaseID' => $purchase->purchaseID,
                        'itemID'     => $it['itemID'],
                        'quantity'   => $it['quantity'],
                        'unitPrice'  => $it['unitPrice'],
                        'subTotal'   => $it['quantity'] * $it['unitPrice'],
                        'type'       => $it['type'] ?? null,
                    ]);
                }
            }

            return $purchase->load(['items.item']);
        });

        return response()->json([
            'message'  => 'Purchase updated',
            'purchase' => $purchase
        ]);
    }

    // DELETE /api/purchases/{id}
    public function deletePurchase(int $id): JsonResponse
    {
        $purchase = Purchase::find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        DB::transaction(function () use ($purchase) {
            PurchaseItem::where('purchaseID', $purchase->purchaseID)->delete();
            $purchase->delete();
        });

        return response()->json(['message' => 'Purchase deleted']);
    }
}