'use client';

import { useState, useEffect } from 'react';
import { getStatusColor } from '@/libs/utils/colors/statuscolor';
import Pagination from '@/components/common/Pagination';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import Link from 'next/link';

export default function PurchaseTable({ data = [], itemsPerPage = 5, mode = 'purchase' }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to first page when data changes (e.g., after filtering)
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIdx, startIdx + itemsPerPage);

    const isPurchase = mode === 'purchase';
    console.log('PurchaseTable data:', data);
    return (
        <div className="w-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">

                {/* Enhanced Header Card with Improved Styling */}
                <div className="px-6 pt-5 pb-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-violet-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-purple-200 to-violet-200 rounded-xl shadow-inner">
                            <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-purple-800 tracking-tight">
                                {isPurchase ? 'Purchase Records' : 'Purchases in last decade'}
                            </h3>
                            <p className="text-purple-600 text-sm mt-1 font-medium">
                                {isPurchase ? 'Complete purchase transaction history' : 'Latest purchases'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Table Container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-slate-700">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-100 to-violet-100 text-xs text-purple-900 uppercase tracking-wider">
                                <th className="px-4 py-3 text-left font-bold relative">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Date</span>
                                    </div>
                                </th>
                                {isPurchase ? (
                                    <>
                                        <th className="px-6 py-5 text-left font-bold">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                                <span>Invoice ID</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left font-bold">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                                </svg>
                                                <span>Item</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left font-bold">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                <span>Category</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left font-bold">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                                </svg>
                                                <span>Quantity</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left font-bold">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Unit Price</span>
                                            </div>
                                        </th>
                                    </>
                                ) : (
                                    <th className="px-6 py-5 text-left font-bold">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            <span>Category</span>
                                        </div>
                                    </th>
                                )}
                                <th className="px-6 py-5 text-left font-bold">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Author</span>
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left font-bold">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>Amount</span>
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left font-bold">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Status</span>
                                    </div>
                                </th>
                                {isPurchase && <th className="px-6 py-5 text-left font-bold">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Action</span>
                                    </div>
                                </th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-purple-100">
                            {currentData.length > 0 ? (
                                currentData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-purple-50/90 transition-all duration-300 group">
                                        <td className="px-4 py-2.5">
                                            <div className="font-medium text-slate-800 bg-purple-50/50 px-2 py-1 rounded-md inline-flex items-center text-xs">
                                                <svg className="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {item.date}
                                            </div>
                                        </td>
                                        {isPurchase ? (
                                            <>
                                                <td className="px-4 py-2.5">
                                                    <div className="font-medium text-purple-700 group-hover:text-purple-800 transition-colors text-xs">
                                                        #{item.purchaseID}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <div className="max-w-xs line-clamp-1 text-slate-700 group-hover:text-slate-800 text-xs">
                                                        {item.items?.length > 0 ? (
                                                            <div className="flex flex-col space-y-0.5">
                                                                {item.items.slice(0, 2).map((i, idx) => (
                                                                    <span key={idx} className="group-hover:text-purple-700 transition-colors">
                                                                        {i.item?.name ?? 'Unknown'}
                                                                    </span>
                                                                ))}
                                                                {item.items.length > 2 && <span className="text-xs text-slate-500">+{item.items.length - 2} more</span>}
                                                            </div>
                                                        ) : '-'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <div className="max-w-xs flex flex-wrap gap-1">
                                                        {item.items?.length > 0
                                                            ? item.items.slice(0, 1).map((i, idx) => (
                                                                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                                                    {i.item?.category ?? 'Uncategorized'}
                                                                </span>
                                                            ))
                                                            : '-'}
                                                        {item.items?.length > 1 && 
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                                +{item.items.length - 1}
                                                            </span>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 group-hover:bg-purple-200 transition-colors">
                                                        {item.items?.length > 0
                                                            ? item.items.reduce((total, i) => total + i.quantity, 0)
                                                            : 0}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <div className="font-bold text-purple-700 group-hover:text-purple-800 transition-colors text-xs">
                                                        {item.items?.length > 0
                                                            ? (item.items.length > 1 
                                                                ? formatRupiah(item.items[0].unitPrice) + "..." 
                                                                : formatRupiah(item.items[0].unitPrice))
                                                            : '-'}
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <td className="px-4 py-2.5">
                                                <div className="max-w-xs flex flex-wrap gap-1">
                                                    {item.items?.length > 0
                                                        ? item.items.slice(0, 1).map((i, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                                                {i.item?.category ?? 'Unknown'}
                                                            </span>
                                                        ))
                                                        : '-'}
                                                    {item.items?.length > 1 && 
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                            +{item.items.length - 1}
                                                        </span>
                                                    }
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-6 h-6 bg-gradient-to-br from-purple-300 to-violet-400 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                                    {item.user.username ? item.user.username.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-xs">{item.user.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="font-bold text-purple-700 text-sm group-hover:text-purple-800 transition-colors">
                                                {formatRupiah(item.amount)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <span className={`${getStatusColor(item.status)} text-white text-xs font-bold px-2.5 py-1 rounded-md shadow capitalize tracking-wide group-hover:shadow-md transition-shadow`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        {isPurchase && (
                                            <td className="px-4 py-2.5">
                                                <Link
                                                    href={`purchase-approval/${item.purchaseID}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium rounded-md shadow hover:shadow-md hover:from-purple-600 hover:to-violet-700 transform hover:scale-105 transition-all duration-300 text-xs"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <p className='text-center'>View</p>
                                                </Link>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isPurchase ? 9 : 6} className="text-center py-8 text-slate-400">
                                        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                                            <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full flex items-center justify-center shadow-md p-1 border-2 border-white/80 animate-pulse">
                                                <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="text-center px-4">
                                                <h3 className="text-lg font-bold text-purple-800 mb-1">No Data Available</h3>
                                                <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
                                                    We couldn't find any {isPurchase ? 'purchase records' : 'purchase requests'} matching your criteria.
                                                </p>
                                                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-medium rounded-md shadow-sm border border-purple-200 text-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Create your first {isPurchase ? 'purchase' : 'request'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Enhanced Pagination */}
                <div className="px-6 py-3 bg-gradient-to-r from-white via-purple-50 to-violet-50 border-t border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-3xl">
                    <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        {data.length > 0 ? (
                            <span>
                                Showing <span className="font-bold text-purple-700">{startIdx + 1}</span> to <span className="font-bold text-purple-700">{Math.min(startIdx + itemsPerPage, data.length)}</span> of <span className="font-bold text-purple-700">{data.length}</span> entries
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
        </div>

    );
}
