'use client';

import Header2 from "@/components/header/Header2"
import Header3 from "@/components/header/Header3"
import InvoiceTable from "@/components/table/InvoiceTable"
import InvoiceFilter from "@/components/filter/InvoiceFilter"
import InvoiceStats from "@/components/stats/InvoiceStats"
import InvoiceModal from "@/components/modal/InvoiceModal"
import InvoiceViewModal from "@/components/modal/InvoiceViewModal"
import ConfirmationModal from "@/components/modal/ConfirmationModal"
import { useState, useMemo } from "react"

const Page = () => {
    // Sample invoice data - replace with your actual data fetching logic
    const [invoices, setInvoices] = useState([
        {
            invoiceID: 1,
            invoice_number: "INV-2025-001",
            customer: { username: "John Doe", email: "john@example.com" },
            total_amount: 1500.00,
            status: "paid",
            issue_date: "2025-01-15T10:30:00Z",
            due_date: "2025-02-15T10:30:00Z",
            created_at: "2025-01-15T10:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 2,
            invoice_number: "INV-2025-002",
            customer: { username: "Jane Smith", email: "jane@example.com" },
            total_amount: 2300.50,
            status: "pending",
            issue_date: "2025-01-20T14:15:00Z",
            due_date: "2025-02-20T14:15:00Z",
            created_at: "2025-01-20T14:15:00Z",
            currency: "USD"
        },
        {
            invoiceID: 3,
            invoice_number: "INV-2025-003",
            customer: { username: "Bob Johnson", email: "bob@example.com" },
            total_amount: 750.25,
            status: "overdue",
            issue_date: "2024-12-10T09:00:00Z",
            due_date: "2025-01-10T09:00:00Z",
            created_at: "2024-12-10T09:00:00Z",
            currency: "USD"
        },
        {
            invoiceID: 4,
            invoice_number: "INV-2025-004",
            customer: { username: "Alice Brown", email: "alice@example.com" },
            total_amount: 3200.00,
            status: "draft",
            issue_date: "2025-01-25T16:45:00Z",
            due_date: "2025-02-25T16:45:00Z",
            created_at: "2025-01-25T16:45:00Z",
            currency: "USD"
        },
        {
            invoiceID: 5,
            invoice_number: "INV-2025-005",
            customer: { username: "Charlie Wilson", email: "charlie@example.com" },
            total_amount: 890.75,
            status: "pending",
            issue_date: "2025-01-22T11:20:00Z",
            due_date: "2025-02-22T11:20:00Z",
            created_at: "2025-01-22T11:20:00Z",
            currency: "USD"
        },
        {
            invoiceID: 6,
            invoice_number: "INV-2025-006",
            customer: { username: "David Miller", email: "david@example.com" },
            total_amount: 1200.00,
            status: "paid",
            issue_date: "2025-01-18T13:30:00Z",
            due_date: "2025-02-18T13:30:00Z",
            created_at: "2025-01-18T13:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 7,
            invoice_number: "INV-2025-007",
            customer: { username: "Emma Davis", email: "emma@example.com" },
            total_amount: 4500.75,
            status: "pending",
            issue_date: "2025-01-23T09:15:00Z",
            due_date: "2025-02-23T09:15:00Z",
            created_at: "2025-01-23T09:15:00Z",
            currency: "USD"
        },
        {
            invoiceID: 8,
            invoice_number: "INV-2025-008",
            customer: { username: "Michael Chen", email: "michael@example.com" },
            total_amount: 675.50,
            status: "overdue",
            issue_date: "2024-12-15T11:45:00Z",
            due_date: "2025-01-15T11:45:00Z",
            created_at: "2024-12-15T11:45:00Z",
            currency: "USD"
        },
        {
            invoiceID: 9,
            invoice_number: "INV-2025-009",
            customer: { username: "Sarah Wilson", email: "sarah@example.com" },
            total_amount: 2800.00,
            status: "draft",
            issue_date: "2025-01-26T15:20:00Z",
            due_date: "2025-02-26T15:20:00Z",
            created_at: "2025-01-26T15:20:00Z",
            currency: "USD"
        },
        {
            invoiceID: 10,
            invoice_number: "INV-2025-010",
            customer: { username: "Ryan Garcia", email: "ryan@example.com" },
            total_amount: 1850.25,
            status: "paid",
            issue_date: "2025-01-19T12:00:00Z",
            due_date: "2025-02-19T12:00:00Z",
            created_at: "2025-01-19T12:00:00Z",
            currency: "USD"
        },
        {
            invoiceID: 11,
            invoice_number: "INV-2025-011",
            customer: { username: "Lisa Thompson", email: "lisa@example.com" },
            total_amount: 3400.00,
            status: "pending",
            issue_date: "2025-01-24T10:30:00Z",
            due_date: "2025-02-24T10:30:00Z",
            created_at: "2025-01-24T10:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 12,
            invoice_number: "INV-2025-012",
            customer: { username: "Kevin Lee", email: "kevin@example.com" },
            total_amount: 920.75,
            status: "overdue",
            issue_date: "2024-12-20T14:15:00Z",
            due_date: "2025-01-20T14:15:00Z",
            created_at: "2024-12-20T14:15:00Z",
            currency: "USD"
        },
        {
            invoiceID: 13,
            invoice_number: "INV-2025-013",
            customer: { username: "Amanda Rodriguez", email: "amanda@example.com" },
            total_amount: 1750.00,
            status: "paid",
            issue_date: "2025-01-21T08:45:00Z",
            due_date: "2025-02-21T08:45:00Z",
            created_at: "2025-01-21T08:45:00Z",
            currency: "USD"
        },
        {
            invoiceID: 14,
            invoice_number: "INV-2025-014",
            customer: { username: "James Martinez", email: "james@example.com" },
            total_amount: 5200.50,
            status: "draft",
            issue_date: "2025-01-27T16:30:00Z",
            due_date: "2025-02-27T16:30:00Z",
            created_at: "2025-01-27T16:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 15,
            invoice_number: "INV-2025-015",
            customer: { username: "Jennifer Taylor", email: "jennifer@example.com" },
            total_amount: 1125.25,
            status: "pending",
            issue_date: "2025-01-25T13:20:00Z",
            due_date: "2025-02-25T13:20:00Z",
            created_at: "2025-01-25T13:20:00Z",
            currency: "USD"
        },
        {
            invoiceID: 16,
            invoice_number: "INV-2025-016",
            customer: { username: "Daniel Anderson", email: "daniel@example.com" },
            total_amount: 2650.00,
            status: "paid",
            issue_date: "2025-01-17T11:10:00Z",
            due_date: "2025-02-17T11:10:00Z",
            created_at: "2025-01-17T11:10:00Z",
            currency: "USD"
        },
        {
            invoiceID: 17,
            invoice_number: "INV-2025-017",
            customer: { username: "Maria Gonzalez", email: "maria@example.com" },
            total_amount: 3950.75,
            status: "overdue",
            issue_date: "2024-12-12T09:30:00Z",
            due_date: "2025-01-12T09:30:00Z",
            created_at: "2024-12-12T09:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 18,
            invoice_number: "INV-2025-018",
            customer: { username: "Christopher White", email: "chris@example.com" },
            total_amount: 1320.00,
            status: "draft",
            issue_date: "2025-01-28T14:45:00Z",
            due_date: "2025-02-28T14:45:00Z",
            created_at: "2025-01-28T14:45:00Z",
            currency: "USD"
        },
        {
            invoiceID: 19,
            invoice_number: "INV-2025-019",
            customer: { username: "Ashley Brown", email: "ashley@example.com" },
            total_amount: 2100.50,
            status: "pending",
            issue_date: "2025-01-26T12:15:00Z",
            due_date: "2025-02-26T12:15:00Z",
            created_at: "2025-01-26T12:15:00Z",
            currency: "USD"
        },
        {
            invoiceID: 20,
            invoice_number: "INV-2025-020",
            customer: { username: "Robert Johnson", email: "robert@example.com" },
            total_amount: 4750.25,
            status: "paid",
            issue_date: "2025-01-16T10:00:00Z",
            due_date: "2025-02-16T10:00:00Z",
            created_at: "2025-01-16T10:00:00Z",
            currency: "USD"
        },
        {
            invoiceID: 21,
            invoice_number: "INV-2025-021",
            customer: { username: "Michelle Clark", email: "michelle@example.com" },
            total_amount: 1575.00,
            status: "overdue",
            issue_date: "2024-12-18T15:30:00Z",
            due_date: "2025-01-18T15:30:00Z",
            created_at: "2024-12-18T15:30:00Z",
            currency: "USD"
        },
        {
            invoiceID: 22,
            invoice_number: "INV-2025-022",
            customer: { username: "Steven Harris", email: "steven@example.com" },
            total_amount: 2890.75,
            status: "draft",
            issue_date: "2025-01-29T09:20:00Z",
            due_date: "2025-02-29T09:20:00Z",
            created_at: "2025-01-29T09:20:00Z",
            currency: "USD"
        },
        {
            invoiceID: 23,
            invoice_number: "INV-2025-023",
            customer: { username: "Nicole Lewis", email: "nicole@example.com" },
            total_amount: 3650.00,
            status: "pending",
            issue_date: "2025-01-27T11:40:00Z",
            due_date: "2025-02-27T11:40:00Z",
            created_at: "2025-01-27T11:40:00Z",
            currency: "USD"
        }
    ]);

    const [filters, setFilters] = useState({
        status: '',
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customer: ''
    });

    // Modal states
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return filters.status || filters.dateRange || filters.minAmount || filters.maxAmount || filters.customer;
    }, [filters]);

    // Filter invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            // Status filter
            if (filters.status && invoice.status !== filters.status) {
                return false;
            }

            // Customer filter
            if (filters.customer && !invoice.customer.username.toLowerCase().includes(filters.customer.toLowerCase())) {
                return false;
            }

            // Amount filters
            if (filters.minAmount && invoice.total_amount < parseFloat(filters.minAmount)) {
                return false;
            }
            if (filters.maxAmount && invoice.total_amount > parseFloat(filters.maxAmount)) {
                return false;
            }

            // Date range filter
            if (filters.dateRange) {
                const invoiceDate = new Date(invoice.issue_date);
                const now = new Date();

                switch (filters.dateRange) {
                    case 'today':
                        return invoiceDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return invoiceDate >= weekAgo;
                    case 'month':
                        return invoiceDate.getMonth() === now.getMonth() && invoiceDate.getFullYear() === now.getFullYear();
                    case 'quarter':
                        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
                        return invoiceDate >= quarterStart;
                    case 'year':
                        return invoiceDate.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            }

            return true;
        });
    }, [invoices, filters]);

    // Handler functions
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleAddInvoice = () => {
        setModalMode('add');
        setSelectedInvoice(null);
        setIsInvoiceModalOpen(true);
    };

    const handleEditInvoice = (invoice) => {
        setModalMode('edit');
        setSelectedInvoice(invoice);
        setIsInvoiceModalOpen(true);
    };

    const handleDeleteInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setIsDeleteModalOpen(true);
    };

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setIsViewModalOpen(true);
    };

    // Modal handlers
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

    // Save invoice (add or edit)
    const handleSaveInvoice = (invoiceData, mode) => {
        return new Promise((resolve, reject) => {
            try {
                if (mode === 'add') {
                    // Add new invoice
                    const newInvoice = {
                        ...invoiceData,
                        invoiceID: Date.now(), // Simple ID generation for demo
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };
                    setInvoices(prev => [...prev, newInvoice]);
                    console.log('Invoice added:', newInvoice);
                } else {
                    // Edit existing invoice
                    const updatedInvoice = {
                        ...invoiceData,
                        updated_at: new Date().toISOString()
                    };
                    setInvoices(prev => prev.map(inv =>
                        inv.invoiceID === invoiceData.invoiceID ? updatedInvoice : inv
                    ));
                    console.log('Invoice updated:', updatedInvoice);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    // Confirm delete
    const handleConfirmDelete = () => {
        if (selectedInvoice) {
            setInvoices(prev => prev.filter(inv => inv.invoiceID !== selectedInvoice.invoiceID));
            console.log('Invoice deleted:', selectedInvoice.invoiceID);
            setIsDeleteModalOpen(false);
            setSelectedInvoice(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <Header3
                        icon={
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        }
                        title="Invoices Portal"
                        subtitle="Streamline your customer relationships with our comprehensive management system"
                        colorScheme="purple"
                    />

                    {/* Main Content */}
                    <div className="w-full">
                        <Header2
                            title="Invoices Management"
                            description="Manage your invoices efficiently with our comprehensive invoicing system"
                            companyName="Your Company"
                            colorScheme="purple"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                            onAdd={handleAddInvoice}
                        />

                        {/* Invoice Statistics */}
                        <InvoiceStats invoices={filteredInvoices} />

                        {/* Invoice Filters */}
                        <InvoiceFilter
                            onFilterChange={handleFilterChange}
                            totalInvoices={invoices.length}
                            filteredCount={filteredInvoices.length}
                        />

                        {/* Invoice Table */}
                        <InvoiceTable
                            invoices={filteredInvoices}
                            itemsPerPage={10}
                            onEdit={handleEditInvoice}
                            onDelete={handleDeleteInvoice}
                            onView={handleViewInvoice}
                            isFiltered={hasActiveFilters}
                        />
                        {/* Modals */}
                        <InvoiceModal
                            isOpen={isInvoiceModalOpen}
                            onClose={handleInvoiceModalClose}
                            invoice={selectedInvoice}
                            onSave={handleSaveInvoice}
                            mode={modalMode}
                        />

                        <InvoiceViewModal
                            isOpen={isViewModalOpen}
                            onClose={handleViewModalClose}
                            invoice={selectedInvoice}
                        />

                        <ConfirmationModal
                            isOpen={isDeleteModalOpen}
                            onClose={handleDeleteModalClose}
                            onConfirm={handleConfirmDelete}
                            title="Delete Invoice"
                            message={`Are you sure you want to delete invoice ${selectedInvoice?.invoice_number}? This action cannot be undone.`}
                            confirmText="Delete"
                            cancelText="Cancel"
                            type="danger"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page