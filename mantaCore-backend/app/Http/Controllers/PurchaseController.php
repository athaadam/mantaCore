<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PurchaseController extends Controller
{
    public function index(): Response
    {
        return response(Purchase::with(['user','company','items'])->get());
    }

    public function store(Request $request): Response
    {
        $data = $request->validate([
            'userID'    => 'required|exists:users,userID',
            'companyID' => 'required|exists:companies,companyID',
            'status'    => 'required|string',
            'date'      => 'required|date',
            'amount'    => 'required|numeric',
        ]);

        $purchase = Purchase::create($data);
        return response($purchase->load(['user','company','items']), 201);
    }

    public function show(Purchase $purchase): Response
    {
        return response($purchase->load(['user','company','items']));
    }

    public function update(Request $request, Purchase $purchase): Response
    {
        $data = $request->validate([
            'userID'    => 'sometimes|required|exists:users,userID',
            'companyID' => 'sometimes|required|exists:companies,companyID',
            'status'    => 'sometimes|required|string',
            'date'      => 'sometimes|required|date',
            'amount'    => 'sometimes|required|numeric',
        ]);

        $purchase->update($data);
        return response($purchase->load(['user','company','items']));
    }

    public function destroy(Purchase $purchase): Response
    {
        $purchase->delete();
        return response(null, 204);
    }
}