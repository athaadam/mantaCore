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
    //mengambil semua invoices yang memiliki relasi dengan company yang sama dengan user yang login
    /* ───── GET ALL ───── */
    public function getAllInvoices(Request $request): JsonResponse
    {
        $user = $request->user();
        $invoices = Invoice::with(['user', 'company', 'costumer', 'items.item'])
            ->where('companyID', $user->companyID)
            ->get();
        return response()->json([
            'message' => 'Invoices fetched successfully',
            'invoices' => $invoices,
        ]);
    }
    

    /* ───── GET BY ID ───── */
    public function getInvoiceById(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $invoice = Invoice::with(['user','company','costumer','items.item'])
            ->where('companyID', $user->companyID)
            ->find($id);

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
            'amount'       => 'required|numeric|min:0',
            'items'                  => 'required|array|min:1',
            'items.*.itemID'         => 'required|exists:items,itemID',
            'items.*.type'           => 'nullable|string|max:255',
            'items.*.quantity'       => 'required|integer|min:1',
            'items.*.unitPrice'      => 'required|numeric|min:0',
            'items.*.subTotal'       => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $invoiceID = $this->generateInvoiceID($validated['companyID']);

            $invoice = Invoice::create([
                'invoiceID'  => $invoiceID,
                'userID'     => $validated['userID'],
                'companyID'  => $validated['companyID'],
                'costumerID' => $validated['costumerID'],
                'date'       => $validated['date'],
                'amount'     => $validated['amount'],
            ]);

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
                    'invoiceID' => $invoiceID,
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
                'invoice' => $invoice->load('items.item'),
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create invoice',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    private function generateInvoiceID(string $companyID): string
    {
        $company = \App\Models\Company::find($companyID);

        if (!$company || !$company->companyCode) {
            throw new \Exception('Company code is required to generate Invoice ID.');
        }

        $prefix = 'INV-' . strtoupper($company->companyCode) . '-';

        $count = \App\Models\Invoice::where('companyID', $companyID)
            ->where('invoiceID', 'like', $prefix . '%')
            ->count() + 1;

        return $prefix . str_pad($count, 3, '0', STR_PAD_LEFT);
    }


    /* ───── UPDATE ───── */
    public function updateInvoice(Request $request, string $id): JsonResponse
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
    public function deleteInvoice(string $id): JsonResponse
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

    

    public function getMyInvoices(Request $request): JsonResponse
    {
        // Ambil semua purchase yang dibuat oleh user yang sedang login
        $invoices = Invoice::with(['user', 'company', 'items.item'])
            ->where('userID', $request->user()->userID) // Ubah dari companyID ke userID
            ->get();

        return response()->json([
            'message' => $invoices->isEmpty() ? 'No purchases available' : 'My purchases retrieved successfully',
            'invoices' => $invoices,
        ]);
    }


    //filter invoice from date untill
    public function filterInvoices(Request $request): JsonResponse
    {
        $user = $request->user(); // Ambil user yang sedang login
        $startInput  = $request->input('start') ?? $request->query('start');
        $endInput    = $request->input('end') ?? $request->query('end');
        $category    = $request->input('category') ?? $request->query('category');
        $suitorID    = $request->input('suitor') ?? $request->query('suitor');

        $start = $startInput
            ? \Carbon\Carbon::parse($startInput)->startOfDay()
            : now()->subDays(30)->startOfDay();

        $end = $endInput
            ? \Carbon\Carbon::parse($endInput)->endOfDay()
            : now()->endOfDay();

        if ($end->lt($start)) {
            return response()->json([
                'message' => 'End date must be after or equal to start date'
            ], 422);
        }

        $query = Invoice::with(['user', 'company', 'costumer', 'items.item'])
            ->where('companyID', $user->companyID) // Filter hanya company user login
            ->whereBetween('date', [$start, $end]);

        // 🔍 Filter suitor jika ada
        if ($suitorID) {
            $query->where('userID', $suitorID);
        }

        // 🔍 Filter kategori item jika ada
        if ($category) {
            $query->whereHas('items.item', function ($q) use ($category) {
                $q->where('category', $category);
            });
        }

        $invoices = $query->get();

        return response()->json([
            'message' => 'Filtered invoices fetched successfully',
            'dateRange' => [
                'start' => $start->toDateString(),
                'end'   => $end->toDateString(),
            ],
            'filters' => [
                'category' => $category,
                'suitorID' => $suitorID,
            ],
            'invoices' => $invoices,
        ]);
    }


    public function salesReport(Request $request): JsonResponse
    {
        $user       = $request->user();
        $companyID  = $user->companyID;

        // Ambil start & end dari JSON body jika ada, jika tidak dari query string, jika tidak default 30 hari terakhir
        $startInput = $request->input('start') ?? $request->query('start');
        $endInput   = $request->input('end') ?? $request->query('end');

        $start = $startInput
            ? \Carbon\Carbon::parse($startInput)->startOfDay()
            : now()->subDays(30)->startOfDay();

        $end = $endInput
            ? \Carbon\Carbon::parse($endInput)->endOfDay()
            : now()->endOfDay();

        /* 1️⃣  Total Sales (sum amount) */
        $totalSales = Invoice::where('companyID', $companyID)
            ->whereBetween('date', [$start, $end])
            ->sum('amount');

        /* 2️⃣  Total Invoice (count) */
        $totalInvoice = Invoice::where('companyID', $companyID)
            ->whereBetween('date', [$start, $end])
            ->count();

        /* 3️⃣  Product Sold (total quantity terjual) */
        $productSold = InvoiceItem::whereHas('invoice', function ($q) use ($companyID, $start, $end) {
                $q->where('companyID', $companyID)
                ->whereBetween('date', [$start, $end]);
            })->sum('quantity');

        /* 4️⃣  Active Customer (distinct costumerID) */
        $activeCustomer = Invoice::where('companyID', $companyID)
            ->whereBetween('date', [$start, $end])
            ->distinct('costumerID')
            ->count('costumerID');

        /* 5️⃣  Top‑Sales Item (TOP 5) */
        $topSales = InvoiceItem::selectRaw(
                        'items.itemID,
                        items.name,
                        SUM(invoice_items.quantity) AS totalQuantity,
                        SUM(invoice_items.subTotal) AS totalSales'
                    )
                    ->join('items', 'items.itemID', '=', 'invoice_items.itemID')
                    ->join('invoices', 'invoices.invoiceID', '=', 'invoice_items.invoiceID')
                    ->where('invoices.companyID', $companyID)
                    ->whereBetween('invoices.date', [$start, $end])
                    ->groupBy('items.itemID', 'items.name')
                    ->orderByDesc('totalSales')
                    ->limit(5)
                    ->get();

        /* 6️⃣  Sales by Category (pie chart) */
        $salesByCategory = InvoiceItem::whereHas('invoice', function ($q) use ($companyID, $start, $end) {
                                    $q->where('companyID', $companyID)
                                    ->whereBetween('date', [$start, $end]);
                                })
                                ->with('item')
                                ->get()
                                ->groupBy(fn ($row) => $row->item->category ?? 'Uncategorized')
                                ->map(fn ($grp) => $grp->sum('subTotal'));

        /* ── RETURN ── */
        return response()->json([
            'dateRange'       => ['start' => $start->toDateString(), 'end' => $end->toDateString()],
            'totalSales'      => $totalSales,
            'totalInvoice'    => $totalInvoice,
            'productSold'     => $productSold,
            'activeCustomer'  => $activeCustomer,
            'topSales'        => $topSales,
            'salesByCategory' => $salesByCategory,
        ]);
    }
}
