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
    //get all purchases yang company id nya sama dengan user yang login
    public function getAllPurchases(Request $request): JsonResponse
    {
        $user = $request->user();
        $purchases = Purchase::with(['user', 'company', 'items.item'])
            ->where('companyID', $user->companyID)
            ->get();   
        return response()->json($purchases);
    }

    public function getPurchaseById(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $purchase = Purchase::with(['user','company','items.item'])
            ->where('companyID', $user->companyID)
            ->find($id);

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

                // 🧠 Generate custom ID seperti PR-MANMAN-001
                $purchaseID = $this->generatePurchaseID($validated['companyID']);

                /* ── simpan header ── */
                $purchase = Purchase::create([
                    'purchaseID' => $purchaseID,
                    'userID'     => $validated['userID'],
                    'companyID'  => $validated['companyID'],
                    'status'     => 'pending',
                    'date'       => $validated['date'],
                    'amount'     => $validated['amount'],
                ]);

                /* ── simpan tiap item ── */
                foreach ($validated['items'] as $row) {
                    PurchaseItem::create([
                        'purchaseID' => $purchase->purchaseID,
                        'itemID'     => $row['itemID'],
                        'quantity'   => $row['quantity'],
                        'unitPrice'  => $row['unitPrice'],
                        'subTotal'   => $row['subTotal'],
                        'type'       => $row['type'] ?? null,

                    ]);
                }

                return $purchase->load('items.item', 'user', 'company');
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

    private function generatePurchaseID(string $companyID): string
    {
        $company = \App\Models\Company::find($companyID);

        if (!$company || !$company->companyCode) {
            throw new \Exception('Company code is required to generate Purchase ID.');
        }

        $prefix = 'PR-' . strtoupper($company->companyCode) . '-';

        $count = \App\Models\Purchase::where('companyID', $companyID)
            ->where('purchaseID', 'like', $prefix . '%')
            ->count() + 1;

        return $prefix . str_pad($count, 3, '0', STR_PAD_LEFT);
    }


    /* ───── UPDATE ───── */
    public function updatePurchase(Request $request, string $id): JsonResponse
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
            'items.*.subTotal'    => 'required_with:items|numeric|min:0',
            'items.*.type'        => 'nullable|string|max:255',
        ]);

        try {
            $result = DB::transaction(function () use ($purchase, $data) {

                $oldStatus = strtolower($purchase->status);
                $newStatus = strtolower($data['status'] ?? $oldStatus);

                // 1. 🧼 Kembalikan stok lama jika status sebelumnya accepted
                if ($oldStatus === 'accepted') {
                    foreach ($purchase->items as $oldItem) {
                        if (isset($oldItem->type) && strtolower($oldItem->type) !== 'sales') {
                            Item::lockForUpdate()->find($oldItem->itemID)
                                ->decrement('stock', $oldItem->quantity);
                        }
                    }
                }

                // 2. 🔄 Update data utama (status, tanggal, jumlah)
                $purchase->update([
                    'status' => $newStatus,
                    'date'   => $data['date']   ?? $purchase->date,
                    'amount' => $data['amount'] ?? $purchase->amount,
                ]);

                // 3. 🔁 Ganti semua item jika dikirim ulang
                if (isset($data['items'])) {
                    PurchaseItem::where('purchaseID', $purchase->purchaseID)->delete();

                    foreach ($data['items'] as $row) {
                        PurchaseItem::create([
                            'purchaseID' => $purchase->purchaseID,
                            'itemID'     => $row['itemID'],
                            'quantity'   => $row['quantity'],
                            'unitPrice'  => $row['unitPrice'],
                            'subTotal'   => $row['subTotal'],
                            'type'       => $row['type'] ?? null,
                        ]);
                    }

                    // Refresh items relasi
                    $purchase->load('items');
                }

                // 4. ➕ Tambahkan stok baru jika status sekarang accepted
                if ($newStatus === 'accepted') {
                    foreach ($purchase->items as $newItem) {
                        if (isset($newItem->type) && strtolower($newItem->type) === 'sales') {
                            Item::lockForUpdate()->find($newItem->itemID)
                                ->increment('stock', $newItem->quantity);
                        }

                    }
                }

                return $purchase->load('items.item');
            });

            return response()->json([
                'message'  => 'Purchase updated successfully',
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
    public function deletePurchase(string $id): JsonResponse
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

    //getmypurchases
    public function getMyPurchases(Request $request): JsonResponse
    {
        //cek jika purchase yang saya buat kosong
        $purchases = Purchase::with(['user', 'company', 'items.item'])
            ->where('companyID', $request->user()->companyID)
            ->get();

        return response()->json([
            'message' => $purchases->isEmpty() ? 'No purchases available' : 'My purchases retrieved successfully',
            'purchases' => $purchases,
        ]);
    }

}