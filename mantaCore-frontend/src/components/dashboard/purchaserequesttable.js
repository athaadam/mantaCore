'use client';
import { useState } from 'react';
import { getStatusColor } from '@/utils/statuscolor';
import Pagination from '@/components/pagination';


export default function PurchaseRequestTable({ requests = [], itemsPerPage = 5 }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = requests.slice(startIdx, startIdx + itemsPerPage);

    return (
        <>
            <h3 className="text-xl text-gray-800 font-semibold mb-4">Purchase Request</h3>
            <table className="w-full border-collapse mt-2 text-base">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-3 border-b">Date</th>
                        <th className="text-left py-2 px-3 border-b">Title</th>
                        <th className="text-left py-2 px-3 border-b">Author</th>
                        <th className="text-left py-2 px-3 border-b">Amount</th>
                        <th className="text-left py-2 px-3 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((req, i) => (
                        <tr key={i} className="border-b">
                            <td className="py-2 px-3">{req.date}</td>
                            <td className="py-2 px-3">{req.title}</td>
                            <td className="py-2 px-3">{req.author}</td>
                            <td className="py-2 px-3">{req.amount}</td>
                            <td>
                                <span className={`${getStatusColor(req.status)} text-white text-sm font-semibold px-4 py-1 rounded-full`}>
                                    {req.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {currentData.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No purchase requests available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {
                totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => setCurrentPage(p => p - 1)}
                        onNext={() => setCurrentPage(p => p + 1)}
                    />
                )
            }
        </>
    );
}
