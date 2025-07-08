'use client';

import { useState, useMemo } from 'react';
import TopSales from '@/components/chart/TopSales';
import SummaryCards from '@/components/card/SummaryCards';
import SalesByCategory from '@/components/chart/SalesByCategory';
import TransactionTable from '@/components/table/TransactionTable';
import FilterControls from '@/components/filter/FilterControls';
import Header from '@/components/header/Header';
import DataCard from '@/components/card/DataCard';
import { extractCustomers, extractCategories, extractAuthors, extractSuitors, applyFilters } from '@/components/utils/filterUtils';

export default function SalesReportClient({ summaryData, transactions, report }) {
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        category: '',
        suitor: '',
        author: '',
        status: '',
    });
    
    const [appliedFilter, setAppliedFilter] = useState({});

    // Extract unique customers, authors and categories from transaction data
    const suitors = useMemo(() => extractSuitors(transactions || []), [transactions]);
    const authors = useMemo(() => extractAuthors(transactions || [], true), [transactions]);
    const categories = useMemo(() => extractCategories(transactions || []), [transactions]);
    
    // Apply filters to data only when appliedFilter changes
    const filteredTransactions = useMemo(() => {
        if (!transactions || transactions.length === 0) {
            return [];
        }
        return applyFilters(transactions, appliedFilter);
    }, [transactions, appliedFilter]);

    const handleApplyFilter = () => {
        console.log('Filters applied:', filter);
        console.log('Original transactions count:', transactions?.length || 0);
        setAppliedFilter({ ...filter });
        
        // Add delay to log filtered count after state update
        setTimeout(() => {
            console.log('Filtered transactions count:', filteredTransactions.length);
        }, 100);
    };

    const handleClearFilter = () => {
        const clearedFilter = { from: '', to: '', category: '', suitor: '', author: '', status: '' };
        setFilter(clearedFilter);
        setAppliedFilter({});
        console.log('Filters cleared');
    };

    const handleExport = () => {
        console.log('Exporting filtered sales data:', filteredTransactions);
        if (filteredTransactions.length === 0) {
            alert('No data to export. Please adjust your filters.');
            return;
        }
        // Export logic here
    };

    // Sales performance icon
    const salesIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Modern Header Component */}
            <Header
                mode={'sales'}
                data={report}
                icon={salesIcon}
                title="Sales Analytics"
                subtitle="Comprehensive insights into your sales performance and growth metrics"
                badgeText="Real-time Data"
            />

            <div className="px-6 pb-12 -mt-10 relative z-10">
                {/* Enhanced Summary Cards */}
                <div className="mb-12">
                    <SummaryCards
                        data={summaryData}
                        only={['totalSales', 'totalInvoice', 'productSold', 'activeCustomers']}
                    />
                </div>

                {/* Enhanced Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <DataCard
                        title="Top Performers"
                        subtitle="Best selling items in the last 30 days"
                        icon={
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        }
                        gradient="bg-gradient-to-br from-white via-blue-50 to-indigo-100"
                    >
                        <TopSales report={report.topSales} />
                    </DataCard>

                    <DataCard
                        title="Category Analysis"
                        subtitle="Sales distribution across product categories"
                        icon={
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        }
                        gradient="bg-gradient-to-br from-white via-purple-50 to-pink-100"
                    >
                        <SalesByCategory report={report.salesByCategory} />
                    </DataCard>
                </div>

                {/* Enhanced Transaction Section */}
                <DataCard
                    title="Transaction History"
                    subtitle="Detailed view of all sales transactions and customer activities"
                    icon={
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    }
                    gradient="bg-gradient-to-br from-white via-emerald-50 to-teal-100"
                >
                    {/* Enhanced Filter Controls */}
                    <div className="mb-6">
                        <FilterControls
                            filter={filter}
                            setFilter={setFilter}
                            onApply={handleApplyFilter}
                            onClear={handleClearFilter}
                            onExport={handleExport}
                            customers={suitors}
                            authors={authors}
                            categories={categories}
                            resultCount={filteredTransactions.length}
                            totalCount={transactions?.length || 0}
                            showCategory={true}
                            showSuitor={true}
                            showAuthor={true}
                            showStatus={false}
                        />
                    </div>

                    {/* Transaction Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <TransactionTable
                            transactions={filteredTransactions}
                            itemsPerPage={5}
                            mode="detailed"
                        />
                    </div>
                </DataCard>
            </div>
        </div>
    );
}
