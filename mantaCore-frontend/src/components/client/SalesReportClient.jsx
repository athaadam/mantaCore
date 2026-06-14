'use client';

import { useState } from 'react';
import TopSales from '@/components/chart/TopSales';
import SummaryCards from '@/components/card/SummaryCards';
import SalesByCategory from '@/components/chart/SalesByCategory';
import TransactionTable from '@/components/table/TransactionTable';
import Header from '@/components/header/Header';
import DataCard from '@/components/card/DataCard';
import InvoiceViewModal from '../modal/InvoiceViewModal';

export default function SalesReportClient({ summaryData, transactions, report }) {
    
    // State untuk modal view detail invoice
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    
    // Handler untuk membuka modal dengan detail invoice
    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };
    
    // Handler untuk menutup modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
    };

    // Sales performance icon
    const salesIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );

    const convertToPercentage = () => {
        if (!report.salesByCategory) return [];
        const total = Object.values(report.salesByCategory).reduce((sum, value) => sum + value, 0);

        return Object.entries(report.salesByCategory).map(([category, value]) => ({
            category,
            percentage: total > 0 ? Math.round((value / total) * 100) : 0
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Modern Header Component */}
            <Header
                mode={'dashboard'}
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
                        <SalesByCategory report={convertToPercentage()} />
                    </DataCard>
                </div>

                {/* Enhanced Transaction Section */}
                <DataCard
                    title="Transaction History"
                    subtitle="Detailed view of all sales transactions and customer activities"
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    }
                    gradient="bg-gradient-to-br from-white via-emerald-50 to-teal-100"
                >
                    {/* Transaction Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <TransactionTable
                            transactions={transactions}
                            itemsPerPage={5}
                            mode="detailed"
                            onViewDetails={handleViewInvoice}
                        />
                    </div>
                </DataCard>
            </div>

            {/* Invoice View Modal */}
            {isModalOpen && (
                <InvoiceViewModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    invoice={selectedInvoice}
                />
            )}
        </div>
    );
}
