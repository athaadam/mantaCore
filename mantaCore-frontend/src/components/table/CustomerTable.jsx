'use client';

import { useState } from "react";
import { formatDate } from "../utils/formatdate";
import Pagination from "../utils/Pagination";
import CustomerAction from "../action/CustomerAction";
import CustomerModal from "../modal/CustomerModal";

const CustomerTable = ({ customers: initialCustomers = [], itemsPerPage = 5 }) => {
    const [modalMode, setModalMode] = useState('add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState(initialCustomers);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(customers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const handleDeleteCustomer = (idToDelete) => {
        const updatedCustomers = customers.filter(c => c.costumerID !== idToDelete);
        const newTotalPages = Math.ceil(updatedCustomers.length / itemsPerPage);
        const newCurrentPage = currentPage > newTotalPages ? newTotalPages : currentPage;
        setCustomers(updatedCustomers);
        setCurrentPage(newCurrentPage || 1);
    };

    const handleEditCustomer = (customer) => {
        setModalMode('edit');
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleSubmitModal = (newData, mode) => {
        if (mode === 'edit') {
            setCustomers(customers.map((c) =>
                c.costumerID === newData.costumerID ? newData : c
            ));
        } else {
            setCustomers([newData, ...customers]);
        }

        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                {['No', 'Name', 'Created At', 'Updated At', 'Action'].map((header) => (
                                    <th
                                        key={header}
                                        className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {visibleCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-500">
                                            <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-lg font-medium text-slate-900">No customers found</p>
                                                <p className="text-sm">Add your first customer to get started</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                visibleCustomers.map((customer, idx) => (
                                    <tr
                                        key={customer.costumerID}
                                        className="hover:bg-slate-50 transition-colors duration-150"
                                    >
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                                {startIndex + idx + 1}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full">
                                                    <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">{customer.username}</div>
                                                    <div className="text-xs text-slate-500">Customer</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {formatDate(customer.created_at)}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {formatDate(customer.updated_at)}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <CustomerAction customer={customer} onDelete={handleDeleteCustomer} onUpdate={handleEditCustomer} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
            <CustomerModal
                mode={modalMode}
                customer={selectedCustomer}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
            />

        </>
    );
};

export default CustomerTable;
