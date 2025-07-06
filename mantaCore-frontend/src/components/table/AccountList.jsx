'use client';

import Pagination from '../../utils/Pagination';

export default function AccountList({ accounts, itemsPerPage, currentPage, onPageChange, onDelete, onEdit }) {

    const totalPages = Math.ceil(accounts.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = accounts.slice(startIdx, startIdx + itemsPerPage);

    if (accounts.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                No accounts found.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-purple-100 rounded-xl shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Username</th>
                            <th className="py-3 px-4 text-left">Phone Number</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((acc) => (
                            <tr key={acc.userID} className="hover:bg-gray-50 transition">
                                <td className="py-2 px-4">{acc.email || '-'}</td>
                                <td className="py-2 px-4">{acc.username || '-'}</td>
                                <td className="py-2 px-4">{acc.phone_number || '-'}</td>
                                <td className="py-2 px-4 capitalize font-semibold">
                                    <span
                                        className={
                                            acc.role === 'admin'
                                                ? 'text-purple-600'
                                                : acc.role === 'cashier'
                                                    ? 'text-blue-600'
                                                    : 'text-green-600'
                                        }
                                    >
                                        {acc.role || '-'}
                                    </span>
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => onEdit(acc)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => onDelete(acc.userID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => onPageChange(Math.max(currentPage - 1, 1))}
                    onNext={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                />
            )}
        </div>
    );
}
