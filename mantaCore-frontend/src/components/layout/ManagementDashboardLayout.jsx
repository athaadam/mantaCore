'use client';

import { useState } from 'react';
import Header from '../header/Header';
import StatsCard from '../card/StatsCard';
import DataCard from '../card/DataCard';
import Link from 'next/link';
import TransactionTable from '../table/TransactionTable';
import CustomerTable from '../table/CustomerTable';
import InventoryTable from '../table/InventoryTable';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';

export default function ManagementDashboardLayout({ data }) {
    const { purchases, purchaseReport, items, users } = data;

    // Process purchase data
    const pendingPurchases = purchases?.filter(p => p.status === 'pending') || [];
    const recentPurchases = [...(purchases || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    // Process inventory data
    const lowStockItems = items?.filter(item => item.stock < 10) || [];
    const totalStockValue = items?.reduce((sum, item) => sum + (item.stock * item.itemPrice), 0) || 0;
    const formattedStockValue = formatRupiah(totalStockValue);

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-y-auto w-full">
            {/* Header */}
            <Header
                icon={
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                }
                title="Management Dashboard"
                subtitle="Monitor inventory, purchases, and user management"
                badgeText="Management View"
            />

            {/* Main Content */}
            <div className="relative w-full px-6 -mt-10 pb-20">
                {/* Summary Stats Cards */}
                <div className="mb-12 relative z-20 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            icon="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                            title="Total Purchase Requests"
                            value={purchaseReport?.total_requests || 0}
                            bgColor="bg-teal-100"
                            iconColor="text-teal-600"
                        />
                        <StatsCard
                            icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            title="Approved Purchases"
                            value={purchaseReport?.approved_requests || 0}
                            bgColor="bg-emerald-100"
                            iconColor="text-emerald-600"
                        />
                        <StatsCard
                            icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            title="Pending Requests"
                            value={purchaseReport?.pending_requests || 0}
                            bgColor="bg-amber-100"
                            iconColor="text-amber-600"
                        />
                        <StatsCard
                            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            title="Inventory Value"
                            value={formattedStockValue}
                            bgColor="bg-blue-100"
                            iconColor="text-blue-600"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/management/purchase-request" className="block">
                            <div className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white text-center hover:scale-[1.02]">
                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <h3 className="text-xl font-bold">Create Purchase</h3>
                                <p className="mt-2 text-teal-100">Request new inventory items</p>
                            </div>
                        </Link>
                        <Link href="/management/inventory" className="block">
                            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white text-center hover:scale-[1.02]">
                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                                </svg>
                                <h3 className="text-xl font-bold">Add Inventory</h3>
                                <p className="mt-2 text-blue-100">Create new product/item</p>
                            </div>
                        </Link>
                        <Link href="/management/account-management" className="block">
                            <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white text-center hover:scale-[1.02]">
                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                                <h3 className="text-xl font-bold">Add User</h3>
                                <p className="mt-2 text-purple-100">Create new staff account</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Purchase History & Inventory Side by Side */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Purchase History */}
                        <DataCard
                            title="Recent Purchase History"
                            subtitle="Latest purchase requests"
                            gradient="bg-gradient-to-br from-white to-teal-50"
                            icon={
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                </svg>
                            }
                        >
                            <div className="mt-6">
                                {recentPurchases.length === 0 ? (
                                    <div className="py-8 text-center">
                                        <p className="text-gray-500">No purchase history available</p>
                                    </div>
                                ) : (
                                    <TransactionTable
                                        transactions={recentPurchases}
                                        itemsPerPage={5}
                                        mode="simple"
                                    />
                                )}
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/management/sales-report"
                                        className="inline-flex items-center px-4 py-2 border border-teal-300 rounded-md shadow-sm text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100"
                                    >
                                        View Purchase History
                                        <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </DataCard>

                        {/* Low Stock Items */}
                        <DataCard
                            title="Low Stock Items"
                            subtitle="Items that need replenishing"
                            gradient="bg-gradient-to-br from-white to-rose-50"
                            icon={
                                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            }
                        >
                            <div className="mt-6">
                                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    <div className="px-8 pt-8 pb-6 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-white">
                                        <table className="w-full border-collapse text-sm">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-rose-50/90 via-rose-50/30 to-rose-50/90 shadow-sm">
                                                    <th className="text-left py-3 px-4 font-medium text-rose-700">Item Name</th>
                                                    <th className="text-left py-3 px-4 font-medium text-rose-700">Category</th>
                                                    <th className="text-left py-3 px-4 font-medium text-rose-700">Current Stock</th>
                                                    <th className="text-left py-3 px-4 font-medium text-rose-700">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-rose-100">
                                                {lowStockItems.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-8 text-gray-500">
                                                            All items are well stocked
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    lowStockItems.map((item, index) => (
                                                        <tr key={item.itemID} className="hover:bg-rose-50/50">
                                                            <td className="py-3 px-4 font-medium">{item.name}</td>
                                                            <td className="py-3 px-4">{item.category || 'Uncategorized'}</td>
                                                            <td className="py-3 px-4">
                                                                <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs font-medium">
                                                                    {item.stock} {item.units || 'units'}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">{formatRupiah(item.itemPrice)}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/management/inventory"
                                        className="inline-flex items-center px-4 py-2 border border-rose-300 rounded-md shadow-sm text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100"
                                    >
                                        View All Inventory
                                        <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </DataCard>
                    </div>
                </div>

                {/* Staff Management */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 gap-6">

                        {/* Staff Management Table */}
                        <DataCard
                            title="Staff Management"
                            subtitle="Users in your organization"
                            gradient="bg-gradient-to-br from-white to-purple-50"
                            icon={
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2m8-9a4 4 0 11-8 0 4 4 0 018 0zm-8 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            }
                        >
                            <div className="mt-6">
                                <CustomerTable
                                    customers={users?.slice(0, 5) || []}
                                    itemsPerPage={5}
                                    hideActions={true}
                                />
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/management/account-management"
                                        className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100"
                                    >
                                        View All Users
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
        </div>
    );
}