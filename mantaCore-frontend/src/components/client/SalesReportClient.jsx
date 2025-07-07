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

    

    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Sales Report
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 drop-shadow-lg mb-8 w-full">
                <SummaryCards
                    data={summaryData}
                    only={['totalSales', 'totalInvoice', 'productSold', 'activeCustomers']}
                />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-6 drop-shadow-lg items-stretch">
                <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
                    <TopSales report={report}/>
                </div>
                <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
                    <SalesByCategory report={report} />
                </div>
            </div>

            {/* Transaction Filter */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 drop-shadow-lg">
                <h3 className="text-xl text-gray-800 font-semibold">
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
            <TransactionTable
                transactions={transactions}
                itemsPerPage={5}
                mode="detailed"
            />
        </div>
    );
}
