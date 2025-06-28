<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvoiceItemController extends Controller
{
    public function index(): Response { return response(InvoiceItem::with(['invoice','item'])->get()); }

    public function store(Request $request): Response {
        $data = $request->validate([
            'invoiceID' => 'required|exists:invoices,invoiceID',
            'itemID'    => 'required|exists:items,itemID',
            'type'      => 'nullable|string',
            'quantity'  => 'required|integer',
            'unitPrice' => 'required|numeric',
            'subTotal'  => 'required|numeric',
        ]);
        $invoiceItem = InvoiceItem::create($data);
        return response($invoiceItem->load(['invoice','item']), 201);
    }

    public function show(InvoiceItem $invoiceItem): Response { return response($invoiceItem->load(['invoice','item'])); }

    public function update(Request $request, InvoiceItem $invoiceItem): Response {
        $data = $request->validate([
            'invoiceID' => 'sometimes|required|exists:invoices,invoiceID',
            'itemID'    => 'sometimes|required|exists:items,itemID',
            'type'      => 'nullable|string',
            'quantity'  => 'sometimes|required|integer',
            'unitPrice' => 'sometimes|required|numeric',
            'subTotal'  => 'sometimes|required|numeric',
        ]);
        $invoiceItem->update($data);
        return response($invoiceItem->load(['invoice','item']));
    }

    public function destroy(InvoiceItem $invoiceItem): Response { $invoiceItem->delete(); return response(null, 204); }
}