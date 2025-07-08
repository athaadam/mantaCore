'use client';

import { useState } from 'react';
import Pagination from '@/components/utils/Pagination';
import { formatRupiah } from '@/components/utils/formatRupiah';
import Link from 'next/link';

export default function TransactionTable({ transactions = [], itemsPerPage, mode = 'simple' }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = transactions.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className={`flex flex-col h-full bg-white ${mode === 'simple' ? 'p-8' : 'p-0'} rounded-2xl shadow-lg min-w-[340px]`}>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Date</th>
                            {mode === 'detailed' && (
                                <>
                                    <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Invoice ID</th>
                                    <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Suitor</th>
                                </>
                            )}
                            <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Item</th>
                            <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Customer ID</th>
                            <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Amount</th>
                            {mode === 'detailed' && (
                                <>
                                    <th className="text-left py-3 px-4 border-b font-semibold text-gray-700">Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((trx, i) => (
                                <tr key={i} className="border-b last:border-b-0 hover:bg-indigo-50 transition-colors">
                                    <td className="py-3 px-4">{trx.date}</td>
                                    {mode === 'detailed' && (
                                        <>
                                            <td className="py-3 px-4">{trx.invoiceID}</td>
                                            <td className="py-3 px-4">{trx.user?.username}</td>
                                        </>
                                    )}
                                    <td className="py-3 px-4">
                                        {trx.items?.length > 0
                                            ? trx.items.map(item => item.item.name).join(', ')
                                            : 'Unknown Item'}
                                    </td>
                                    <td className="py-3 px-4">{trx.costumerID}</td>
                                    <td className="py-3 px-4 font-semibold text-indigo-600">{formatRupiah(trx.amount)}</td>
                                    {mode === 'detailed' && (
                                        <>
                                            <td className="py-3 px-4">
                                                <Link
                                                    href={`sales-report/${trx.invoiceID}`}
                                                    className="inline-block px-3 py-1 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                                                >
                                                    View Detail
                                                </Link>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={mode === 'detailed' ? 8 : 5}
                                    className="text-center py-6 text-gray-400 font-medium"
                                >
                                    No transactions available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="p-4 flex justify-end">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    />
                </div>
            )}
        </div>
    );
}
