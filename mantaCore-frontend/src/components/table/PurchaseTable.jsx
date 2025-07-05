'use client';

import { useState, useEffect } from 'react';
import { getStatusColor } from '@/components/utils/statuscolor';
import Pagination from '@/components/utils/Pagination';

// Format aman untuk server & client
const formatRupiah = (number) =>
    `Rp ${Number(number).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;

export default function PurchaseTable({ data = [], itemsPerPage = 5, mode = 'purchase' }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIdx, startIdx + itemsPerPage);

    const isPurchase = mode === 'purchase';

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

                {/* Header Card */}
                <div className="px-6 pt-6 pb-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 className="text-lg font-semibold text-indigo-800 tracking-tight flex items-center gap-2">
                        {isPurchase ? '📄 Purchase Records' : '🛒 Purchase Requests'}
                    </h3>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-indigo-50 text-xs text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left">Date</th>
                                {isPurchase ? (
                                    <>
                                        <th className="px-5 py-4 text-left">Invoice ID</th>
                                        <th className="px-5 py-4 text-left">Suitor</th>
                                        <th className="px-5 py-4 text-left">Item</th>
                                        <th className="px-5 py-4 text-left">Customer ID</th>
                                    </>
                                ) : (
                                    <th className="px-5 py-4 text-left">Title</th>
                                )}
                                <th className="px-5 py-4 text-left">Author</th>
                                <th className="px-5 py-4 text-left">Amount</th>
                                <th className="px-5 py-4 text-left">Status</th>
                                {isPurchase && <th className="px-5 py-4 text-left">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-indigo-50 transition-colors border-b last:border-b-0">
                                        <td className="px-5 py-4 whitespace-nowrap">{item.date}</td>
                                        {isPurchase ? (
                                            <>
                                                <td className="px-5 py-4">{item.invoiceId}</td>
                                                <td className="px-5 py-4">{item.suitor}</td>
                                                <td className="px-5 py-4">{item.item}</td>
                                                <td className="px-5 py-4">{item.customerId}</td>
                                            </>
                                        ) : (
                                            <td className="px-5 py-4">{item.title}</td>
                                        )}
                                        <td className="px-5 py-4">{item.author}</td>
                                        <td className="px-5 py-4 font-semibold text-indigo-700">
                                            {formatRupiah(item.amount)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`${getStatusColor(item.status)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        {isPurchase && (
                                            <td className="px-5 py-4">
                                                <a
                                                    href="#"
                                                    className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium text-sm transition-colors"
                                                >
                                                    View Detail
                                                </a>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isPurchase ? 8 : 6} className="text-center py-10 text-gray-400 text-base">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📦</span>
                                            No {isPurchase ? 'purchase records' : 'purchase requests'} available.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gradient-to-r from-white to-indigo-50 border-t border-gray-100 flex justify-end rounded-b-2xl">
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
