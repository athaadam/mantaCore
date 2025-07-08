'use client';

import { useState } from "react";
import CustomerTable from "@/components/table/CustomerTable";
import CustomerModal from "@/components/modal/CustomerModal";
import { createCustomer, updateCustomerById } from "@/libs/api/customer";
import { getToken } from "@/libs/api/auth";
import { extractErrorMessage } from "@/libs/exceptions";
import Alert from "../utils/Alert";
import Header2 from "@/components/header/Header2";
import DataCard from "@/components/card/DataCard";


export default function CustomerClient({ initialCustomers, profile }) {
    const [customers, setCustomers] = useState(initialCustomers || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDelete = (idToDelete) => {
        setCustomers(prev => prev.filter(c => c.costumerID !== idToDelete));
    };

    const handleSubmitModal = async (newData, mode) => {
        if (mode === 'edit') {
            try {
                const token = await getToken();
                const data = await updateCustomerById(newData.costumerID, newData, token);
                setCustomers(prev =>
                    prev.map(c => (c.costumerID === data.costumerID ? data : c))
                );
                console.log('Customer updated:', data);
                setAlert({ type: 'success', message: 'Customer updated successfully!' });
            } catch (error) {
                const message = extractErrorMessage(error);
                setAlert({ type: 'error', message: message || 'Failed to update customer' });
            }
        } else {
            try {
                const token = await getToken();
                const dataToSend = {
                    username: newData.username,
                    companyID: profile.company.companyID,
                };
                const data = await createCustomer(dataToSend, token);
                setCustomers(prev => [data, ...prev]);
                setAlert({ type: 'success', message: 'Customer added successfully!' });
            } catch (error) {
                const message = extractErrorMessage(error);
                setAlert({ type: 'error', message: message || 'Failed to add customer' });
            }
        }
        setIsModalOpen(false);
    };


    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedCustomer(null);
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
            {alert && (
                <div className="mb-6">
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

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
                    <div className="flex items-center gap-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                            <span className="text-sm font-semibold text-slate-700">Total Customers:</span>
                            <span className="ml-2 font-bold text-purple-600">{customers.length}</span>
                        </div>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                        Active Relations: <span className="font-bold text-purple-600">{customers.length}</span>
                    </div>
                </div>

                {/* Customer Table - Full width, no horizontal scroll */}
                <div className="w-full">
                    <CustomerTable
                        customers={customers}
                        itemsPerPage={5}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </DataCard>

            {/* Customer Modal */}
            <CustomerModal
                mode={modalMode}
                customer={selectedCustomer}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitModal}
            />
        </div>
    );
}
