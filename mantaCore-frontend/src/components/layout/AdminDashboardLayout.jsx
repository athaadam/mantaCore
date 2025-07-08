'use client';

import SummaryCards from "@/components/card/SummaryCards";
import TopSales from "@/components/chart/TopSales";
import TransactionTable from "@/components/table/TransactionTable";
import PurchaseTable from "@/components/table/PurchaseTable";
import DataCard from "@/components/card/DataCard";
import Header from "@/components/header/Header";

export default function AdminDashboardLayout({ data }) {
    const { summaryData, transactions, topSells, purchaseRequests } = data;

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-y-auto w-full">
            {/* Header */}
            <Header
                icon={
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                }
                title="Admin Dashboard"
                subtitle="Real-time insights and business analytics at your fingertips"
                badgeText="Live Data"
            />

            {/* Content */}
            <div className="relative w-full px-6 -mt-10 pb-20">
                <div className="mb-12 relative z-20 w-full">
                    <SummaryCards data={summaryData} only={['totalLifetimeSales', 'todayPnL', 'lifetimePnL']} />
                </div>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-12 w-full px-2">
                    <DataCard
                        title="Top Lifetime Sales Items"
                        subtitle="Best performing products overview"
                        icon={
                            <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        }
                        gradient="bg-white/80 backdrop-blur-xl border border-white/50"
                    >
                        <TopSales report={topSells} />
                    </DataCard>

                    <DataCard
                        title="Recent Transactions"
                        subtitle="Latest sales activities"
                        icon={
                            <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        }
                        gradient="bg-white/80 backdrop-blur-xl border border-white/50"
                    >
                        <TransactionTable transactions={transactions?.invoices} itemsPerPage={5} />
                    </DataCard>
                </div>

                <DataCard
                    title="Purchase Management"
                    subtitle="Monitor and manage purchase requests"
                    icon={
                        <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    }
                    gradient="bg-white/80 backdrop-blur-xl border border-white/50"
                >
                    <PurchaseTable data={purchaseRequests} itemsPerPage={5} mode="request" />
                </DataCard>
            </div>
        </div>
    );
}
