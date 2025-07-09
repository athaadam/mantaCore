'use client';

import { useState, useEffect } from 'react';
import Header2 from "@/components/header/Header2";
import Header3 from "@/components/header/Header3";
import PurchaseFilter from "@/components/filter/PurchaseFilter";
import PurchaseStats from "@/components/stats/PurchaseStats";
import PurchaseRequestTable from "@/components/table/PurchaseRequestTable";
import PurchaseModal from "@/components/modal/PurchaseModal";
import PurchaseViewModal from "@/components/modal/PurchaseViewModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { usePagination } from "@/hooks/usePagination";

const Page = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [stats, setStats] = useState({});
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        companyID: '',
        dateFrom: '',
        dateTo: '',
        amountMin: '',
        amountMax: ''
    });
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    
    // Sorting states
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Pagination
    const itemsPerPage = 10;
    const { currentPage, totalPages, visibleItems, onPageChange } = usePagination(
        filteredPurchases,
        itemsPerPage
    );
    
    // Safe access to paginated data
    const paginatedData = visibleItems || [];

    // Mock data - Replace with actual API calls
    useEffect(() => {
        fetchPurchases();
        fetchCompanies();
        fetchItems();
    }, []);

    const fetchPurchases = async () => {
        setLoading(true);
        try {
            // Mock API call with more data
            const mockPurchases = [
                {
                    purchaseID: 1,
                    userID: 1,
                    companyID: 1,
                    status: 'pending',
                    date: '2025-07-05',
                    amount: 1500.00,
                    user: { name: 'John Doe' },
                    company: { name: 'ABC Corp', email: 'contact@abc.com' },
                    items: [
                        {
                            itemID: 1,
                            quantity: 2,
                            unitPrice: 250.00,
                            item: { name: 'Laptop', category: 'Electronics' }
                        },
                        {
                            itemID: 2,
                            quantity: 1,
                            unitPrice: 1000.00,
                            item: { name: 'Monitor', category: 'Electronics' }
                        }
                    ],
                    created_at: '2025-07-05T10:00:00Z',
                    updated_at: '2025-07-05T10:00:00Z'
                },
                {
                    purchaseID: 2,
                    userID: 2,
                    companyID: 2,
                    status: 'approved',
                    date: '2025-07-04',
                    amount: 800.00,
                    user: { name: 'Jane Smith' },
                    company: { name: 'XYZ Ltd', email: 'info@xyz.com' },
                    items: [
                        {
                            itemID: 3,
                            quantity: 4,
                            unitPrice: 200.00,
                            item: { name: 'Office Chair', category: 'Furniture' }
                        }
                    ],
                    created_at: '2025-07-04T09:30:00Z',
                    updated_at: '2025-07-04T14:20:00Z'
                },
                {
                    purchaseID: 3,
                    userID: 1,
                    companyID: 3,
                    status: 'processing',
                    date: '2025-07-03',
                    amount: 2200.00,
                    user: { name: 'Mike Johnson' },
                    company: { name: 'Tech Solutions', email: 'hello@techsol.com' },
                    items: [
                        {
                            itemID: 4,
                            quantity: 2,
                            unitPrice: 600.00,
                            item: { name: 'Desk', category: 'Furniture' }
                        },
                        {
                            itemID: 5,
                            quantity: 1,
                            unitPrice: 1000.00,
                            item: { name: 'Printer', category: 'Electronics' }
                        }
                    ],
                    created_at: '2025-07-03T11:15:00Z',
                    updated_at: '2025-07-03T11:15:00Z'
                },
                {
                    purchaseID: 4,
                    userID: 2,
                    companyID: 1,
                    status: 'rejected',
                    date: '2025-07-02',
                    amount: 350.00,
                    user: { name: 'Sarah Wilson' },
                    company: { name: 'ABC Corp', email: 'contact@abc.com' },
                    items: [
                        {
                            itemID: 1,
                            quantity: 1,
                            unitPrice: 350.00,
                            item: { name: 'Tablet', category: 'Electronics' }
                        }
                    ],
                    created_at: '2025-07-02T14:30:00Z',
                    updated_at: '2025-07-02T16:45:00Z'
                },
                {
                    purchaseID: 5,
                    userID: 1,
                    companyID: 2,
                    status: 'pending',
                    date: '2025-07-08',
                    amount: 750.00,
                    user: { name: 'David Brown' },
                    company: { name: 'XYZ Ltd', email: 'info@xyz.com' },
                    items: [
                        {
                            itemID: 3,
                            quantity: 3,
                            unitPrice: 250.00,
                            item: { name: 'Office Chair', category: 'Furniture' }
                        }
                    ],
                    created_at: '2025-07-08T09:00:00Z',
                    updated_at: '2025-07-08T09:00:00Z'
                }
            ];
            
            setPurchases(mockPurchases);
            setFilteredPurchases(mockPurchases);
            
            // Calculate stats with current month being July 2025
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            const mockStats = {
                total: mockPurchases.length,
                pending: mockPurchases.filter(p => p.status === 'pending').length,
                approved: mockPurchases.filter(p => p.status === 'approved').length,
                rejected: mockPurchases.filter(p => p.status === 'rejected').length,
                processing: mockPurchases.filter(p => p.status === 'processing').length,
                totalValue: mockPurchases.reduce((sum, p) => sum + p.amount, 0),
                activeCompanies: new Set(mockPurchases.map(p => p.companyID)).size,
                avgRequestValue: mockPurchases.reduce((sum, p) => sum + p.amount, 0) / mockPurchases.length,
                thisMonth: mockPurchases.filter(p => {
                    const purchaseDate = new Date(p.date);
                    return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
                }).length
            };
            setStats(mockStats);
            
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanies = async () => {
        try {
            // Mock API call
            const mockCompanies = [
                { companyID: 1, name: 'ABC Corp', email: 'contact@abc.com' },
                { companyID: 2, name: 'XYZ Ltd', email: 'info@xyz.com' },
                { companyID: 3, name: 'Tech Solutions', email: 'hello@techsol.com' }
            ];
            setCompanies(mockCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const fetchItems = async () => {
        try {
            // Mock API call with more items
            const mockItems = [
                { itemID: 1, name: 'Laptop', category: 'Electronics', price: 1200.00 },
                { itemID: 2, name: 'Monitor', category: 'Electronics', price: 300.00 },
                { itemID: 3, name: 'Office Chair', category: 'Furniture', price: 250.00 },
                { itemID: 4, name: 'Desk', category: 'Furniture', price: 600.00 },
                { itemID: 5, name: 'Printer', category: 'Electronics', price: 400.00 },
                { itemID: 6, name: 'Tablet', category: 'Electronics', price: 350.00 },
                { itemID: 7, name: 'Keyboard', category: 'Electronics', price: 80.00 },
                { itemID: 8, name: 'Mouse', category: 'Electronics', price: 45.00 },
                { itemID: 9, name: 'Bookshelf', category: 'Furniture', price: 180.00 },
                { itemID: 10, name: 'File Cabinet', category: 'Furniture', price: 220.00 }
            ];
            setItems(mockItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleFilter = async (newFilters) => {
        setFilterLoading(true);
        setFilters(newFilters);
        
        try {
            // Apply filters
            let filtered = [...purchases];
            
            if (newFilters.search) {
                filtered = filtered.filter(purchase =>
                    purchase.purchaseID.toString().includes(newFilters.search.toLowerCase()) ||
                    purchase.company?.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                    purchase.user?.name.toLowerCase().includes(newFilters.search.toLowerCase())
                );
            }
            
            if (newFilters.status) {
                filtered = filtered.filter(purchase => purchase.status === newFilters.status);
            }
            
            if (newFilters.companyID) {
                filtered = filtered.filter(purchase => purchase.companyID === parseInt(newFilters.companyID));
            }
            
            if (newFilters.dateFrom) {
                filtered = filtered.filter(purchase => new Date(purchase.date) >= new Date(newFilters.dateFrom));
            }
            
            if (newFilters.dateTo) {
                filtered = filtered.filter(purchase => new Date(purchase.date) <= new Date(newFilters.dateTo));
            }
            
            if (newFilters.amountMin) {
                filtered = filtered.filter(purchase => purchase.amount >= parseFloat(newFilters.amountMin));
            }
            
            if (newFilters.amountMax) {
                filtered = filtered.filter(purchase => purchase.amount <= parseFloat(newFilters.amountMax));
            }
            
            setFilteredPurchases(filtered);
            setHasActiveFilters(Object.values(newFilters).some(value => value !== ''));
            
        } catch (error) {
            console.error('Error filtering purchases:', error);
        } finally {
            setFilterLoading(false);
        }
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            search: '',
            status: '',
            companyID: '',
            dateFrom: '',
            dateTo: '',
            amountMin: '',
            amountMax: ''
        };
        setFilters(clearedFilters);
        setFilteredPurchases(purchases);
        setHasActiveFilters(false);
    };

    const handleCreate = () => {
        console.log('Add New button clicked'); // Debug log
        setSelectedPurchase(null);
        setIsModalOpen(true);
    };

    const handleEdit = (purchase) => {
        setSelectedPurchase(purchase);
        setIsModalOpen(true);
    };

    const handleView = (purchase) => {
        setSelectedPurchase(purchase);
        setIsViewModalOpen(true);
    };

    const handleDelete = (purchase) => {
        setSelectedPurchase(purchase);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = async (formData) => {
        setModalLoading(true);
        try {
            if (selectedPurchase) {
                // Update existing purchase
                const updatedPurchases = purchases.map(p =>
                    p.purchaseID === selectedPurchase.purchaseID
                        ? { ...p, ...formData, updated_at: new Date().toISOString() }
                        : p
                );
                setPurchases(updatedPurchases);
                setFilteredPurchases(updatedPurchases);
            } else {
                // Create new purchase
                const newPurchase = {
                    ...formData,
                    purchaseID: Math.max(...purchases.map(p => p.purchaseID)) + 1,
                    userID: 1, // Mock user ID
                    user: { name: 'Current User' },
                    company: companies.find(c => c.companyID === parseInt(formData.companyID)),
                    items: formData.purchaseItems.map(item => ({
                        ...item,
                        item: items.find(i => i.itemID === parseInt(item.itemID))
                    })),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                const updatedPurchases = [...purchases, newPurchase];
                setPurchases(updatedPurchases);
                setFilteredPurchases(updatedPurchases);
            }
            
            setIsModalOpen(false);
            setSelectedPurchase(null);
        } catch (error) {
            console.error('Error saving purchase:', error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const updatedPurchases = purchases.filter(p => p.purchaseID !== selectedPurchase.purchaseID);
            setPurchases(updatedPurchases);
            setFilteredPurchases(updatedPurchases);
            
            setIsDeleteModalOpen(false);
            setSelectedPurchase(null);
        } catch (error) {
            console.error('Error deleting purchase:', error);
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
                    {/* Page Header - Header3 */}
                    <Header3
                        icon={
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M8 11v4a4 4 0 008 0v-4m-8 0h8" />
                            </svg>
                        }
                        title="Purchase Request Portal"
                        subtitle="Manage your purchase requests efficiently and effectively"
                        colorScheme="purple"
                    />

                    {/* Secondary Header - Header2 */}
                    <Header2
                        icon={
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        }
                        title="Request Management"
                        description="Create, track, and manage purchase requests"
                        companyName="for your organization"
                        colorScheme="purple"
                        onAdd={handleCreate}
                    />

                    {/* Main Content */}
                    <div className="w-full space-y-8">
                        {/* Stats */}
                        <PurchaseStats stats={stats} loading={loading} />

                        {/* Filter */}
                        <PurchaseFilter
                            onFilter={handleFilter}
                            onClear={handleClearFilters}
                            hasActiveFilters={hasActiveFilters}
                            companies={companies}
                            loading={filterLoading}
                        />

                        {/* Table */}
                        <PurchaseRequestTable
                            purchases={paginatedData}
                            loading={loading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            onEdit={handleEdit}
                            onView={handleView}
                            onDelete={handleDelete}
                            onSort={handleSort}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            hasActiveFilters={hasActiveFilters}
                            isFiltered={hasActiveFilters}
                        />
                        
                        {/* Debug Info */}
                        <div className="text-sm text-gray-500 mt-2">
                            Debug: filteredPurchases.length = {filteredPurchases?.length || 0}, 
                            paginatedData.length = {paginatedData?.length || 0}, 
                            purchases.length = {purchases?.length || 0}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {console.log('Modal states:', { isModalOpen, selectedPurchase })}
            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => {
                    console.log('Closing modal');
                    setIsModalOpen(false);
                }}
                onSubmit={handleSubmit}
                purchase={selectedPurchase}
                companies={companies}
                items={items}
                loading={modalLoading}
            />

            <PurchaseViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                purchase={selectedPurchase}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Purchase Request"
                message={`Are you sure you want to delete Purchase Request #${selectedPurchase?.purchaseID}? This action cannot be undone.`}
                type="danger"
            />
        </div>
    );
}

export default Page;