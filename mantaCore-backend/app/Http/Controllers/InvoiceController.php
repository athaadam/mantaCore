<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvoiceController extends Controller
{
    public function index(): Response { return response(Invoice::with(['user','company','costumer','items'])->get()); }

    public function store(Request $request): Response {
        $data = $request->validate([
            'userID'     => 'required|exists:users,userID',
            'companyID'  => 'required|exists:companies,companyID',
            'costumerID' => 'required|exists:costumers,costumerID',
            'date'       => 'required|date',
            'amount'     => 'required|numeric',
        ]);
        $invoice = Invoice::create($data);
        return response($invoice->load(['user','company','costumer','items']), 201);
    }

    public function show(Invoice $invoice): Response { return response($invoice->load(['user','company','costumer','items'])); }

    public function update(Request $request, Invoice $invoice): Response {
        $data = $request->validate([
            'userID'     => 'sometimes|required|exists:users,userID',
            'companyID'  => 'sometimes|required|exists:companies,companyID',
            'costumerID' => 'sometimes|required|exists:costumers,costumerID',
            'date'       => 'sometimes|required|date',
            'amount'     => 'sometimes|required|numeric',
        ]);
        $invoice->update($data);
        return response($invoice->load(['user','company','costumer','items']));
    }

    public function destroy(Invoice $invoice): Response { $invoice->delete(); return response(null, 204); }
}