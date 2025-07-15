'use client'

import { useState, useEffect, useMemo } from "react";
import Alert from "../common/Alert";
import ConfirmationModal from "../modal/ConfirmationModal";
import InvoiceModal from "../modal/InvoiceModal";
import InvoiceViewModal from "../modal/InvoiceViewModal";
import InvoiceStats from "../card/InvoiceStatsCards";
import InvoiceTable from "../table/InvoiceTable";
import InvoiceFilter from "../filter/InvoiceFilter";
import Header2 from "../header/Header2";
import DataCard from "../card/DataCard";
import { apiHit } from "@/libs/api/fetch";
import Cookies from "js-cookie";

const InvoicesClient = ({ data }) => {
    const [invoices, setInvoices] = useState(data.myInvoices || []);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [filters, setFilters] = useState({
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customer: '',
        invoiceNumber: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);

    // Fetch invoices if initial data is empty
    useEffect(() => {
        if (data.myInvoices.length === 0) {
            const fetchInvoices = async () => {
                try {
                    const token = Cookies.get('auth');
                    const response = await apiHit('getMyInvoices', token);
                    if (response && response.invoices) {
                        setInvoices(response.invoices);
                    }
                } catch (error) {
                    // No need to show an error alert here, as this is just an initial load attempt
                }
            };
            fetchInvoices();
        }
    }, [data.myInvoices]);
    
    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some(value => value !== '');
    }, [filters]);

    // Filter invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            // Invoice Number filter
            if (filters.invoiceNumber && filters.invoiceNumber.trim() !== '') {
                const searchTerm = filters.invoiceNumber.toLowerCase().trim();
                const invoiceIdStr = String(invoice.invoiceID).toLowerCase();
                const invoiceNumberStr = String(invoice.invoice_number || '').toLowerCase();
                
                if (!invoiceIdStr.includes(searchTerm) && !invoiceNumberStr.includes(searchTerm)) {
                    return false;
                }
            }

            // Customer filter - enhanced to search across multiple customer fields
            if (filters.customer && filters.customer.trim() !== '') {
                const searchTerm = filters.customer.toLowerCase().trim();
                const customerName = String(invoice.costumer?.username || invoice.customer_name || '').toLowerCase();
                const customerEmail = String(invoice.costumer?.email || invoice.customer_email || '').toLowerCase();
                const customerPhone = String(invoice.costumer?.phone || invoice.customer_phone || '').toLowerCase();
                
                if (!customerName.includes(searchTerm) && !customerEmail.includes(searchTerm) && !customerPhone.includes(searchTerm)) {
                    return false;
                }
            }

            // Amount filters
            const amount = invoice.amount || 0;
            if (filters.minAmount && amount < parseFloat(filters.minAmount)) {
                return false;
            }
            if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) {
                return false;
            }

            // Date filtering - enhanced implementation
            const invoiceDate = new Date(invoice.date);
            
            // Custom date range
            if (filters.dateRange === 'custom') {
                if (filters.startDate) {
                    const startDate = new Date(filters.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    if (invoiceDate < startDate) return false;
                }
                
                if (filters.endDate) {
                    const endDate = new Date(filters.endDate);
                    endDate.setHours(23, 59, 59, 999);
                    if (invoiceDate > endDate) return false;
                }
            }
            // Preset date ranges
            else if (filters.dateRange) {
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                
                const startOfDay = new Date(today);
                startOfDay.setHours(0, 0, 0, 0);
                
                switch (filters.dateRange) {
                    case 'today':
                        if (invoiceDate < startOfDay || invoiceDate > today) return false;
                        break;
                    case 'week':
                        const startOfWeek = new Date(today);
                        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
                        startOfWeek.setHours(0, 0, 0, 0);
                        if (invoiceDate < startOfWeek || invoiceDate > today) return false;
                        break;
                    case 'month':
                        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                        if (invoiceDate < startOfMonth || invoiceDate > today) return false;
                        break;
                    case 'quarter':
                        const currentQuarter = Math.floor(today.getMonth() / 3);
                        const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);
                        if (invoiceDate < startOfQuarter || invoiceDate > today) return false;
                        break;
                    case 'year':
                        const startOfYear = new Date(today.getFullYear(), 0, 1);
                        if (invoiceDate < startOfYear || invoiceDate > today) return false;
                        break;
                }
            }

            return true;
        });
    }, [invoices, filters]);

    // Handler for filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Add invoice handler
    const handleAddInvoice = () => {
        setModalMode('add');
        setSelectedInvoice(null);
        setIsInvoiceModalOpen(true);
    };

    // Edit invoice handler
    const handleEditInvoice = (invoice) => {
        setModalMode('edit');
        setSelectedInvoice(invoice);
        setIsInvoiceModalOpen(true);
    };

    // Delete invoice handler
    const handleDeleteInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setIsDeleteModalOpen(true);
    };

    // View invoice handler
    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setIsViewModalOpen(true);
    };

    // Save invoice (create or update)
    const handleSaveInvoice = async (invoiceData, mode) => {
        try {
            setLoading(true);
            const token = Cookies.get('auth');
            
            if (mode === 'add') {
                // Create new invoice
                const response = await apiHit('createInvoice', token, 'POST', invoiceData);
                
                if (response) {
                    // Refresh the list
                    try {
                        const updatedInvoices = await apiHit('getMyInvoices', token);
                        setInvoices(updatedInvoices.invoices || []);
                    } catch (refreshError) {
                        // If there's an error refreshing, we'll still use the response message but keep old invoices
                        console.error('Error refreshing invoices:', refreshError);
                    }
                    
                    setAlert({
                        show: true,
                        type: 'success',
                        message: response.message || 'Invoice created successfully'
                    });
                }
            } else {
                // Update existing invoice
                const response = await apiHit(`updateInvoice/${invoiceData.invoiceID}`, token, 'POST', invoiceData);
                
                if (response) {
                    // Refresh the list
                    try {
                        const updatedInvoices = await apiHit('getMyInvoices', token);
                        setInvoices(updatedInvoices.invoices || []);
                    } catch (refreshError) {
                        // If there's an error refreshing, we'll still use the response message but keep old invoices
                        console.error('Error refreshing invoices:', refreshError);
                    }
                    
                    setAlert({
                        show: true,
                        type: 'success',
                        message: response.message || 'Invoice updated successfully'
                    });
                }
            }
        } catch (error) {
            console.error('Error saving invoice:', error);
            setAlert({
                show: true,
                type: 'error',
                message: error.message || `Failed to ${mode === 'add' ? 'create' : 'update'} invoice`
            });
        } finally {
            setLoading(false);
            setIsInvoiceModalOpen(false);
        }
    };

    // Confirm delete handler
    const handleConfirmDelete = async () => {
        if (!selectedInvoice) return;
        
        try {
            setLoading(true);
            const token = Cookies.get('auth');
            const response = await apiHit(`deleteInvoice/${selectedInvoice.invoiceID}`, token, 'DELETE');
            
            if (response) {
                // Remove from local state
                setInvoices(prev => prev.filter(inv => inv.invoiceID !== selectedInvoice.invoiceID));
                
                setAlert({
                    show: true,
                    type: 'success',
                    message: response.message || 'Invoice deleted successfully'
                });
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
            setAlert({
                show: true,
                type: 'error',
                message: error.message || 'Failed to delete invoice'
            });
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
            setSelectedInvoice(null);
        }
    };

    // Modal close handlers
    const handleInvoiceModalClose = () => {
        setIsInvoiceModalOpen(false);
        setSelectedInvoice(null);
    };

    const handleViewModalClose = () => {
        setIsViewModalOpen(false);
        setSelectedInvoice(null);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedInvoice(null);
    };

    // Auto-hide alert after 5 seconds
    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <>
            {/* Header2 */}
            <Header2
                title="Invoices Operations"
                description={`Manage your invoices for ${data.myProfile.company?.companyName || 'Your Company'}`}
                onAdd={handleAddInvoice}
            />
            
            {/* Invoice Stats */}
            <InvoiceStats invoices={filteredInvoices} />
            
            {/* Alert */}
            {alert.show && (
                <div className="mb-4">
                    <Alert 
                        type={alert.type} 
                        message={alert.message}
                        onClose={() => setAlert({ ...alert, show: false })}
                    />
                </div>
            )}

            <DataCard
                title="My Invoices"
                subtitle="Manage your invoices efficiently"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                }
                gradient={'bg-gradient-to-br from-purple-50 via-white to-indigo-100'}
                onAdd={handleAddInvoice}
            >
                <InvoiceFilter 
                    onFilterChange={handleFilterChange}
                    totalInvoices={invoices.length}
                    filteredCount={filteredInvoices.length}
                />

                <InvoiceTable
                    invoices={filteredInvoices}
                    itemsPerPage={5}
                    onEdit={handleEditInvoice}
                    onDelete={handleDeleteInvoice}
                    onView={handleViewInvoice}
                    isFiltered={hasActiveFilters}
                />
            </DataCard>
            
            <InvoiceViewModal 
                isOpen={isViewModalOpen}
                onClose={handleViewModalClose}
                invoice={selectedInvoice}
            />
            
            <InvoiceModal 
                isOpen={isInvoiceModalOpen}
                onClose={handleInvoiceModalClose}
                invoice={selectedInvoice}
                onSave={handleSaveInvoice}
                mode={modalMode}
                customers={data.customer || []}
                items={data.items || []}
            />                <ConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleConfirmDelete}
                title="Delete Invoice"
                message={`Are you sure you want to delete invoice ${selectedInvoice?.invoiceID}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                loading={loading}
            />
        </>
    )
}

export default InvoicesClient;