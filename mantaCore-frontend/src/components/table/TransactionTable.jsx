'use client';
import { useState } from 'react';
import Pagination from '@/components/global/Pagination';

export default function TransactionTable({ transactions = [], itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = transactions.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="bg-white p-6 rounded-xl shadow flex-[1.2] min-w-[320px] min-h-[280px] flex flex-col">
            <h3 className="text-xl text-gray-800 font-semibold mb-4">Transaction History</h3>
            <table className="w-full border-collapse mt-2 text-base">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-3 border-b">Date</th>
                        <th className="text-left py-2 px-3 border-b">Item</th>
                        <th className="text-left py-2 px-3 border-b">Author</th>
                        <th className="text-left py-2 px-3 border-b">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((trx, i) => (
                            <tr key={i} className="border-b">
                                <td className="py-2 px-3">{trx.date}</td>
                                <td className="py-2 px-3">{trx.item}</td>
                                <td className="py-2 px-3">{trx.author}</td>
                                <td className="py-2 px-3">{trx.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No transactions available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage(p => p - 1)}
                    onNext={() => setCurrentPage(p => p + 1)}
                />
            )}
        </div>
    );
}
