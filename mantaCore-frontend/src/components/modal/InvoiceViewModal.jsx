'use client';

import React from 'react';
import { formatDate } from '../../libs/utils/formats/formatdate';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { getStatusColor } from '@/libs/utils/colors/statuscolor';

const InvoiceViewModal = ({ isOpen, onClose, invoice }) => {
    if (!isOpen || !invoice) return null;
    
    // Helper function to count items
    const getTotalItems = () => {
        return invoice.items?.length || 0;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Add PDF download logic here
        // Implementation to be added later
        alert('Download feature will be available soon');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Invoice Details</h2>
                                    <p className="text-purple-100 text-sm">
                                        {invoice.invoice_number}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrint}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                                    title="Print Invoice"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                                    title="Download PDF"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                        {/* Invoice Header */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-800 mb-2">INVOICE</h1>
                                    <p className="text-slate-600">Invoice ID: {invoice.invoiceID}</p>
                                </div>
                                <div className="text-right">
                                    <div className="mb-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor('draft')}`}>
                                            {invoice.date ? formatDate(invoice.date) : 'Date Pending'}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-800">
                                        {formatRupiah(invoice.amount)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Company Information */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Company Information</h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-slate-800">{invoice.company?.companyName || 'Your Company'}</p>
                                    <p className="text-slate-600">{invoice.user?.email || ''}</p>
                                    <p className="text-slate-600">{invoice.user?.phone_number || ''}</p>
                                    {/* <p className="text-slate-600">{invoice.company?.companyPhone || ''}</p> */}
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Customer Information</h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-slate-800">
                                        {invoice.costumer?.username || 'Unknown Customer'}
                                    </p>
                                    <p className="text-slate-600">
                                        {invoice.costumer?.email || 'No email provided'}
                                    </p>
                                    {invoice.costumer?.phone_number && (
                                        <p className="text-slate-600">{invoice.costumer.phone_number}</p>
                                    )}
                                    {/* {invoice.costumer?.address && (
                                        <p className="text-slate-600">{invoice.costumer.address}</p>
                                    )} */}
                                </div>
                            </div>
                        </div>

                        {/* Date Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-medium text-slate-800 mb-2">Invoice Date</h4>
                                <p className="text-slate-600">
                                    {invoice.date ? formatDate(invoice.date) : 'No date provided'}
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-medium text-slate-800 mb-2">Created By</h4>
                                <p className="text-slate-600">
                                    {invoice.user?.username || 'Unknown User'}
                                </p>
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Product</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Type</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Quantity</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Unit Price</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoice.items && invoice.items.length > 0 ? (
                                            invoice.items.map((item, index) => (
                                                <tr key={index} className="border-b border-slate-100">
                                                    <td className="px-6 py-4 text-sm text-slate-800">{item.item?.name || 'Unknown Item'}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{item.type || 'Standard'}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatRupiah(item.unitPrice)}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-800 text-right">{formatRupiah(item.subTotal)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                                    No items found for this invoice
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Invoice Total */}
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">Total Amount</h3>
                                    <p className="text-slate-600 text-sm">Amount due</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-purple-600">
                                        {formatRupiah(invoice.amount)}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        IDR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceViewModal;
