'use client';

import React from 'react';
import InvoiceAction from '@/components/action/InvoiceAction';
import Pagination from '@/components/common/Pagination';
import { formatDate } from '../../libs/utils/formats/formatdate';
import { usePagination } from '../../hooks/usePagination';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';

const InvoiceTable = ({ invoices = [], itemsPerPage = 5, onEdit, onDelete, onView, isFiltered = false }) => {
    const {
        currentPage,
        totalPages,
        visibleItems: visibleInvoices,
        handlePrev,
        handleNext
    } = usePagination(invoices, itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    // Format currency
    const formatCurrency = (amount) => {
        return formatRupiah(amount, 'IDR');
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

    return (
        <>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-indigo-50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-purple-800 tracking-tight">
                                Invoice Records
                            </h2>
                            <p className="text-purple-600 text-sm mt-1">
                                Manage and track your invoices efficiently
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                                    {['No', 'Invoice #', 'Customer', 'Amount', 'Status', 'Issue Date', 'Due Date', 'Actions'].map((header) => (
                                        <th key={header} className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-purple-100">
                                {visibleInvoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                                                    {isFiltered ? (
                                                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold text-slate-600 mb-2">
                                                        {isFiltered ? 'No Matching Invoices' : 'No Invoices Found'}
                                                    </p>
                                                    <p className="text-sm text-slate-400">
                                                        {isFiltered
                                                            ? 'Try adjusting your filters to see more results'
                                                            : 'Create your first invoice to get started with billing management'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    visibleInvoices.map((invoice, idx) => (
                                        <tr key={invoice.invoiceID} className="hover:bg-purple-50/70 transition-all duration-200 group">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-full text-xs font-bold text-purple-700">
                                                    {startIndex + idx + 1}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900">
                                                            {invoice.invoice_number || `${invoice.invoiceID}`}
                                                        </div>
                                                        <div className="text-xs text-purple-600 font-medium">Invoice</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-900">
                                                            {invoice.costumer?.username || invoice.customer_name || 'Unknown Customer'}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {invoice.costumer?.email || invoice.customer_email || ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-slate-900">
                                                    {invoice.items.map(item => formatCurrency(item.subTotal))}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {invoice.currency || 'IDR'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium border ${getStatusBadge(invoice.status)}`}>
                                                    {invoice.status ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-slate-600">
                                                {formatDate(invoice.date)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-slate-600">
                                                <div className={`${invoice.due_date && new Date(invoice.due_date) < new Date() && invoice.status !== 'paid' ? 'text-red-600 font-bold' : ''}`}>
                                                    {invoice.due_date ? formatDate(invoice.due_date) : 'No due date'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <InvoiceAction
                                                    invoice={invoice}
                                                    onDelete={onDelete}
                                                    onUpdate={onEdit}
                                                    onView={onView}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                </div>
            )}
        </>
    );
};

export default InvoiceTable;
