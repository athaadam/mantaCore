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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {isPurchase ? 'Purchase Records' : 'Purchase Requests'}
            </h3>

            <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gradient-to-r from-indigo-50 to-white text-xs text-gray-700 uppercase tracking-wider">
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
                                <tr
                                    key={idx}
                                    className="hover:bg-indigo-50 transition-colors border-b last:border-b-0"
                                >
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
                                    <td className="px-5 py-4 font-semibold text-indigo-700">{formatRupiah(item.amount)}</td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`${getStatusColor(item.status)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow`}
                                        >
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
                                <td
                                    colSpan={isPurchase ? 8 : 6}
                                    className="text-center py-10 text-gray-400 text-base"
                                >
                                    No {isPurchase ? 'purchase records' : 'purchase requests'} available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gradient-to-r from-white to-indigo-50 border-t border-gray-100 flex justify-end rounded-b-xl">
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
