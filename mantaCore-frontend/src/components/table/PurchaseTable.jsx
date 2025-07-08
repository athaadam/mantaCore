'use client';

import { useState } from 'react';
import { getStatusColor } from '@/components/utils/statuscolor';
import Pagination from '@/components/utils/Pagination';
import { formatRupiah } from '@/components/utils/formatRupiah';
import Link from 'next/link';

export default function PurchaseTable({ data = [], itemsPerPage = 5, mode = 'purchase' }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIdx, startIdx + itemsPerPage);

    const isPurchase = mode === 'purchase';

    return (
        <div className="w-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">

                {/* Enhanced Header Card */}
                <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-violet-50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-purple-800 tracking-tight">
                                {isPurchase ? 'Purchase Records' : ''}
                            </h3>
                            <p className="text-purple-600 text-sm mt-1">
                                {isPurchase ? 'Complete purchase transaction history' : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Table Container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-slate-700">
                        <thead className="bg-gradient-to-r from-purple-50 to-violet-50 text-xs text-slate-700 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-5 text-left font-bold">Date</th>
                                {isPurchase ? (
                                    <>
                                        <th className="px-6 py-5 text-left font-bold">Invoice ID</th>
                                        <th className="px-6 py-5 text-left font-bold">Item</th>
                                        <th className="px-6 py-5 text-left font-bold">Quantity</th>
                                        <th className="px-6 py-5 text-left font-bold">Unit Price</th>
                                    </>
                                ) : (
                                    <th className="px-6 py-5 text-left font-bold">Category</th>
                                )}
                                <th className="px-6 py-5 text-left font-bold">Suitor</th>
                                <th className="px-6 py-5 text-left font-bold">Amount</th>
                                <th className="px-6 py-5 text-left font-bold">Status</th>
                                {isPurchase && <th className="px-6 py-5 text-left font-bold">Action</th>}
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 backdrop-blur-sm">
                            {currentData.length > 0 ? (
                                currentData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-purple-50/70 transition-all duration-200 border-b border-purple-100 last:border-b-0 group">
                                        <td className="px-6 py-5 whitespace-nowrap font-medium text-slate-800">{item.date}</td>
                                        {isPurchase ? (
                                            <>
                                                <td className="px-6 py-5 font-medium text-purple-700">{item.purchaseID}</td>
                                                <td className="px-6 py-5">
                                                    <div className="max-w-xs">
                                                        {item.items?.length > 0
                                                            ? item.items.map(i => i.item?.name ?? 'Unknown').join(', ')
                                                            : '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                        {item.items?.length > 0
                                                            ? item.items.reduce((total, i) => total + i.quantity, 0)
                                                            : 0}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-bold text-purple-700">
                                                    {item.items?.length > 0
                                                        ? item.items.map(i => formatRupiah(i.unitPrice)).join(', ')
                                                        : '-'}
                                                </td>
                                            </>
                                        ) : (
                                            <td className="px-6 py-5">
                                                {item.items?.length > 0
                                                    ? item.items.map(i => i.item?.category ?? 'Unknown').join(', ')
                                                    : '-'}
                                            </td>
                                        )}
                                        <td className="px-6 py-5 font-medium text-slate-700">{item.user.username}</td>

                                        <td className="px-6 py-5 font-bold text-purple-700 text-lg">
                                            {formatRupiah(item.amount)}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`${getStatusColor(item.status)} text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg capitalize tracking-wide`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        {isPurchase && (
                                            <td className="px-6 py-5">
                                                <Link
                                                    href={`purchase-approval/${item.purchaseID}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View Details
                                                </Link>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isPurchase ? 8 : 6} className="text-center py-16 text-slate-400">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
                                                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-600 mb-2">No Data Available</p>
                                                <p className="text-sm text-slate-400">
                                                    No {isPurchase ? 'purchase records' : 'purchase requests'} found.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                    <div className="px-8 py-6 bg-gradient-to-r from-white via-purple-50 to-violet-50 border-t border-purple-100 flex justify-between items-center rounded-b-3xl">
                        <div className="text-sm text-slate-600 font-medium">
                            Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, data.length)} of {data.length} entries
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        />
                    </div>
                )}
            </div>
        </div>

    );
}
