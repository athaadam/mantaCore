'use client';

import { formatDate } from '@/libs/utils/formats/formatdate';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { getStatusColor } from '@/libs/utils/colors/statuscolor';


// Simple SVG icons to replace @heroicons/react/24/outline
const XMarkIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ShoppingCartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
);

const BuildingOfficeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

const UserIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const DocumentTextIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ClipboardDocumentListIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const InformationCircleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PurchaseViewModal = ({ isOpen, onClose, purchase }) => {
    if (!isOpen || !purchase) return null;

    const calculateItemTotal = (quantity, price) => {
        return quantity * (price || 0);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-200 transform transition-all duration-200 scale-100 z-10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Purchase Request #{purchase.purchaseID}
                            </h3>
                            <p className="text-sm text-gray-500">
                                View purchase request details
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
                                <h4 className="font-medium text-gray-900">Company Information</h4>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium">Name:</span> {purchase.company?.companyName || purchase.company?.name || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Email:</span> {purchase.company?.email || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Phone:</span> {purchase.company?.phone || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                                <h4 className="font-medium text-gray-900">Request Details</h4>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium">Date:</span> {formatDate(purchase.date)}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Requested by:</span> {purchase.user?.name || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Status:</span>
                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(purchase.status)}`}>
                                        {purchase.status || 'Unknown'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500" />
                            <h4 className="font-medium text-gray-900">Purchase Items</h4>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Item
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Item Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {purchase.items && purchase.items.length > 0 ? (
                                        purchase.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.item?.name || item.name || 'Unknown Item'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.item?.category || item.category || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.quantity}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {formatRupiah(item.itemPrice || item.unitPrice || 0)}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {formatRupiah(calculateItemTotal(item.quantity, item.itemPrice || item.unitPrice))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                                No items found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                                <h4 className="text-lg font-medium text-gray-900">Total Amount</h4>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">
                                {formatRupiah(purchase.amount)}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">Items Count:</span>
                                <span className="ml-2 text-gray-900">
                                    {purchase.items?.length || 0}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Total Quantity:</span>
                                <span className="ml-2 text-gray-900">
                                    {purchase.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Average Price:</span>
                                <span className="ml-2 text-gray-900">
                                    {purchase.items?.length > 0
                                        ? formatRupiah(purchase.amount / purchase.items.length)
                                        : formatRupiah(0)
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                            <div>
                                <span className="font-medium">Created:</span> {formatDate(purchase.created_at)}
                            </div>
                            <div className='text-right'>
                                <span className="font-medium">Last Updated:</span> {formatDate(purchase.updated_at)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseViewModal;
