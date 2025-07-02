'use client'

import { useState } from 'react';
import Pagination from '../pagination';


export default function AccountList({ accounts, itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(accounts.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = accounts.slice(startIdx, startIdx + itemsPerPage);

    return (
        <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account List</h2>
            <table className="min-w-full bg-white border border-purple-100 rounded-xl shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Name</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Username</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Role</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Status</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((acc) => (
                        <tr key={acc.id} className="border-t">
                            <td className="py-2 px-4">{acc.name}</td>
                            <td className="py-2 px-4">{acc.username}</td>
                            <td className="py-2 px-4">
                                <span className={`font-semibold ${acc.role === 'Administrator' ? 'text-purple-600' : acc.role === 'Cashier' ? 'text-blue-600' : 'text-green-600'}`}>
                                    {acc.role}
                                </span>
                            </td>
                            <td className="py-2 px-4">
                                <span className={`font-semibold ${acc.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {acc.status}
                                </span>
                            </td>
                            <td className="py-2 px-4">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage(p => p - 1)}
                    onNext={() => setCurrentPage(p => p + 1)}
                />
            )}
        </>
    )
}