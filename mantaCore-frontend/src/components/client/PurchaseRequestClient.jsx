'use client';

import Header2 from "@/components/header/Header2";
import { useState, useEffect, useMemo } from 'react';
import PurchaseModal from "../modal/PurchaseModal";
import PurchaseStats from "../card/PurchaseStatsCards";
import PurchaseFilter from "../filter/PurchaseFilter";
import DataCard from "../card/DataCard";
import PurchaseRequestTable from "../table/PurchaseRequestTable";
import PurchaseViewModal from "../modal/PurchaseViewModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import Alert from "../common/Alert";
import { apiHit } from "@/libs/api/fetch";
import Cookies from 'js-cookie';
import { ScrollText } from "lucide-react";

const PurchaseRequestClient = ({ api }) => {
    const [purchaseRequests, setPurchaseRequests] = useState(Array.isArray(api?.purchases) ? api.purchases : []);
    const [user, setUser] = useState(api?.profile?.user || {});
    const [company, setCompany] = useState(api?.profile?.company || {});
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [filter, setFilter] = useState([]);
    const [dateRange, setDateRange] = useState({ from: '', to: '', preset: '' });
    const [stats, setStats] = useState({
        totalAmount: 0, totalRequests: 0, pendingRequests: 0, acceptedRequests: 0,
        denied: 0, total: 0, pending: 0, accepted: 0, totalValue: 0, activeCompanies: 0, avgRequestValue: 0,
        thisMonth: 0
    });
    const [items, setItems] = useState(Array.isArray(api?.items) ? api.items : []);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Show alert message with auto-dismiss
    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    // Making stats
    const calculateStats = (purchases) => {
        if (!purchases || !Array.isArray(purchases) || purchases.length === 0) return {
            totalAmount: 0,
            totalRequests: 0,
            pendingRequests: 0,
            approvedRequests: 0,
            denied: 0,
            total: 0,
            pending: 0,
            accepted: 0,
            totalValue: 0,
            activeCompanies: 0,
            avgRequestValue: 0,
            thisMonth: 0
        };

        // Parse amounts as numbers and handle any potential NaN values
        const totalAmount = purchases.reduce((sum, purchase) => {
            const amount = parseFloat(purchase.amount) || 0;
            return sum + amount;
        }, 0);

        const totalRequests = purchases.length;
        const pendingRequests = purchases.filter(purchase => purchase.status === 'pending').length;
        const acceptedRequests = purchases.filter(purchase => purchase.status === 'accepted').length;
        const deniedRequests = purchases.filter(purchase => purchase.status === 'denied').length;

        // Calculate unique companies
        const uniqueCompanyIds = [...new Set(purchases.map(purchase => purchase.companyID))];
        const activeCompanies = uniqueCompanyIds.length;

        // Calculate average request value
        const avgRequestValue = totalRequests > 0 ? totalAmount / totalRequests : 0;

        // Calculate this month's requests
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const thisMonth = purchases.filter(purchase => {
            const purchaseDate = new Date(purchase.created_at || purchase.updated_at);
            return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
        }).length;

        return {
            totalAmount,
            totalRequests,
            pendingRequests,
            acceptedRequests,
            denied: deniedRequests,
            total: totalRequests,
            pending: pendingRequests,
            accepted: acceptedRequests,
            totalValue: totalAmount,
            activeCompanies,
            avgRequestValue,
            thisMonth
        };
    };

    // Update stats when purchaseRequests change
    useEffect(() => setStats(calculateStats(purchaseRequests)), [purchaseRequests]);

    // Handle purchase creation and update
    const handlePurchaseSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            const token = Cookies.get('auth');

            // Ensure we have necessary IDs
            if (!user.userID) {
                throw new Error("User information not available. Please try again or refresh the page.");
            }

            if (!company.companyID) {
                throw new Error("Company information not available. Please try again or refresh the page.");
            }

            // Validate purchase items
            if (!Array.isArray(formData.purchaseItems) || formData.purchaseItems.length === 0) {
                throw new Error("Please add at least one item to the purchase request.");
            }

            // Prepare purchase data with user and company info
            const purchaseData = {
                ...formData,
                userID: user.userID,
                companyID: company.companyID,
                items: formData.purchaseItems.map(item => ({
                    itemID: Number(item.itemID || 0),
                    quantity: Number(item.quantity || 0),
                    itemPrice: Number(item.itemPrice || 0),
                    unitPrice: Number(item.itemPrice || 0),
                    subTotal: Number(item.quantity || 0) * Number(item.itemPrice || 0),
                    type: item.type || 'purchase'
                }))
            };

            let response;

            if (selectedPurchase) {
                // Update existing purchase
                response = await apiHit(`updatePurchase/${selectedPurchase.purchaseID}`, token, 'POST', purchaseData);

                // Update the local state with the updated purchase
                setPurchaseRequests(prev =>
                    prev.map(p => p.purchaseID === selectedPurchase.purchaseID ? (response.purchase || response) : p)
                );
            } else {
                // Create new purchase
                response = await apiHit('createPurchase', token, 'POST', purchaseData);

                // Add the new purchase to local state
                const newPurchase = response.purchase || response;
                if (newPurchase) {
                    setPurchaseRequests(prev => [...prev, newPurchase]);
                }
            }

            // Recalculate stats after successful operation
            setStats(calculateStats(
                selectedPurchase ?
                    purchaseRequests.map(p => p.purchaseID === selectedPurchase.purchaseID ? (response.purchase || response) : p) :
                    [...purchaseRequests, (response.purchase || response)]
            ));

            // Use API message or default success message
            showAlert(response.message || (selectedPurchase ? "Purchase updated successfully" : "Purchase created successfully"), "success");
            setShowModal(false);
            setSelectedPurchase(null);
            console.log("Purchase submitted successfully:", response);

        } catch (error) {
            console.error("Purchase submission error:", error);
            showAlert(error.message || "Failed to save purchase request", "error");
            setShowModal(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle view purchase
    const handleView = (purchase) => {
        setSelectedPurchase(purchase);
        setShowViewModal(true);
    };

    // Handle edit purchase
    const handleEdit = (purchase) => {
        setSelectedPurchase(purchase);
        setShowModal(true);
    };

    // Handle delete purchase
    const handleDelete = (purchase) => {
        setSelectedPurchase(purchase);
        setShowConfirmationModal(true);
    };

    // Delete purchase confirmation
    const confirmDelete = async () => {
        if (!selectedPurchase) return;

        try {
            setIsSubmitting(true);
            const token = Cookies.get('auth');
            const response = await apiHit(`deletePurchase/${selectedPurchase.purchaseID}`, token, 'DELETE');

            // Remove from local state
            setPurchaseRequests(prev => prev.filter(p => p.purchaseID !== selectedPurchase.purchaseID));

            // Use API message or default
            showAlert(response.message || "Purchase request deleted successfully!", "success");
            setShowConfirmationModal(false);
            setSelectedPurchase(null);
        } catch (error) {
            showAlert("Failed to delete purchase request", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilter(newFilters);
    };

    // Handle date filter changes
    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
    };

    // Get date range based on preset
    const getDateRangeFromPreset = (preset) => {
        const today = new Date();
        const from = new Date();
        const to = new Date();

        switch (preset) {
            case 'today':
                // Just today
                from.setHours(0, 0, 0, 0);
                to.setHours(23, 59, 59, 999);
                break;

            case 'yesterday':
                // Yesterday
                from.setDate(from.getDate() - 1);
                from.setHours(0, 0, 0, 0);
                to.setDate(to.getDate() - 1);
                to.setHours(23, 59, 59, 999);
                break;

            case 'thisWeek':
                // Start of current week (Sunday) to today
                const dayOfWeek = today.getDay(); // 0 is Sunday
                from.setDate(from.getDate() - dayOfWeek);
                from.setHours(0, 0, 0, 0);
                break;

            case 'lastWeek':
                // Last week (Sunday to Saturday)
                const lastWeekDay = today.getDay();
                from.setDate(from.getDate() - lastWeekDay - 7);
                from.setHours(0, 0, 0, 0);
                to.setDate(to.getDate() - lastWeekDay - 1);
                to.setHours(23, 59, 59, 999);
                break;

            case 'thisMonth':
                // Start of current month to today
                from.setDate(1);
                from.setHours(0, 0, 0, 0);
                break;

            case 'lastMonth':
                // Last month (1st to last day)
                from.setMonth(from.getMonth() - 1);
                from.setDate(1);
                from.setHours(0, 0, 0, 0);
                to.setDate(0); // Last day of previous month
                to.setHours(23, 59, 59, 999);
                break;

            default:
                return null;
        }

        return { from, to };
    };

    // Filter purchases based on filter state and date range
    const filteredPurchases = useMemo(() => {
        if (!Array.isArray(purchaseRequests)) return [];

        let filtered = [...purchaseRequests];

        // Apply status filters
        if (filter.length > 0) {
            filtered = filtered.filter(purchase => filter.includes(purchase.status));
        }

        // Apply date filters
        if (dateRange.preset) {
            const dateRangeObj = getDateRangeFromPreset(dateRange.preset);
            if (dateRangeObj) { 
                filtered = filtered.filter(purchase => {
                    const purchaseDate = new Date(purchase.date);
                    return purchaseDate >= dateRangeObj.from && purchaseDate <= dateRangeObj.to;
                });
            }
        }

        return filtered;
    }, [purchaseRequests, filter, dateRange]);

    return (
        <>
            <Header2
                icon={
                    <ScrollText color="#ffffff" absoluteStrokeWidth />
                }
                title="Purchase Request Portal"
                description="Manage your purchase requests efficiently and effectively"
                colorScheme="purple"
                onAdd={() => {
                    setSelectedPurchase(null);
                    setShowModal(true);
                }}
            />

            <PurchaseStats
                stats={stats}
            />
            <div className="py-4">
                {alert && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>
            <PurchaseFilter
                onFilterChange={handleFilterChange}
                activeFilters={filter}
                onDateChange={handleDateChange}
                dateRange={dateRange}
            />
            <DataCard
                title="My Purchase Requests"
                subtitle="View and track all your submitted purchase requests"
                icon={
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2m-4-8a2 2 0 110 4 2 2 0 010-4zm0 10a2 2 0 110 4 2 2 0 010-4z" />
                    </svg>
                }
                children={
                    <PurchaseRequestTable
                        purchases={filteredPurchases}
                        itemsPerPage={5}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        loading={loading}
                        isFiltered={filter.length > 0 || dateRange.preset}
                        hasActiveFilters={filter.length > 0 || dateRange.preset}
                    />
                }
            />

            {/* Modals */}
            <div className="flex justify-center">
                <PurchaseModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedPurchase(null);
                    }}
                    onSubmit={handlePurchaseSubmit}
                    purchase={selectedPurchase}
                    companies={company}
                    items={items}
                    loading={isSubmitting}
                />

                <PurchaseViewModal
                    isOpen={showViewModal}
                    onClose={() => {
                        setShowViewModal(false);
                        setSelectedPurchase(null);
                    }}
                    purchase={selectedPurchase}
                />

                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={() => {
                        setShowConfirmationModal(false);
                        setSelectedPurchase(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Delete Purchase Request"
                    message={selectedPurchase ?
                        `Are you sure you want to delete Purchase Request #${selectedPurchase.purchaseID}? This action cannot be undone.` :
                        "Are you sure you want to delete this purchase request? This action cannot be undone."
                    }
                    confirmText="Delete"
                    cancelText="Cancel"
                    type="danger"
                    loading={isSubmitting}
                />
            </div>
        </>
    );
};

export default PurchaseRequestClient;
