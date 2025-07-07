'use client';

import { useState } from 'react';
import TopSales from '@/components/chart/TopSales';
import SummaryCards from '@/components/card/SummaryCards';
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
        <div className="flex-1 px-6 py-10 bg-gradient-to-br min-h-screen overflow-y-auto mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow">
                        Sales Report
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Overview and analytics of your sales performance.
                    </p>
                </div>
                <form className="flex gap-4 bg-white shadow rounded-lg px-6 py-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="from-date">
                            From
                        </label>
                        <input
                            type="date"
                            id="from-date"
                            name="from"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition w-full"
                            value={report.dateRange.start}
                            onChange={e => setFilter(f => ({ ...f, from: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="to-date">
                            To
                        </label>
                        <input
                            type="date"
                            id="to-date"
                            name="to"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition w-full"
                            value={report.dateRange.end}
                            onChange={e => setFilter(f => ({ ...f, to: e.target.value }))}
                        />
                    </div>
                </form>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <SummaryCards
                    data={summaryData}
                    only={['totalSales', 'totalInvoice', 'productSold', 'activeCustomers']}
                />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="rounded-2xl bg-white shadow-xl p-8 flex flex-col min-h-[340px]">
                    <h3 className="text-xl text-gray-800 font-semibold mb-4 self-start">
                        Top Selling Items in 30 Days
                    </h3>
                    <TopSales report={report.topSales} />
                </div>
                <div className="rounded-2xl bg-white shadow-xl p-8 flex flex-col min-h-[340px]">
                    <h3 className="text-xl text-gray-800 font-semibold mb-4 self-start">
                        Sales by Category
                    </h3>
                    <SalesByCategory report={report.salesByCategory} />
                </div>
            </div>

            {/* Transaction Filter */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                <h3 className="text-2xl text-gray-800 font-bold">
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
            <div className="rounded-2xl bg-white shadow-xl p-8">
                <TransactionTable
                    transactions={transactions}
                    itemsPerPage={5}
                    mode="detailed"
                />
            </div>
        </div>
    );
}
