'use client';

import { useState, useEffect, useMemo } from 'react';
import Pagination from '@/components/common/Pagination';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import Link from 'next/link';

export default function TransactionTable({ transactions = [], itemsPerPage, mode = 'simple', onViewDetails, onRefresh }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Reset to first page when transactions change (e.g., after filtering)
    useEffect(() => {
        setIsLoading(true);
        // Simulate loading for better UX
        const timer = setTimeout(() => {
            setCurrentPage(1);
            setIsLoading(false);
        }, 500); // Slightly longer loading time for better UX
        
        return () => clearTimeout(timer);
    }, [transactions]);
    
    // Add another useEffect to handle data refresh operations
    useEffect(() => {
        if (transactions.length > 0) {
            // Scroll to top of table when data or page changes
            const tableElement = document.querySelector('.overflow-x-auto');
            if (tableElement) {
                tableElement.scrollTop = 0;
            }
        }
    }, [currentPage, transactions.length]);

    // Memoize calculations to improve performance
    const { totalPages, startIdx, currentData } = useMemo(() => {
        const totalPages = Math.ceil(transactions.length / itemsPerPage);
        const startIdx = (currentPage - 1) * itemsPerPage;
        const currentData = transactions.slice(startIdx, startIdx + itemsPerPage);
        return { totalPages, startIdx, currentData };
    }, [transactions, currentPage, itemsPerPage]);

    return (
        <div className={`flex flex-col h-full bg-white/95 backdrop-blur-sm ${mode === 'simple' ? 'p-8' : 'p-4'} rounded-2xl shadow-xl min-w-[340px] border border-indigo-100/50`}>
            <div className="overflow-x-auto rounded-xl border border-indigo-100/80 shadow-inner bg-white">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-50/90 via-purple-50/30 to-indigo-50/90 shadow-sm">
                            <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Date</span>
                                </div>
                            </th>
                            <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    <span>Invoice ID</span>
                                </div>
                            </th>
                            {mode === 'detailed' && (
                                <>
                                    <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Customer</span>
                                        </div>
                                    </th>
                                    <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Author</span>
                                        </div>
                                    </th>
                                </>
                            )}
                            <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                    </svg>
                                    <span>Items</span>
                                </div>
                            </th>
                            <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>Category</span>
                                </div>
                            </th>
                            <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Amount</span>
                                </div>
                            </th>
                            {mode === 'detailed' && (
                                <>
                                    <th className="text-left py-3.5 px-4 border-b border-indigo-100 font-semibold text-indigo-700">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>Action</span>
                                        </div>
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={mode === 'detailed' ? 7 : 5} className="py-16">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-6 h-6 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-slate-600 animate-pulse">Loading transactions...</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : currentData.length > 0 ? (
                            currentData.map((trx, i) => (
                                <tr 
                                    key={i} 
                                    className="hover:bg-indigo-50/70 group transition-all duration-200 cursor-pointer relative overflow-hidden border-l-2 border-l-transparent hover:border-l-indigo-500 active:bg-indigo-100" 
                                    onClick={() => mode === 'detailed' && onViewDetails && onViewDetails(trx)}
                                    title={mode === 'detailed' ? "Click to view details" : ""}
                                >
                                    <td className="py-3.5 px-4">
                                        <div className="font-medium text-slate-800 bg-indigo-50/50 px-2.5 py-1 rounded-md inline-flex items-center text-xs">
                                            <svg className="w-3 h-3 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {trx.date}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <span className="font-medium text-indigo-700 group-hover:text-indigo-900 transition-colors text-sm px-2.5 py-1 bg-indigo-50/0 group-hover:bg-indigo-50/80 rounded-md">
                                            #{trx.invoiceID}
                                        </span>
                                    </td>
                                    {mode === 'detailed' && (
                                        <>
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                                        {trx.costumer?.username ? trx.costumer.username.charAt(0).toUpperCase() : 'C'}
                                                    </div>
                                                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-sm">
                                                        {trx.costumer?.username || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                                        {trx.user?.username ? trx.user.username.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-sm">
                                                        {trx.user?.username || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                    <td className="py-3.5 px-4">
                                        <div className="max-w-xs line-clamp-1 text-slate-700 group-hover:text-slate-800">
                                            {trx.items?.length > 0 ? (
                                                <div className="flex flex-col space-y-0.5">
                                                    {trx.items.slice(0, 2).map((item, idx) => (
                                                        <span key={idx} className="group-hover:text-indigo-700 transition-colors text-sm">
                                                            {item.item?.name || 'Unknown'}
                                                        </span>
                                                    ))}
                                                    {trx.items.length > 2 && (
                                                        <span className="text-xs text-slate-500">
                                                            +{trx.items.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 italic">No items</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                                            {trx.items?.length > 0 ? (
                                                trx.items.slice(0, 2).map((item, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 transition-colors">
                                                        {item.item?.category || 'Uncategorized'}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                    No category
                                                </span>
                                            )}
                                            {trx.items?.length > 2 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                                    +{trx.items.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <div className="font-bold text-indigo-700 text-sm group-hover:text-indigo-800 transition-colors">
                                            {formatRupiah(trx.amount)}
                                        </div>
                                    </td>
                                    {mode === 'detailed' && (
                                        <>
                                            <td className="py-3.5 px-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onViewDetails && onViewDetails(trx);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow hover:shadow-md hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-xs"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View Detail
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={mode === 'detailed' ? 7 : 5}
                                    className="text-center py-8"
                                >
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center shadow-md p-1 border-2 border-white/80 animate-pulse">
                                            <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-indigo-800 mb-1">No Transactions Found</h3>
                                            <p className="text-sm text-slate-500 mb-4 max-w-xs mx-auto">
                                                There are no sales transactions matching your criteria. Try adjusting your filters or create a new sale.
                                            </p>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRefresh && onRefresh();
                                                }} 
                                                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm font-medium transition-colors border border-indigo-200 shadow-sm"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Refresh Data
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 flex justify-between items-center mt-2">
                <div className="text-xs text-slate-600 font-medium bg-indigo-50/80 px-3 py-2 rounded-lg shadow-sm border border-indigo-100 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    {transactions.length > 0 ? (
                        <span>
                            Showing <span className="font-bold text-indigo-700">{startIdx + 1}</span> to <span className="font-bold text-indigo-700">{Math.min(startIdx + itemsPerPage, transactions.length)}</span> of <span className="font-bold text-indigo-700">{transactions.length}</span> entries
                        </span>
                    ) : (
                        <span>No entries to display</span>
                    )}
                </div>
                
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    />
                )}
            </div>
        </div>
    );
}
