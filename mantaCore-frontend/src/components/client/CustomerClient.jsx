'use client';

import { useState } from "react";
import CustomerTable from "@/components/table/CustomerTable";
import CustomerModal from "@/components/modal/CustomerModal";

export default function CustomerClient({ initialCustomers, profile }) {
    const [customers, setCustomers] = useState(initialCustomers || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedCustomer, setSelectedCustomer] = useState(null);


    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDelete = (idToDelete) => {
        setCustomers(prev => prev.filter(c => c.costumerID !== idToDelete));
    };

    const handleSubmitModal = (newData, mode) => {
        if (mode === 'edit') {
            setCustomers(prev => prev.map(c => c.costumerID === newData.costumerID ? newData : c));
        } else {
            setCustomers(prev => [newData, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 mb-8 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v6m0 0h-6m6 0l-6-6" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white drop-shadow-sm">
                                    Customer Management
                                </h1>
                                <p className="text-purple-100 text-sm mt-1">
                                    Manage your customers for <span className="font-semibold text-white">{profile.company.companyName || 'Your Company'}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleOpenAdd}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:bg-purple-50 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 group"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Customer
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer List Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 px-8 py-6 border-b border-purple-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Customer Directory</h2>
                            <p className="text-gray-500 text-sm">View and manage all your customers</p>
                        </div>
                        <div className="ml-auto">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {customers.length} Customer{customers.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <CustomerTable
                            customers={customers}
                            itemsPerPage={5}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
                
                <CustomerModal
                    mode={modalMode}
                    customer={selectedCustomer}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmitModal}
                />
            </div>
        </div>
    );
}
