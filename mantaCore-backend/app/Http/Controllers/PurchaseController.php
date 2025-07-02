<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    /* ───── READ ───── */
    public function getAllPurchases(): JsonResponse
    {
        return response()->json(
            Purchase::with(['user', 'company', 'items.item'])->get()
        );
    }

    public function getPurchaseById(int $id): JsonResponse
    {
        $purchase = Purchase::with(['user','company','items.item'])->find($id);
        return $purchase
            ? response()->json($purchase)
            : response()->json(['message'=>'Purchase not found'], 404);
    }

    /* ───── CREATE ───── */
    public function createPurchase(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'userID'           => 'required|exists:users,userID',
            'companyID'        => 'required|exists:companies,companyID',
            'status'           => 'nullable|in:pending,accepted,denied',
            'date'             => 'required|date',
            'amount'           => 'required|numeric|min:0',
            'items'            => 'required|array|min:1',
            'items.*.itemID'   => 'required|exists:items,itemID',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unitPrice'=> 'required|numeric|min:0',
            'items.*.subTotal' => 'required|numeric|min:0',
            'items.*.type'     => 'nullable|string|max:255',
        ]);

        try {
            $purchase = DB::transaction(function () use ($validated) {

                /* header */
                $purchase = Purchase::create([
                    'userID'    => $validated['userID'],
                    'companyID' => $validated['companyID'],
                    'status'    => strtolower($validated['status'] ?? 'pending'),
                    'date'      => $validated['date'],
                    'amount'    => $validated['amount'],
                ]);

                /* detail & optional stok */
                foreach ($validated['items'] as $row) {
                    PurchaseItem::create([
                        'purchaseID'=> $purchase->purchaseID,
                        'itemID'    => $row['itemID'],
                        'quantity'  => $row['quantity'],
                        'unitPrice' => $row['unitPrice'],
                        'subTotal'  => $row['subTotal'],
                        'type'      => $row['type'] ?? null,
                    ]);

                    /* tambah stok kalau status accepted  */
                    if ($purchase->status === 'accepted') {
                        Item::lockForUpdate()->find($row['itemID'])
                            ->increment('stock', $row['quantity']);
                    }
                }

                return $purchase->load('items.item');
            });

            return response()->json([
                'message'  => 'Purchase created successfully',
                'purchase' => $purchase,
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Internal server error',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /* ───── UPDATE ───── */
    public function updatePurchase(Request $request, int $id): JsonResponse
    {
        $purchase = Purchase::with('items')->find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        $data = $request->validate([
            'status'              => 'nullable|in:pending,accepted,denied',
            'date'                => 'sometimes|date',
            'amount'              => 'nullable|numeric|min:0',
            'items'               => 'sometimes|array|min:1',
            'items.*.itemID'      => 'required_with:items|exists:items,itemID',
            'items.*.quantity'    => 'required_with:items|integer|min:1',
            'items.*.unitPrice'   => 'required_with:items|numeric|min:0',
            'items.*.type'        => 'nullable|string|max:255',
        ]);

        try {
            $result = DB::transaction(function () use ($purchase, $data) {

                $oldStatus = strtolower($purchase->status);
                $newStatus = strtolower($data['status'] ?? $oldStatus);

                /* -------- kembalikan stok lama kalau sebelumnya accepted -------- */
                if ($oldStatus === 'accepted') {
                    foreach ($purchase->items as $d) {
                        Item::lockForUpdate()->find($d->itemID)
                            ->decrement('stock', $d->quantity);
                    }
                }

                /* -------- update header -------- */
                $purchase->update([
                    'status' => $newStatus,
                    'date'   => $data['date']   ?? $purchase->date,
                    'amount' => $data['amount'] ?? $purchase->amount,
                ]);

                /* -------- ganti detail bila dikirim -------- */
                if (isset($data['items'])) {
                    PurchaseItem::where('purchaseID', $purchase->purchaseID)->delete();

                    foreach ($data['items'] as $row) {
                        PurchaseItem::create([
                            'purchaseID'=> $purchase->purchaseID,
                            'itemID'    => $row['itemID'],
                            'quantity'  => $row['quantity'],
                            'unitPrice' => $row['unitPrice'],
                            'subTotal'  => $row['quantity'] * $row['unitPrice'],
                            'type'      => $row['type'] ?? null,
                        ]);
                    }
                    // refresh relation
                    $purchase->load('items');
                }

                /* -------- tambahkan stok baru jika status setelah update accepted -------- */
                if ($newStatus === 'accepted') {
                    foreach ($purchase->items as $d) {
                        Item::lockForUpdate()->find($d->itemID)
                            ->increment('stock', $d->quantity);
                    }
                }

                return $purchase->load('items.item');
            });

            return response()->json([
                'message'  => 'Purchase updated',
                'purchase' => $result,
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Internal server error',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /* ───── DELETE ───── */
    public function deletePurchase(int $id): JsonResponse
    {
        $purchase = Purchase::with('items')->find($id);
        if (!$purchase) {
            return response()->json(['message' => 'Purchase not found'], 404);
        }

        DB::transaction(function () use ($purchase) {
            /* kembalikan stok bila accepted */
            if (strtolower($purchase->status) === 'accepted') {
                foreach ($purchase->items as $d) {
                    Item::lockForUpdate()->find($d->itemID)
                        ->decrement('stock', $d->quantity);
                }
            }

            PurchaseItem::where('purchaseID', $purchase->purchaseID)->delete();
            $purchase->delete();
        });

        return response()->json(['message' => 'Purchase deleted']);
    }
}
