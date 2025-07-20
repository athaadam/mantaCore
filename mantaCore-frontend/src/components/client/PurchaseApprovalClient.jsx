'use client';

import { useState, useMemo } from 'react';
import FilterControls from '../filter/FilterControls';
import PurchaseTable from '../table/PurchaseTable';
import Header from '@/components/header/Header';
import DataCard from '@/components/card/DataCard';
import SummaryCards from '@/components/card/SummaryCards';
import { extractCategories, extractStatuses, extractAuthors, applyFilters } from '@/libs/utils/filters/filterUtils';
import PurchaseViewModal from '../modal/PurchaseViewModal';
import { apiHit } from '@/libs/api/fetch';
import Alert from '../common/Alert';
import ConfirmationModal from '../modal/ConfirmationModal';

export default function PurchaseApprovalClient({ summaryData: initialSummaryData, allData: initialAllData }) {
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        category: '',
        suitor: '',
        author: '',
        status: ''
    });

    const [appliedFilter, setAppliedFilter] = useState({});
    // State untuk mengelola modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    // State untuk data yang bisa diupdate secara lokal
    const [allData, setAllData] = useState(initialAllData);
    const [summaryData, setSummaryData] = useState(initialSummaryData);

    // State untuk alert
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success' // success, error, warning, info
    });

    // State untuk confirmation modal
    const [confirmation, setConfirmation] = useState({
        show: false,
        title: '',
        message: '',
        action: null,
        purchaseId: null,
        status: ''
    });

    // Extract unique customers, authors, categories and statuses from purchase data
    const authors = useMemo(() => extractAuthors(allData || [], true), [allData]);
    const categories = useMemo(() => extractCategories(allData || []), [allData]);
    const statuses = useMemo(() => extractStatuses(allData || []), [allData]);

    // Apply filters to data only when appliedFilter changes
    const filteredData = useMemo(() => {
        if (!allData || allData.length === 0) {
            return [];
        }
        return applyFilters(allData, appliedFilter);
    }, [allData, appliedFilter]);

    const handleApplyFilter = () => {
        setAppliedFilter({ ...filter });
        setTimeout(() => {
        }, 100);
    };

    const handleClearFilter = () => {
        const clearedFilter = { from: '', to: '', category: '', suitor: '', author: '', status: '' };
        setFilter(clearedFilter);
        setAppliedFilter({});
    };

    const handleExport = () => {
        console.log('Exporting filtered purchase data:', filteredData);
        if (filteredData.length === 0) {
            alert('No data to export. Please adjust your filters.');
            return;
        }
        // Export logic here
    };

    // Handler untuk membuka modal dengan detail purchase
    const handleViewPurchase = (purchase) => {
        setSelectedPurchase(purchase);
        setIsModalOpen(true);
    };

    // Handler untuk menutup modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPurchase(null);
    };

    // Handler untuk menampilkan konfirmasi sebelum approve/reject
    const handleConfirmStatusChange = (id, status) => {
        const action = status === 'accepted' ? 'approve' : 'reject';
        const title = status === 'accepted' ? 'Approve Purchase' : 'Reject Purchase';
        const message = status === 'accepted'
            ? `Are you sure you want to approve purchase #${id}?`
            : `Are you sure you want to reject purchase #${id}?`;

        // Tutup modal view terlebih dahulu
        setIsModalOpen(false);

        // Tunggu sebentar sebelum menampilkan modal konfirmasi untuk animasi transisi
        setTimeout(() => {
            setConfirmation({
                show: true,
                title,
                message,
                action,
                purchaseId: id,
                status
            });
        }, 300); // Delay 300ms untuk memastikan modal view sudah tertutup
    };

    // Handler untuk menutup modal konfirmasi
    const handleCloseConfirmation = () => {
        const purchaseToReopen = selectedPurchase;

        setConfirmation({
            show: false,
            title: '',
            message: '',
            action: null,
            purchaseId: null,
            status: ''
        });

        // Kembalikan modal view jika masih ada purchase yang dipilih
        // dan user membatalkan konfirmasi
        if (purchaseToReopen) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 300); // Delay 300ms untuk animasi
        }
    };

    // Handler untuk approve atau reject purchase setelah konfirmasi
    const handleUpdateStatus = async () => {
        try {
            const { purchaseId, status } = confirmation;

            // Dapatkan token dari cookies
            const token = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];

            // Panggil API untuk update status
            const response = await apiHit(`updatePurchase/${purchaseId}`, token, 'POST', { status });

            // Simpan informasi status action untuk alert
            const actionType = status === 'accepted' ? 'approved' : 'rejected';

            // Tutup modal konfirmasi tanpa membuka kembali modal detail
            setConfirmation({
                show: false,
                title: '',
                message: '',
                action: null,
                purchaseId: null,
                status: ''
            });

            // Update data lokal
            updateLocalData(purchaseId, status);

            // Reset state dari purchase yang dipilih
            setSelectedPurchase(null);

            // Tampilkan pesan sukses dari backend atau fallback ke default
            setAlert({
                show: true,
                message: response.message || `Purchase has been successfully ${actionType}`,
                type: 'success'
            });

            // Ambil data terbaru secara asinkron
            refreshDataFromAPI();

            // Sembunyikan alert sukses setelah beberapa detik
            setTimeout(() => {
                setAlert({ show: false, message: '', type: 'success' });
            }, 3000);
        } catch (error) {
            console.error('Error updating purchase status:', error);

            // Tutup modal konfirmasi dan buka kembali modal view
            handleCloseConfirmation();

            // Ekstrak pesan error dari response API jika ada
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Failed to update status. Please try again.';

            // Tampilkan pesan error
            setAlert({
                show: true,
                message: errorMessage,
                type: 'error'
            });

            // Atur timer untuk menghilangkan alert secara otomatis
            setTimeout(() => {
                setAlert({ show: false, message: '', type: 'error' });
            }, 5000);
        }
    };

    // Fungsi untuk memperbarui data lokal setelah approve/reject
    const updateLocalData = (purchaseId, newStatus) => {
        // Update purchaseData dalam allData
        const updatedData = allData.map(purchase => {
            if (purchase.purchaseID === purchaseId || purchase.id === purchaseId) {
                return { ...purchase, status: newStatus };
            }
            return purchase;
        });

        setAllData(updatedData);

        // Update summary data
        const newSummaryData = { ...summaryData };

        // Mengurangi jumlah pending
        if (newSummaryData.pendingRequests > 0) {
            newSummaryData.pendingRequests -= 1;
        }

        // Menambah jumlah approved atau rejected
        if (newStatus === 'accepted') {
            newSummaryData.approvedRequests = (newSummaryData.approvedRequests || 0) + 1;
        } else if (newStatus === 'denied') {
            newSummaryData.rejectedRequests = (newSummaryData.rejectedRequests || 0) + 1;
        }

        setSummaryData(newSummaryData);
    };

    // Fungsi untuk memuat ulang data terbaru dari API
    const refreshDataFromAPI = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];

            // Muat data purchase terbaru
            const newData = await apiHit('getAllPurchases', token);
            setAllData(newData);

            // Muat data summary terbaru
            const newSummary = await apiHit('purchase-report', token);
            setSummaryData({
                totalRequests: newSummary.total_requests,
                approvedRequests: newSummary.approved_requests,
                pendingRequests: newSummary.pending_requests,
                rejectedRequests: newSummary.rejected_requests,
            });
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };

    // Purchase approval icon
    const purchaseIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50">


            {/* Modern Header Component */}
            <Header
                icon={purchaseIcon}
                title="Purchase Approval"
                subtitle="Streamlined approval workflow for purchase requests and procurement management"
                badgeText="Live Updates"
            />

            <div className="px-6 pb-12 -mt-10 relative z-10">
                {/* Enhanced Summary Cards */}
                <div className="mb-12">
                    <SummaryCards
                        data={summaryData}
                        only={['totalRequests', 'approvedRequests', 'pendingRequests', 'rejectedRequests']}
                    />
                </div>

                {/* Alert Component */}
                <div className="fixed bottom-4 right-4 z-50">
                    {alert.show && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert({ ...alert, show: false })}
                        />
                    )}
                </div>

                {/* Enhanced Purchase Approval Table Section */}
                <DataCard
                    title="Purchase Request Management"
                    subtitle="Review, approve, and track all purchase requests with advanced filtering capabilities"
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    }
                    gradient="bg-gradient-to-br from-white via-purple-50 to-violet-100"
                >
                    {/* Enhanced Filter Controls */}
                    <div className="mb-6">
                        <FilterControls
                            filter={filter}
                            setFilter={setFilter}
                            onApply={handleApplyFilter}
                            onClear={handleClearFilter}
                            onExport={handleExport}
                            authors={authors}
                            categories={categories}
                            statuses={statuses}
                            resultCount={filteredData.length}
                            totalCount={allData?.length || 0}
                            showCategory={true}
                            showSuitor={false}
                            showAuthor={true}
                            showStatus={true}
                        />
                    </div>

                    {/* Purchase Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <PurchaseTable
                            data={filteredData}
                            itemsPerPage={5}
                            mode="purchase"
                            onView={handleViewPurchase}
                        />
                    </div>
                </DataCard>
                <PurchaseViewModal
                    mode="view"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    purchase={selectedPurchase}
                    onApprove={(id) => handleConfirmStatusChange(id, 'accepted')}
                    onReject={(id) => handleConfirmStatusChange(id, 'denied')}
                />

                {/* Confirmation Modal */}
                {confirmation.show && (
                    <ConfirmationModal
                        isOpen={confirmation.show}
                        title={confirmation.title}
                        message={confirmation.message}
                        onConfirm={handleUpdateStatus}
                        onClose={handleCloseConfirmation}
                        confirmText={confirmation.action === 'approve' ? 'Approve' : 'Reject'}
                        type={confirmation.action === 'approve' ? 'info' : 'danger'}
                    />
                )}
            </div>
        </div>
    );
}
