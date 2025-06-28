<?php

namespace App\Http\Controllers;

use App\Models\PurchaseItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PurchaseItemController extends Controller
{
    public function index(): Response
    {
        return response(PurchaseItem::with(['purchase','item'])->get());
    }

    public function store(Request $request): Response
    {
        $data = $request->validate([
            'purchaseID' => 'required|exists:purchases,purchaseID',
            'itemID'     => 'required|exists:items,itemID',
            'type'       => 'nullable|string',
            'quantity'   => 'required|integer',
            'unitPrice'  => 'required|numeric',
            'subTotal'   => 'required|numeric',
        ]);

        $purchaseItem = PurchaseItem::create($data);
        return response($purchaseItem->load(['purchase','item']), 201);
    }

    public function show(PurchaseItem $purchaseItem): Response
    {
        return response($purchaseItem->load(['purchase','item']));
    }

    public function update(Request $request, PurchaseItem $purchaseItem): Response
    {
        $data = $request->validate([
            'purchaseID' => 'sometimes|required|exists:purchases,purchaseID',
            'itemID'     => 'sometimes|required|exists:items,itemID',
            'type'       => 'nullable|string',
            'quantity'   => 'sometimes|required|integer',
            'unitPrice'  => 'sometimes|required|numeric',
            'subTotal'   => 'sometimes|required|numeric',
        ]);

        $purchaseItem->update($data);
        return response($purchaseItem->load(['purchase','item']));
    }

    public function destroy(PurchaseItem $purchaseItem): Response
    {
        $purchaseItem->delete();
        return response(null, 204);
    }
}
