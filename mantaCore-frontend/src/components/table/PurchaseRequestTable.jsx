'use client';

import React, { useMemo } from 'react';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { getStatusColor } from '@/libs/utils/colors/statuscolor';

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
    loading = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    onEdit,
    onView,
    onDelete,
    onSort,
    sortField = '',
    sortDirection = 'asc',
    isFiltered = false,
    hasActiveFilters = false
}) => {
    const handleSort = (field) => {
        if (onSort) {
            onSort(field);
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    // const getStatusColor = (status) => {
    //     switch (status?.toLowerCase()) {
    //         case 'pending':
    //             return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    //         case 'approved':
    //             return 'bg-green-100 text-green-800 border-green-200';
    //         case 'rejected':
    //             return 'bg-red-100 text-red-800 border-red-200';
    //         case 'processing':
    //             return 'bg-blue-100 text-blue-800 border-blue-200';
    //         default:
    //             return 'bg-gray-100 text-gray-800 border-gray-200';
    //     }
    // };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const sortedPurchases = useMemo(() => {
        // Ensure purchases is an array
        if (!Array.isArray(purchases)) {
            console.log('Purchases is not an array:', purchases);
            return [];
        }

        // If no sortField is specified, return original array
        if (!sortField) {
            return [...purchases];
        }

        return [...purchases].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (sortField === 'date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [purchases, sortField, sortDirection]);

    console.log('PurchaseRequestTable - purchases:', purchases);
    console.log('PurchaseRequestTable - sortedPurchases:', sortedPurchases);

    if (loading) {
        return (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden">
                <div className="px-8 pt-8 pb-6">
                    <div className="animate-pulse">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-100 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!Array.isArray(purchases) || purchases.length === 0) {
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
                        {isFiltered ? 'No purchase requests match your filters' : 'No purchase requests yet'}
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
                            {purchases.length} request{purchases.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-700">
                    <thead className="bg-gradient-to-r from-purple-50 to-violet-50 text-xs text-slate-700 uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-6 py-5 text-left font-bold">
                                <button
                                    onClick={() => handleSort('purchaseID')}
                                    className="flex items-center space-x-1 hover:text-purple-700 transition-colors"
                                >
                                    <span>Request ID</span>
                                    <span className="text-purple-400">{getSortIcon('purchaseID')}</span>
                                </button>
                            </th>
                            <th className="px-6 py-5 text-left font-bold">
                                <button
                                    onClick={() => handleSort('company')}
                                    className="flex items-center space-x-1 hover:text-purple-700 transition-colors"
                                >
                                    <span>Company</span>
                                    <span className="text-purple-400">{getSortIcon('company')}</span>
                                </button>
                            </th>
                            <th className="px-6 py-5 text-left font-bold">
                                <button
                                    onClick={() => handleSort('date')}
                                    className="flex items-center space-x-1 hover:text-purple-700 transition-colors"
                                >
                                    <span>Date</span>
                                    <span className="text-purple-400">{getSortIcon('date')}</span>
                                </button>
                            </th>
                            <th className="px-6 py-5 text-left font-bold">Items</th>
                            <th className="px-6 py-5 text-left font-bold">
                                <button
                                    onClick={() => handleSort('amount')}
                                    className="flex items-center space-x-1 hover:text-purple-700 transition-colors"
                                >
                                    <span>Amount</span>
                                    <span className="text-purple-400">{getSortIcon('amount')}</span>
                                </button>
                            </th>
                            <th className="px-6 py-5 text-left font-bold">
                                <button
                                    onClick={() => handleSort('status')}
                                    className="flex items-center space-x-1 hover:text-purple-700 transition-colors"
                                >
                                    <span>Status</span>
                                    <span className="text-purple-400">{getSortIcon('status')}</span>
                                </button>
                            </th>
                            <th className="px-6 py-5 text-left font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 backdrop-blur-sm">
                        {sortedPurchases.map((purchase) => (
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
                                                {purchase.user?.name || 'Unknown User'}
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
                                            {formatDate(purchase.date)}
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
            {totalPages > 1 && (
                <div className="px-8 py-6 bg-gradient-to-r from-white via-purple-50 to-violet-50 border-t border-purple-100 flex justify-between items-center rounded-b-3xl">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="text-sm text-slate-600 font-medium">
                            Page <span className="font-medium">{currentPage}</span> of{' '}
                            <span className="font-medium">{totalPages}</span>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => onPageChange(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pageNum === currentPage
                                                    ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseRequestTable;
