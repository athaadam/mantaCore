<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InvoiceItem;
use App\Models\Invoice;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //total semua amount dalam invoices
    public function totalPenjualan(Request $request)
{
    $user = $request->user();

    // Total penjualan semua invoice dalam 1 company
    $totalSales = \App\Models\Invoice::where('companyID', $user->companyID)
        ->sum('amount');

    return response()->json([
        'totalSales' => $totalSales,
    ]);
}
    

    /** Profit & loss hari ini */
    public function todayProfitLoss(Request $request)
    {
        $user   = $request->user();
        $today  = now()->toDateString();         // YYYY‑MM‑DD

        $totalIncome = $user->invoices()
            ->where('companyID', $user->companyID)
            ->whereDate('date', $today)
            ->sum('amount');

        $totalExpense = $user->purchases()
            ->where('companyID', $user->companyID)
            ->whereDate('date', $today)
            ->where('status', 'accepted')         // contoh
            ->sum('amount');

        $totalPnL = $totalIncome - $totalExpense;
        return response()->json([
            'today'        => $today,
            'totalIncome'  => $totalIncome,
            'totalExpense' => $totalExpense,
            'profitLoss'   => $totalPnL,
        ]);
    }

    /** Profit & loss sepanjang masa */
    public function lifetimeProfitLoss(Request $request)
    {
        $user = $request->user();

        // Total semua invoice untuk perusahaan user
        $totalIncome = Invoice::where('companyID', $user->companyID)
            ->sum('amount');

        // Total semua purchase accepted untuk perusahaan user
        $totalExpense = Purchase::where('companyID', $user->companyID)
            ->where('status', 'accepted')
            ->sum('amount');

        $totalPnL = $totalIncome - $totalExpense;

        return response()->json([
            'totalIncome'  => $totalIncome,
            'totalExpense' => $totalExpense,
            'profitLoss'   => $totalPnL,
        ]);
    }

    /** Top‑10 barang terlaris 30 hari terakhir */
    public function topSales(Request $request)
    {
        $user   = $request->user();
        $from   = now()->subDays(30);

        // Hitung langsung di DB supaya lebih ringan
        $top = InvoiceItem::query()
            ->selectRaw('items.itemID, items.name, SUM(invoice_items.quantity) as totalQuantity, SUM(invoice_items.subTotal) as totalSales')
            ->join('items', 'items.itemID', '=', 'invoice_items.itemID')
            ->join('invoices', 'invoices.invoiceID', '=', 'invoice_items.invoiceID')
            ->where('invoices.userID', $user->userID)
            ->where('invoices.companyID', $user->companyID)
            ->where('invoices.created_at', '>=', $from)
            ->groupBy('items.itemID', 'items.name')
            ->orderByDesc('totalSales')
            ->limit(10)
            ->get();

        return response()->json($top);
    }
}
