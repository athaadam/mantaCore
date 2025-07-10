'use client';

import React, { useState, useEffect } from 'react';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { getStatusColor } from '@/libs/utils/colors/statuscolor';
import Pagination from '../common/Pagination';
import { formatDate } from '@/libs/utils/formats/formatdate';

// Simple SVG icons to replace @heroicons/react/24/outline
const PencilIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ShoppingCartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
);

const CalendarDaysIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CurrencyDollarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
);

const BuildingOfficeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const PurchaseRequestTable = ({
    purchases = [],
    itemsPerPage = 10,
    onEdit,
    onView,
    onDelete,
    isFiltered = false,
    hasActiveFilters = false
}) => {

    const [currentPage, setCurrentPage] = useState(1);

    // Ensure purchases is always an array
    const purchasesList = Array.isArray(purchases) ? purchases : [];
    const totalPages = Math.ceil(purchasesList.length / itemsPerPage);
    const startIdx = Math.max((currentPage - 1) * itemsPerPage, 0);
    const currentData = purchasesList.slice(startIdx, startIdx + itemsPerPage);




    useEffect(() => {
        const pages = Math.ceil(purchasesList.length / itemsPerPage);
        if (currentPage > pages) {
            setCurrentPage(1);
        }
    }, [purchasesList.length, itemsPerPage, currentPage]);

    if (!Array.isArray(purchases) || purchasesList.length === 0) {
        return (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden">
                <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-violet-50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                            <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-purple-800 tracking-tight">
                                Purchase Requests
                            </h3>
                            <p className="text-purple-600 text-sm mt-1">
                                Manage your purchase request submissions
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <ShoppingCartIcon className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {isFiltered ? 'No purchase requests match your filters' : 'You have no purchase requests yet'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {isFiltered
                            ? 'Try adjusting your search criteria or clearing filters to see more results.'
                            : 'Get started by creating your first purchase request.'
                        }
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Enhanced Header Card */}
            <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-violet-50">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                        <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-purple-800 tracking-tight">
                            Purchase Requests
                        </h3>
                        <p className="text-purple-600 text-sm mt-1">
                            {purchasesList.length} request{purchasesList.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-700">
                    <thead className="bg-gradient-to-r from-purple-50 to-violet-50 text-xs text-slate-700 uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-6 py-5 text-left font-bold">Request ID</th>
                            <th className="px-6 py-5 text-left font-bold">Company</th>
                            <th className="px-6 py-5 text-left font-bold">Date</th>
                            <th className="px-6 py-5 text-left font-bold">Items</th>
                            <th className="px-6 py-5 text-left font-bold">Amount</th>
                            <th className="px-6 py-5 text-left font-bold">Status</th>
                            <th className="px-6 py-5 text-left font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 backdrop-blur-sm">
                        {currentData.map((purchase) => (
                            <tr key={purchase.purchaseID} className="hover:bg-purple-50/70 transition-all duration-200 border-b border-purple-100 last:border-b-0 group">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    #{purchase.purchaseID}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                Request #{purchase.purchaseID}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {purchase.user?.username || 'Unknown User'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {purchase.company?.companyName || purchase.company?.name || 'Unknown Company'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {purchase.company?.email || 'No email'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        <div className="text-sm text-gray-900">
                                            {formatDate(purchase.updated_at)}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="max-w-xs">
                                        {purchase.items?.length > 0 ? (
                                            <div className="space-y-1">
                                                {purchase.items.slice(0, 2).map((item, idx) => (
                                                    <div key={idx} className="text-sm">
                                                        <span className="font-medium">{item.quantity || 1}x</span>{' '}
                                                        <span className="text-gray-700">{item.item?.name || item.name || 'Unknown Item'}</span>
                                                    </div>
                                                ))}
                                                {purchase.items.length > 2 && (
                                                    <div className="text-xs text-gray-500">
                                                        +{purchase.items.length - 2} more items
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 text-sm">No items</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatRupiah(purchase.amount)}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(purchase.status)}`}>
                                        {purchase.status || 'Unknown'}
                                    </span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(purchase)}
                                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded-lg hover:bg-blue-50"
                                            title="View Details"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(purchase)}
                                            className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded-lg hover:bg-indigo-50"
                                            title="Edit Request"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(purchase)}
                                            className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-lg hover:bg-red-50"
                                            title="Delete Request"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Enhanced Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />
        </div>
    );
};

export default PurchaseRequestTable;
