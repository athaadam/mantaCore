'use client';

import { useState } from "react";
import Header from "../header/Header";
import StatsCard from "../card/StatsCard";
import DataCard from "../card/DataCard";
import CustomerTable from "../table/CustomerTable";
import { formatRupiah } from "@/libs/utils/formats/formatRupiah";
import Link from "next/link";
import TransactionTable from "../table/TransactionTable";

export default function CashierDashboardLayout({ data }) {
    const { customers, myInvoices, invoices } = data;
    const totalCustomers = customers?.length || 0;
    const totalInvoices = myInvoices?.length || 0;
    const totalSales = myInvoices?.reduce((sum, invoice) => sum + (invoice.amount || 0), 0) || 0;
    
    // Calculate recent activity (transactions in the last 7 days)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    const recentInvoices = myInvoices?.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= lastWeek;
    }) || [];
    
    const recentSales = recentInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0) || 0;
    
    // Format the total sales value
    const formattedTotalSales = formatRupiah(totalSales);
    const formattedRecentSales = formatRupiah(recentSales);

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-y-auto w-full">
            {/* Header */}
            <Header
                icon={
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                }
                title="Cashier Dashboard"
                subtitle="Manage your sales and customer relationships efficiently"
                badgeText="Live Data"
            />
            
            {/* Main Content */}
            <div className="relative w-full px-6 -mt-10 pb-20">
                {/* Summary Stats Cards */}
                <div className="mb-12 relative z-20 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard 
                            icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                            title="Total Invoices" 
                            value={totalInvoices} 
                            bgColor="bg-blue-100" 
                            iconColor="text-blue-600"
                        />
                        <StatsCard 
                            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                            title="Total Customers" 
                            value={totalCustomers} 
                            bgColor="bg-purple-100" 
                            iconColor="text-purple-600"
                        />
                        <StatsCard 
                            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            title="Total Sales" 
                            value={formattedTotalSales} 
                            bgColor="bg-emerald-100" 
                            iconColor="text-emerald-600"
                        />
                        <StatsCard 
                            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                            title="Recent Sales (7d)" 
                            value={formattedRecentSales} 
                            bgColor="bg-amber-100" 
                            iconColor="text-amber-600"
                        />
                    </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/cashier/invoices/new" className="block">
                            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white text-center hover:scale-[1.02]">
                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <h3 className="text-xl font-bold">Create New Invoice</h3>
                                <p className="mt-2 text-blue-100">Add a new sales transaction</p>
                            </div>
                        </Link>
                        <Link href="/cashier/customer/new" className="block">
                            <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white text-center hover:scale-[1.02]">
                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                                <h3 className="text-xl font-bold">Add Customer</h3>
                                <p className="mt-2 text-purple-100">Register a new customer</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Invoices Tables - Side by Side */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* My Invoices */}
                        <DataCard 
                            title="My Invoices" 
                            subtitle="Transactions created by you"
                            gradient="bg-gradient-to-br from-white to-blue-50"
                            icon={
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            }
                        >
                            <div className="mt-6">
                                <TransactionTable 
                                    transactions={myInvoices || []} 
                                    itemsPerPage={5}
                                    mode="simple"
                                />
                            </div>
                        </DataCard>

                        {/* All Invoices */}
                        <DataCard 
                            title="All Invoices" 
                            subtitle="Transactions from all cashiers"
                            gradient="bg-gradient-to-br from-white to-indigo-50"
                            icon={
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            }
                        >
                            <div className="mt-6">
                                <TransactionTable 
                                    mode="simple" 
                                    transactions={(invoices?.invoices || [])} 
                                    itemsPerPage={5}
                                />
                            </div>
                        </DataCard>
                    </div>
                </div>
                
                {/* Customer Management */}
                <div className="mb-12">
                    <DataCard 
                        title="Customer Management" 
                        subtitle="Your top customers"
                        gradient="bg-gradient-to-br from-white to-purple-50"
                        icon={
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87m-4 0a4 4 0 00-3 3.87V20H7m10-15a4 4 0 11-8 0 4 4 0 018 0zm-8 7a4 4 0 100-8 4 4 0 000 8z"></path>
                            </svg>
                        }
                    >
                        <div className="mt-6">
                            <CustomerTable 
                                customers={customers?.slice(0, 5) || []} 
                                itemsPerPage={5}
                                hideActions={true}
                            />
                            <div className="mt-6 text-center">
                                <Link 
                                    href="/cashier/customer" 
                                    className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100"
                                >
                                    View All Customers
                                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </DataCard>
                </div>
            </div>
        </div>
    );
}