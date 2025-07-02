<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;   // ← transaksi DB
use Illuminate\Http\Response;

class InvoiceController extends Controller
{
    /* ───── GET ALL ───── */
    public function getAllInvoices(): JsonResponse
    {
        return response()->json(Invoice::all());
    }

    /* ───── GET BY ID ───── */
    public function getInvoiceById(int $id): JsonResponse
    {
        $invoice = Invoice::with(['user','company','costumer','items.item'])->find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        return response()->json([
            'message' => 'Invoice fetched successfully',
            'invoice' => $invoice,
        ]);
    }

    /* ───── CREATE ───── */
    public function createInvoice(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'userID'       => 'required|exists:users,userID',
            'companyID'    => 'required|exists:companies,companyID',
            'costumerID'   => 'required|exists:costumers,costumerID',
            'date'         => 'required|date',
            'amount'       => 'required|numeric',
            'items'                  => 'required|array|min:1',
            'items.*.itemID'         => 'required|exists:items,itemID',
            'items.*.type'           => 'nullable|string|max:255',
            'items.*.quantity'       => 'required|integer|min:1',
            'items.*.unitPrice'      => 'required|numeric|min:0',
            'items.*.subTotal'       => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            /* ― buat invoice utama ― */
            $invoice = Invoice::create([
                'userID'     => $validated['userID'],
                'companyID'  => $validated['companyID'],
                'costumerID' => $validated['costumerID'],
                'date'       => $validated['date'],
                'amount'     => $validated['amount'],
            ]);

            /* ― proses tiap item ― */
            foreach ($validated['items'] as $row) {
                $itm = Item::lockForUpdate()->find($row['itemID']);   // lock dulu

                if ($itm->stock < $row['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'message' => "Insufficient stock for item {$itm->name} (ID {$itm->itemID})"
                    ], 422);
                }

                /* kurangi stok & simpan detail */
                $itm->decrement('stock', $row['quantity']);

                InvoiceItem::create([
                    'invoiceID' => $invoice->invoiceID,
                    'itemID'    => $row['itemID'],
                    'type'      => $row['type']      ?? null,
                    'quantity'  => $row['quantity'],
                    'unitPrice' => $row['unitPrice'],
                    'subTotal'  => $row['subTotal'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Invoice and items created successfully',
                'invoice' => $invoice->load('items'),
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create invoice',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /* ───── UPDATE ───── */
    public function updateInvoice(Request $request, int $id): JsonResponse
    {
        $invoice = Invoice::find($id);
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        $validated = $request->validate([
            'userID'       => 'sometimes|exists:users,userID',
            'companyID'    => 'sometimes|exists:companies,companyID',
            'costumerID'   => 'sometimes|exists:costumers,costumerID',
            'date'         => 'sometimes|date',
            'amount'       => 'sometimes|numeric',
            'items'                   => 'sometimes|array|min:1',
            'items.*.itemID'          => 'sometimes|exists:items,itemID',
            'items.*.type'            => 'nullable|string|max:255',
            'items.*.quantity'        => 'sometimes|integer|min:1',
            'items.*.unitPrice'       => 'sometimes|numeric|min:0',
            'items.*.subTotal'        => 'sometimes|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            /* ― kembalikan stok lama ― */
            foreach ($invoice->items as $old) {
                Item::lockForUpdate()->find($old->itemID)
                    ->increment('stock', $old->quantity);
            }

            /* ― hapus detail lama ― */
            InvoiceItem::where('invoiceID', $invoice->invoiceID)->delete();

            /* ― update header ― */
            $invoice->update([
                'userID'     => $validated['userID']     ?? $invoice->userID,
                'companyID'  => $validated['companyID']  ?? $invoice->companyID,
                'costumerID' => $validated['costumerID'] ?? $invoice->costumerID,
                'date'       => $validated['date']       ?? $invoice->date,
                'amount'     => $validated['amount']     ?? $invoice->amount,
            ]);

            /* ― simpan detail baru (+ atur stok) ― */
            if (isset($validated['items'])) {
                foreach ($validated['items'] as $row) {
                    $itm = Item::lockForUpdate()->find($row['itemID']);

                    if ($itm->stock < $row['quantity']) {
                        DB::rollBack();
                        return response()->json([
                            'message' => "Insufficient stock for item {$itm->name} (ID {$itm->itemID})"
                        ], 422);
                    }

                    $itm->decrement('stock', $row['quantity']);

                    InvoiceItem::create([
                        'invoiceID' => $invoice->invoiceID,
                        'itemID'    => $row['itemID'],
                        'type'      => $row['type']      ?? null,
                        'quantity'  => $row['quantity'],
                        'unitPrice' => $row['unitPrice'],
                        'subTotal'  => $row['subTotal'],
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Invoice updated successfully',
                'invoice' => $invoice->load('items'),
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update invoice',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /* ───── DELETE ───── */
    public function deleteInvoice(int $id): JsonResponse
    {
        $invoice = Invoice::with('items')->find($id);
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        try {
            DB::beginTransaction();

            /* ― kembalikan stok ― */
            foreach ($invoice->items as $row) {
                Item::lockForUpdate()->find($row->itemID)
                    ->increment('stock', $row->quantity);
            }

            /* ― hapus detail & header ― */
            InvoiceItem::where('invoiceID', $invoice->invoiceID)->delete();
            $invoice->delete();

            DB::commit();

            return response()->json(['message' => 'Invoice deleted successfully']);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to delete invoice',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
