'use client';

import { useState, useMemo } from "react";
import CustomerTable from "@/components/table/CustomerTable";
import CustomerModal from "@/components/modal/CustomerModal";
import { extractErrorMessage } from "@/libs/exceptions/index";
import Alert from "../common/Alert";
import Header2 from "@/components/header/Header2";
import DataCard from "@/components/card/DataCard";
import { apiHit } from "@/libs/api/fetch";
import Cookies from "js-cookie";
import ConfirmationModal from "@/components/modal/ConfirmationModal";


export default function CustomerClient({ initialCustomers, profile }) {
    const [customers, setCustomers] = useState(initialCustomers || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [alert, setAlert] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter customers based on search term
    const filteredCustomers = useMemo(() => {
        if (!searchTerm.trim()) return customers;

        const searchLower = searchTerm.toLowerCase();
        return customers.filter(customer =>
            (customer.username && customer.username.toLowerCase().includes(searchLower)) ||
            (customer.email && customer.email.toLowerCase().includes(searchLower)) ||
            (customer.phone_number && customer.phone_number.toLowerCase().includes(searchLower))
        );
    }, [customers, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setModalMode('edit');
        setIsModalOpen(true);
        setValidationErrors(null); // Clear any previous validation errors
    };

    const initiateDeleteCustomer = (customer) => {
        setSelectedCustomer(customer);
        setDeleteModal(true);
    };

    const handleDelete = async (idToDelete) => {
        try {
            const token = Cookies.get('auth');
            await apiHit(`deleteCostumer/${idToDelete}`, token, 'DELETE');
            setCustomers(prev => prev.filter(c => c.costumerID !== idToDelete));
            setAlert({ type: 'success', message: 'Customer deleted successfully!' });
        } catch (error) {
            const message = extractErrorMessage(error);
            setAlert({ type: 'error', message: message || 'Failed to delete customer' });
        }
    };

    const handleSubmitModal = async (newData, mode) => {
        try {
            const token = Cookies.get('auth');

            if (mode === 'edit') {
                const data = await apiHit(`updateCostumer/${selectedCustomer.costumerID}`, token, 'POST', newData);
                setCustomers(prev =>
                    prev.map(c => (c.costumerID === data.costumer.costumerID ? data.costumer : c))
                );
                setAlert({ type: 'success', message: 'Customer updated successfully!' });
                setIsModalOpen(false);
            } else {
                const dataToSend = {
                    username: newData.username,
                    email: newData.email,
                    phone_number: newData.phone_number,
                };
                const data = await apiHit('createCostumer', token, 'POST', dataToSend);
                setCustomers(prev => [data.costumer, ...prev]);
                setAlert({ type: 'success', message: 'Customer added successfully!' });
                setIsModalOpen(false);
            }

            // Clear validation errors on success
            setValidationErrors(null);

        } catch (error) {
            // Check if error contains validation errors from backend
            if (error.response && error.response.data && error.response.data.errors) {
                // Pass backend validation errors to the modal
                throw { validation: error.response.data.errors };
            } else {
                // General error handling
                const message = extractErrorMessage(error);
                setAlert({ type: 'error', message: message || `Failed to ${mode === 'edit' ? 'update' : 'add'} customer` });
            }
            setIsModalOpen(false); // Close modal on error
        }
    };


    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedCustomer(null);
        setValidationErrors(null); // Clear any previous validation errors
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">

            {/* Header2 Component for Customer Actions */}
            <Header2
                title="Customer Management"
                description="Manage your customers for"
                companyName={profile.company.companyName || 'Your Company'}
                colorScheme="purple"
                icon={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                }
                onAdd={handleOpenAdd}
            />

            {/* Alert Section */}
            <div className="fixed bottom-4 right-4 z-50">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>

            {/* DataCard Wrapper for Main Content */}
            <DataCard
                title="Customer Directory"
                subtitle="View, manage, and organize all your customer relationships in one place"
                icon={
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                }
                gradient="bg-gradient-to-br from-white via-purple-50 to-indigo-100"
            >
                {/* Customer Stats Section */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                            <span className="text-sm font-semibold text-slate-700">Total Customers:</span>
                            <span className="ml-2 font-bold text-purple-600">{customers.length}</span>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                            <span className="text-sm font-semibold text-slate-700">With Email:</span>
                            <span className="ml-2 font-bold text-purple-600">
                                {customers.filter(c => c.email && c.email.trim() !== '').length}
                            </span>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                            <span className="text-sm font-semibold text-slate-700">With Phone:</span>
                            <span className="ml-2 font-bold text-purple-600">
                                {customers.filter(c => c.phone_number && c.phone_number.trim() !== '').length}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                        Active Relations: <span className="font-bold text-purple-600">{customers.length}</span>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white/80 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Search by name, email, or phone number..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {searchTerm && (
                        <div className="mt-2 flex items-center">
                            <span className="text-sm text-purple-700 font-medium">
                                Found {filteredCustomers.length} result{filteredCustomers.length !== 1 ? 's' : ''}
                            </span>
                            {filteredCustomers.length !== customers.length && (
                                <button
                                    className="ml-2 text-xs text-gray-600 hover:text-purple-700 underline"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Customer Table - With horizontal scroll for responsiveness */}
                <div className="relative overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <CustomerTable
                            customers={filteredCustomers}
                            itemsPerPage={5}
                            onEdit={handleEdit}
                            onDelete={initiateDeleteCustomer}
                        />
                    </div>
                </div>
            </DataCard>

            {/* Customer Modal */}
            <CustomerModal
                mode={modalMode}
                customer={selectedCustomer}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setValidationErrors(null); // Clear validation errors when closing modal
                }}
                onSubmit={handleSubmitModal}
                validationErrors={validationErrors}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setSelectedCustomer(null);
                }}
                onConfirm={() => {
                    if (selectedCustomer?.costumerID) {
                        handleDelete(selectedCustomer.costumerID);
                    }
                    setDeleteModal(false);
                }}
                title="Delete Customer"
                message={`Are you sure you want to delete the customer "${selectedCustomer?.username || ''}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
}
