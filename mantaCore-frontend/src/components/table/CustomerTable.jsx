'use client';

import React, { useState } from 'react';
import CustomerAction from '@/components/action/CustomerAction';
import Pagination from '@/components/common/Pagination';
import { formatDate } from '../../libs/utils/formats/formatdate';


const CustomerTable = ({ customers = [], itemsPerPage = 5, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-visible hover:shadow-2xl transition-all duration-300">
                <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-indigo-50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-purple-800 tracking-tight">
                                Customer Records
                            </h2>
                            <p className="text-purple-600 text-sm mt-1">
                                Manage and track customer relationships
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 overflow-x-auto block w-full">
                    <table className="w-full min-w-[1000px] table-auto">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                                {['No', 'Customer Name', 'Email', 'Phone', 'Created', 'Updated', 'Actions'].map((header) => (
                                    <th key={header} className="px-4 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-purple-100">
                            {visibleCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                                                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-600 mb-2">No Customers Found</p>
                                                <p className="text-sm text-slate-400">Add your first customer to get started with relationship management</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                visibleCustomers.map((customer, idx) => (
                                    <tr key={customer.costumerID} className="hover:bg-purple-50/70 transition-all duration-200 group">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-full text-xs font-bold text-purple-700">
                                                {startIndex + idx + 1}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">{customer.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {customer.email ? (
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                    </svg>
                                                    <a href={`mailto:${customer.email}`} className="text-sm text-slate-700 hover:text-purple-600 truncate max-w-[200px]">
                                                        {customer.email}
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Not provided</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {customer.phone_number ? (
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                    </svg>
                                                    <a href={`tel:${customer.phone_number}`} className="text-sm text-slate-700 hover:text-purple-600">
                                                        {customer.phone_number}
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Not provided</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-slate-600">
                                            {formatDate(customer.created_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-slate-600">
                                            {formatDate(customer.updated_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <CustomerAction customer={customer} onDelete={onDelete} onUpdate={onEdit} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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

export default CustomerTable;
