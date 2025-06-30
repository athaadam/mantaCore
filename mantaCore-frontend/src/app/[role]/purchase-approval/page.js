'use client';

import SummaryCards from '@/components/dashboard/summarycards';
import { useState } from 'react';
import Pagination from '@/components/pagination';

export default function PurchaseApprovalPage() {

    const [filter, setFilter] = useState({
        from: '',
        to: '',
        category: '',
        status: '',
    });

    const summaryData = {
        totalRequests: 120,
        approvedRequests: 80,
        pendingRequests: 30,
        rejectedRequests: 10,
    };

    const allData = [
        {
            date: '2025-04-01',
            id: 'PR-001',
            requester: 'John Doe',
            category: 'Production',
            items: 'Fork, Spoon',
            amount: 'Rp3.000.000',
            status: 'Pending',
        },
        {
            date: '2025-04-02',
            id: 'PR-002',
            requester: 'Jane Smith',
            category: 'Finance',
            items: 'Laptop',
            amount: 'Rp15.000.000',
            status: 'Approved',
        },
        {
            date: '2025-04-03',
            id: 'PR-003',
            requester: 'Ali Akbar',
            category: 'Logistics',
            items: 'Truck Spare Part',
            amount: 'Rp20.000.000',
            status: 'Rejected',
        },
        // ... tambahkan lebih banyak data dummy untuk testing
    ];

    // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    // Data yang akan ditampilkan di halaman saat ini
    const paginatedData = allData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Purchase Approval
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 drop-shadow-lg mb-8 w-full">
                <SummaryCards
                    data={summaryData}
                    only={['totalRequests', 'approvedRequests', 'pendingRequests', 'rejectedRequests']}
                />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 bg-[#f3f1ff] px-4 py-4 rounded-xl mb-6">
                <div className="flex items-center gap-2">
                    <label>From:</label>
                    <input type="date" className="px-2 py-1 rounded border" />
                </div>
                <div className="flex items-center gap-2">
                    <label>To:</label>
                    <input type="date" className="px-2 py-1 rounded border" />
                </div>
                <select className="px-3 py-1 rounded border">
                    <option>Category</option>
                    <option>Production</option>
                    <option>Finance</option>
                    <option>Logistics</option>
                </select>
                <select className="px-3 py-1 rounded border">
                    <option>Status: All</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                </select>
                <button className="bg-[#6A5ACD] text-white px-4 py-1 rounded hover:opacity-90">
                    Apply Filter
                </button>
                <button className="ml-auto bg-[#7c70e8] text-white px-4 py-1 rounded hover:opacity-90">
                    Export as PDF
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Request ID</th>
                            <th className="px-4 py-3">Requester</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Items</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, idx) => (
                            <tr key={idx} className="border-t text-sm">
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-4 py-3">{item.id}</td>
                                <td className="px-4 py-3">{item.requester}</td>
                                <td className="px-4 py-3">{item.category}</td>
                                <td className="px-4 py-3">{item.items}</td>
                                <td className="px-4 py-3">{item.amount}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs font-medium ${item.status === 'Approved'
                                                ? 'bg-green-500'
                                                : item.status === 'Pending'
                                                    ? 'bg-orange-400'
                                                    : 'bg-red-500'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <a href="#" className="text-[#6A5ACD] hover:underline">
                                        View Detail
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
}
