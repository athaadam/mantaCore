'use client';

import React from 'react';
import { formatDate } from '../../libs/utils/formats/formatdate';

const InvoiceViewModal = ({ isOpen, onClose, invoice }) => {
    if (!isOpen || !invoice) return null;

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: invoice.currency || 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Get status badge styles
    const getStatusBadge = (status) => {
        const statusStyles = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'paid': 'bg-green-100 text-green-800 border-green-200',
            'overdue': 'bg-red-100 text-red-800 border-red-200',
            'draft': 'bg-gray-100 text-gray-800 border-gray-200',
            'cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
        };
        
        return statusStyles[status?.toLowerCase()] || statusStyles['draft'];
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Add PDF download logic here
        console.log('Download PDF for invoice:', invoice.invoiceID);
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
                                    <p className="text-slate-600">Invoice #{invoice.invoice_number}</p>
                                </div>
                                <div className="text-right">
                                    <div className="mb-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(invoice.status)}`}>
                                            {invoice.status ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) : 'Draft'}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-800">
                                        {formatCurrency(invoice.total_amount)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Bill From */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Bill From</h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-slate-800">Your Company</p>
                                    <p className="text-slate-600">123 Business Street</p>
                                    <p className="text-slate-600">City, State 12345</p>
                                    <p className="text-slate-600">contact@yourcompany.com</p>
                                    <p className="text-slate-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            {/* Bill To */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Bill To</h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-slate-800">
                                        {invoice.customer?.username || 'Unknown Customer'}
                                    </p>
                                    <p className="text-slate-600">
                                        {invoice.customer?.email || 'No email provided'}
                                    </p>
                                    {invoice.customer?.address && (
                                        <p className="text-slate-600">{invoice.customer.address}</p>
                                    )}
                                    {invoice.customer?.phone && (
                                        <p className="text-slate-600">{invoice.customer.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Date Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-medium text-slate-800 mb-2">Issue Date</h4>
                                <p className="text-slate-600">
                                    {invoice.issue_date ? formatDate(invoice.issue_date) : formatDate(invoice.created_at)}
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-medium text-slate-800 mb-2">Due Date</h4>
                                <p className={`${invoice.due_date && new Date(invoice.due_date) < new Date() && invoice.status !== 'paid' ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
                                    {invoice.due_date ? formatDate(invoice.due_date) : 'No due date'}
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                <h4 className="font-medium text-slate-800 mb-2">Currency</h4>
                                <p className="text-slate-600">{invoice.currency || 'USD'}</p>
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
                                            <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Description</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Quantity</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Unit Price</th>
                                            <th className="text-right px-6 py-3 text-sm font-medium text-slate-700">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoice.items && invoice.items.length > 0 ? (
                                            invoice.items.map((item, index) => (
                                                <tr key={index} className="border-b border-slate-100">
                                                    <td className="px-6 py-4 text-sm text-slate-800">{item.description}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatCurrency(item.unit_price)}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-800 text-right">{formatCurrency(item.total)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
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
                                        {formatCurrency(invoice.total_amount)}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {invoice.currency || 'USD'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {invoice.description && (
                            <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Notes</h3>
                                <p className="text-slate-600">{invoice.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceViewModal;
