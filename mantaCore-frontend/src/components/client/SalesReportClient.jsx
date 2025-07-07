'use client';

import { useState } from 'react';
import TopSales from '@/components/chart/TopSales';
import SummaryCards from '@/components/table/SummaryCards';
import SalesByCategory from '@/components/chart/SalesByCategory';
import TransactionTable from '@/components/table/TransactionTable';
import FilterControls from '@/components/filter/FilterControls';

export default function SalesReportClient({ summaryData, transactions, report }) {
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        category: '',
        suitor: '',
        status: '',
    });

    console.log(report)

    return (
        <div className="flex-1 px-8 py-10 bg-gradient-to-br from-gray-50 to-white min-h-screen overflow-y-auto mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight drop-shadow-sm">
                Sales Report
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <SummaryCards
                    data={summaryData}
                    only={['totalSales', 'totalInvoice', 'productSold', 'activeCustomers']}
                />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="rounded-2xl bg-white shadow-lg p-6 flex flex-col min-h-[320px]">
                    {/* <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Sales</h2> */}
                    <TopSales report={report.topSales}/>
                </div>
                <div className="rounded-2xl bg-white shadow-lg p-6 flex flex-col min-h-[320px]">
                    {/* <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales by Category</h2> */}
                    <SalesByCategory report={report.salesByCategory} />
                </div>
            </div>

            {/* Transaction Filter */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                <h3 className="text-2xl text-gray-800 font-semibold">
                    Transaction History
                </h3>
                <FilterControls
                    filter={filter}
                    setFilter={setFilter}
                    onApply={() => console.log('apply', filter)}
                    onExport={() => console.log('export')}
                    showCategory={true}
                    showSuitor={true}
                    showStatus={false}
                />
            </div>

            {/* Transaction Table */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
                <TransactionTable
                    transactions={transactions}
                    itemsPerPage={5}
                    mode="detailed"
                />
            </div>
        </div>
    );
}
