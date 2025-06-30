<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use App\Models\Invoice;
use App\Models\Item;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvoiceController extends Controller
{
    //get all invoices
    public function getAllInvoices(): JsonResponse // perbaikan tipe return
    {
        $invoices = Invoice::all();
        return response()->json($invoices);
    }

    //get invoice by id
    public function getInvoiceById(int $id): JsonResponse
    {
        $invoice = Invoice::with(['user', 'company', 'costumer', 'items.item'])->find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        return response()->json([
            'message' => 'Invoice fetched successfully',
            'invoice' => $invoice
        ]);
    }


    //create a new invoice
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

        // Buat invoice utama
        $invoice = Invoice::create([
            'userID'     => $validated['userID'],
            'companyID'  => $validated['companyID'],
            'costumerID' => $validated['costumerID'],
            'date'       => $validated['date'],
            'amount'     => $validated['amount'],
        ]);

        // Simpan item-item invoice
        foreach ($validated['items'] as $item) {
            // Cek apakah itemID valid (meskipun sudah divalidasi Laravel, ini jaga-jaga tambahan)
            $itemExists = \App\Models\Item::find($item['itemID']);
            if (!$itemExists) {
                return response()->json([
                    'message' => 'Item with ID ' . $item['itemID'] . ' not found'
                ], 404);
            }

            InvoiceItem::create([
                'invoiceID'  => $invoice->invoiceID,
                'itemID'     => $item['itemID'],
                'type'       => $item['type'] ?? null,
                'quantity'   => $item['quantity'],
                'unitPrice'  => $item['unitPrice'],
                'subTotal'   => $item['subTotal'],
            ]);
        }

        return response()->json([
            'message' => 'Invoice and items created successfully',
            'invoice' => $invoice->load('items')  // supaya langsung nampilin item-item-nya juga
        ], 201);
    }


    //update invoice by id
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

        // Update invoice data
        $invoice->update([
            'userID'     => $validated['userID']     ?? $invoice->userID,
            'companyID'  => $validated['companyID']  ?? $invoice->companyID,
            'costumerID' => $validated['costumerID'] ?? $invoice->costumerID,
            'date'       => $validated['date']       ?? $invoice->date,
            'amount'     => $validated['amount']     ?? $invoice->amount,
        ]);

        // Update item jika dikirim
        if (isset($validated['items'])) {
            InvoiceItem::where('invoiceID', $invoice->invoiceID)->delete();

            foreach ($validated['items'] as $item) {
                // Cek apakah itemID valid (meskipun sudah divalidasi Laravel, ini jaga-jaga tambahan)
                $itemExists = \App\Models\Item::find($item['itemID']);
                if (!$itemExists) {
                    return response()->json([
                        'message' => 'Item with ID ' . $item['itemID'] . ' not found'
                    ], 404);
                }

                InvoiceItem::create([
                    'invoiceID'  => $invoice->invoiceID,
                    'itemID'     => $item['itemID'],
                    'type'       => $item['type'] ?? null,
                    'quantity'   => $item['quantity'],
                    'unitPrice'  => $item['unitPrice'],
                    'subTotal'   => $item['subTotal'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Invoice updated successfully',
            'invoice' => $invoice->load('items')
        ]);
    }

    //delete invoice by id
    public function deleteInvoice(int $id): JsonResponse
    {
        $invoice = Invoice::find($id);
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        // Hapus item-item invoice dulu
        InvoiceItem::where('invoiceID', $invoice->invoiceID)->delete();

        // Hapus invoice-nya
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }


}