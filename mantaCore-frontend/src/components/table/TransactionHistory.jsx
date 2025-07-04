'use client';

import { useState } from 'react';
import Pagination from '@/components/global/Pagination';

export default function TransactionHistory({ transactions, itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((transactions?.length || 0) / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = transactions.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="w-full">
            {/* Tabel */}
            <div className="overflow-x-auto">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 text-sm">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                {['Date', 'Invoice ID', 'Suitor', 'Item', 'Customer ID', 'Amount', 'Action'].map((header) => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 border-b text-left font-medium text-gray-700 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.date}</td>
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.invoiceId}</td>
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.author}</td>
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.item}</td>
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.customerId}</td>
                                        <td className="px-6 py-4 border-b text-gray-700">{transaction.amount}</td>
                                        <td className="px-6 py-4 border-b">
                                            <a href="#" className="text-[#6A5ACD] hover:underline">
                                                View Detail
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-6 text-gray-500">
                                        No transactions available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-end">
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
