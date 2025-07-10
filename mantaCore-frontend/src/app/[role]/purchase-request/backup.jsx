'use client';

import { useState, useEffect } from 'react';
import Header2 from "@/components/header/Header2";
import Header3 from "@/components/header/Header3";
import PurchaseFilter from "@/components/filter/PurchaseFilter";
import PurchaseStats from "@/components/card/PurchaseStatsCards";
import PurchaseRequestTable from "@/components/table/PurchaseRequestTable";
import PurchaseModal from "@/components/modal/PurchaseModal";
import PurchaseViewModal from "@/components/modal/PurchaseViewModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import Alert from "@/components/common/Alert";
import { usePagination } from "@/hooks/usePagination";
import { apiHit } from '@/libs/api/fetch';
import Cookies from 'js-cookie';

const Page = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [stats, setStats] = useState({});

    // User info states
    const [userInfo, setUserInfo] = useState(null);
    const [userInfoLoading, setUserInfoLoading] = useState(true);

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

    // Alert states
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
    };

    const hideAlert = () => {
        setAlert(null);
    };

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

    // Helper function to calculate total amount from items
    const calculateTotalAmount = (data) => {
        if (!data.purchaseItems || data.purchaseItems.length === 0) return 0;
        return data.purchaseItems.reduce((total, item) => {
            return total + (parseFloat(item.quantity || 0) * parseFloat(item.unitPrice || 0));
        }, 0);
    };

    // API calls - Fetch all required data
    useEffect(() => {
        const initializeData = async () => {
            // Fetch user info first
            await fetchUserInfo();
            // Then fetch other data
            fetchPurchases();
            fetchItems();
            fetchCompanies();
        };

        initializeData();
    }, []);

    const fetchUserInfo = async () => {
        try {
            setUserInfoLoading(true);
            const token = Cookies.get('auth');
            if (token) {
                const userResponse = await apiHit('user', token);
                console.log('=== USER INFO DEBUG ===');
                console.log('User info response:', userResponse);

                if (userResponse && userResponse.user) {
                    // Store user info in state
                    setUserInfo(userResponse.user);

                    // Store user info in localStorage for easy access
                    localStorage.setItem('userID', userResponse.user.userID);
                    localStorage.setItem('companyID', userResponse.user.companyID);
                    localStorage.setItem('userName', userResponse.user.username);
                    localStorage.setItem('userEmail', userResponse.user.email);
                    localStorage.setItem('userInfo', JSON.stringify(userResponse.user));

                    console.log('User info stored:', {
                        userID: userResponse.user.userID,
                        companyID: userResponse.user.companyID,
                        username: userResponse.user.username,
                        email: userResponse.user.email
                    });
                } else {
                    console.warn('No user data received');
                    setUserInfo(null);
                }
            } else {
                console.warn('No auth token found');
                setUserInfo(null);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            showAlert('Could not load user information. Some features may not work properly.', 'warning');
            setUserInfo(null);
        } finally {
            setUserInfoLoading(false);
        }
    };

    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('auth');
            const response = await apiHit('getAllPurchases', token);

            console.log('=== RAW API RESPONSE ===');
            console.log('Full response:', response);
            console.log('Response type:', typeof response);
            console.log('Is response array?', Array.isArray(response));

            // Response is directly an array, not response.data
            if (response && Array.isArray(response)) {
                console.log('First item in response:', response[0]);

                // Map API response to component structure
                const purchasesData = response.map(purchase => {
                    console.log('Processing purchase:', purchase);
                    return {
                        purchaseID: purchase.purchaseID,
                        userID: purchase.userID,
                        companyID: purchase.companyID,
                        status: purchase.status,
                        date: purchase.date,
                        amount: parseFloat(purchase.amount),
                        user: {
                            userID: purchase.user?.userID,
                            name: purchase.user?.username || 'Unknown User',
                            email: purchase.user?.email
                        },
                        company: {
                            companyID: purchase.company?.companyID,
                            name: purchase.company?.companyName || 'Unknown Company',
                            companyName: purchase.company?.companyName || 'Unknown Company',
                            email: purchase.company?.email || ''
                        },
                        items: purchase.items || [],
                        created_at: purchase.created_at,
                        updated_at: purchase.updated_at
                    };
                });

                console.log('=== PROCESSED DATA ===');
                console.log('Processed purchasesData:', purchasesData);
                console.log('First processed item:', purchasesData[0]);

                setPurchases(purchasesData);
                setFilteredPurchases(purchasesData);

                // Calculate stats
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                const calculatedStats = {
                    total: purchasesData.length,
                    pending: purchasesData.filter(p => p.status === 'pending').length,
                    approved: purchasesData.filter(p => p.status === 'accepted' || p.status === 'approved').length,
                    rejected: purchasesData.filter(p => p.status === 'rejected').length,
                    processing: purchasesData.filter(p => p.status === 'processing').length,
                    totalValue: purchasesData.reduce((sum, p) => sum + p.amount, 0),
                    activeCompanies: new Set(purchasesData.map(p => p.companyID)).size,
                    avgRequestValue: purchasesData.length > 0 ? purchasesData.reduce((sum, p) => sum + p.amount, 0) / purchasesData.length : 0,
                    thisMonth: purchasesData.filter(p => {
                        const purchaseDate = new Date(p.date);
                        return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
                    }).length,
                    // Additional stats for PurchaseStats component
                    totalChange: 0, // You can calculate this based on previous period data
                    pendingChange: 0,
                    approvedChange: 0,
                    rejectedChange: 0,
                    valueChange: 0
                };
                setStats(calculatedStats);

                // Show success message only if there are purchases
                if (purchasesData.length > 0) {
                    showAlert(`${purchasesData.length} purchase requests loaded successfully!`, 'success');
                }
            }
        } catch (error) {
            console.error('Error fetching purchases:', error);
            setPurchases([]);
            setFilteredPurchases([]);
            showAlert('Error loading purchase requests. Please refresh the page.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanies = async () => {
        try {
            const token = Cookies.get('auth');
            // Extract unique companies from purchases or get from a dedicated endpoint
            const response = await apiHit('getAllPurchases', token);

            console.log('=== COMPANIES DEBUG ===');
            console.log('Companies response:', response);

            if (response && Array.isArray(response)) {
                const uniqueCompanies = response.reduce((acc, purchase) => {
                    console.log('Purchase for company extraction:', purchase);
                    if (purchase.company && !acc.find(c => c.companyID === purchase.company.companyID)) {
                        acc.push({
                            companyID: purchase.company.companyID,
                            companyName: purchase.company.companyName, // Ensure proper property name
                            name: purchase.company.companyName, // For backward compatibility
                            email: purchase.company.email
                        });
                    }
                    return acc;
                }, []);
                console.log('Unique companies extracted:', uniqueCompanies);
                setCompanies(uniqueCompanies);
            }
        } catch (error) {
            console.error('Error fetching companies:', error);
            setCompanies([]);
            showAlert('Error loading companies data.', 'warning');
        }
    };

    const fetchItems = async () => {
        try {
            const token = Cookies.get('auth');
            const response = await apiHit('getAllItems', token);

            console.log('=== ITEMS DEBUG ===');
            console.log('Items response:', response);
            console.log('Items response type:', typeof response);

            if (response && Array.isArray(response)) {
                // Map API response to component structure
                const itemsData = response.map(item => {
                    console.log('Processing item:', item);
                    return {
                        itemID: item.itemID,
                        itemName: item.name, // API uses 'name' not 'itemName'
                        name: item.name, // For compatibility with modal component
                        category: item.category || 'General',
                        price: parseFloat(item.itemPrice || 0), // API uses 'itemPrice' not 'price'
                        unitPrice: parseFloat(item.itemPrice || 0), // For purchase items
                        description: item.description || '',
                        stock: item.stock || 0
                    };
                });
                console.log('Processed items:', itemsData);
                setItems(itemsData);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setItems([]);
            showAlert('Error loading items data.', 'warning');
        }
    };

    // Filter purchases based on applied filters
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
            showAlert('Error applying filters. Please try again.', 'warning');
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

    const handleCreate = async () => {
        console.log('Add New button clicked'); // Debug log
        // Check if user ID is available
        const user = await apiHit('user', Cookies.get('auth'));
        const userID = user.user.userID
        if (!userID) {
            showAlert('User information is not available. Please refresh the page and try again.', 'error');
            return;
        }

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
            const token = Cookies.get('auth');

            // Get userID - use the helper function
            const user = await apiHit('user', token);
            const userID = user.user.userID
            console.log('=== SUBMIT DEBUG ===');
            console.log('UserID for submission:', userID);
            console.log('FormData received:', formData);

            // Prepare data for API with required fields
            const apiData = {
                userID: userID, // Add required userID
                companyID: parseInt(formData.companyID),
                date: formData.date,
                amount: parseFloat(formData.amount || calculateTotalAmount(formData)),
                status: formData.status || 'pending',
                items: formData.items || formData.purchaseItems?.map(item => ({
                    itemID: parseInt(item.itemID),
                    quantity: parseInt(item.quantity),
                    unitPrice: parseFloat(item.unitPrice),
                    subTotal: parseFloat(item.quantity) * parseFloat(item.unitPrice), // Add required subTotal
                    type: item.type || 'purchase'
                })) || []
            };

            console.log('API Data being sent:', apiData);

            let response;

            if (selectedPurchase) {
                // Update existing purchase
                response = await apiHit(`updatePurchase/${selectedPurchase.purchaseID}`, token, 'POST', apiData);
                console.log('Update response:', response);
            } else {
                // Create new purchase
                response = await apiHit('createPurchase', token, 'POST', apiData);
                console.log('Create response:', response);
            }

            // Check if response indicates success - more robust checking
            const isSuccess = response && (
                response.success === true ||
                response.status === 'success' ||
                response.message?.includes('successfully') ||
                response.message?.includes('created') ||
                response.message?.includes('updated') ||
                (response.purchaseID && !response.error) || // New purchase has ID
                (!response.error && response !== null) // No error and not null
            );

            if (isSuccess) {
                // Success - close modal and refresh data
                setIsModalOpen(false);
                setSelectedPurchase(null);
                await fetchPurchases(); // Refresh data

                // Show success alert
                showAlert(
                    selectedPurchase ? 'Purchase request updated successfully!' : 'Purchase request created successfully!',
                    'success'
                );
            } else {
                // Handle API error
                const errorMessage = response?.message || response?.error || 'Failed to save purchase request';
                throw new Error(errorMessage);
            }

        } catch (error) {
            console.error('Error saving purchase:', error);

            // Show error alert
            let errorMessage = 'Error saving purchase. Please try again.';
            if (error.message && error.message !== 'Error saving purchase. Please try again.') {
                errorMessage = error.message;
            }
            showAlert(errorMessage, 'error');
        } finally {
            setModalLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const token = Cookies.get('auth');
            const response = await apiHit(`deletePurchase/${selectedPurchase.purchaseID}`, token, 'DELETE');

            if (response && response.success) {
                await fetchPurchases(); // Refresh data
                setIsDeleteModalOpen(false);
                setSelectedPurchase(null);

                // Show success alert
                showAlert('Purchase request deleted successfully!', 'success');
            } else {
                showAlert('Error deleting purchase. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error deleting purchase:', error);
            showAlert('Error deleting purchase. Please try again.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Alert Container */}
            {alert && (
                <div className="fixed top-4 right-4 z-[10000] max-w-md">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={hideAlert}
                    />
                </div>
            )}

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

                    {/* User Info Loading Indicator */}
                    {userInfoLoading && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                                <p className="text-yellow-800 text-sm">Loading user information... Purchase creation will be available once loading is complete.</p>
                            </div>
                        </div>
                    )}

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

                        {/* Debug Info
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <h3 className="font-bold text-gray-800 mb-2">Debug Information:</h3>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p><strong>Raw purchases.length:</strong> {purchases?.length || 0}</p>
                                <p><strong>Filtered purchases.length:</strong> {filteredPurchases?.length || 0}</p>
                                <p><strong>Paginated data.length:</strong> {paginatedData?.length || 0}</p>

                                {purchases?.length > 0 && (
                                    <div className="mt-4">
                                        <p><strong>First purchase raw data:</strong></p>
                                        <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                                            {JSON.stringify(purchases[0], null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {companies?.length > 0 && (
                                    <div className="mt-4">
                                        <p><strong>First company data:</strong></p>
                                        <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                                            {JSON.stringify(companies[0], null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {items?.length > 0 && (
                                    <div className="mt-4">
                                        <p><strong>First item data:</strong></p>
                                        <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                                            {JSON.stringify(items[0], null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedPurchase(null);
                }}
                onSubmit={handleSubmit}
                purchase={selectedPurchase}
                companies={companies}
                items={items}
                loading={modalLoading}
                userInfoLoading={userInfoLoading}
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