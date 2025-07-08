'use client';

import { useState, useMemo } from 'react';
import FilterControls from '../filter/FilterControls';
import PurchaseTable from '../table/PurchaseTable';
import Header from '@/components/header/Header';
import DataCard from '@/components/card/DataCard';
import SummaryCards from '@/components/card/SummaryCards';
import { extractCustomers, extractCategories, extractStatuses, extractAuthors, applyFilters } from '@/components/utils/filterUtils';

export default function PurchaseApprovalClient({ summaryData, allData }) {
    const [filter, setFilter] = useState({ 
        from: '', 
        to: '', 
        category: '', 
        suitor: '',
        author: '',
        status: '' 
    });
    
    const [appliedFilter, setAppliedFilter] = useState({});

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
        console.log('Filters applied:', filter);
        console.log('Original data count:', allData?.length || 0);
        setAppliedFilter({ ...filter });
        
        // Add delay to log filtered count after state update
        setTimeout(() => {
            console.log('Filtered data count:', filteredData.length);
        }, 100);
    };

    const handleClearFilter = () => {
        const clearedFilter = { from: '', to: '', category: '', suitor: '', author: '', status: '' };
        setFilter(clearedFilter);
        setAppliedFilter({});
        console.log('Filters cleared');
    };

    const handleExport = () => {
        console.log('Exporting filtered purchase data:', filteredData);
        if (filteredData.length === 0) {
            alert('No data to export. Please adjust your filters.');
            return;
        }
        // Export logic here
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
                        <PurchaseTable data={filteredData} itemsPerPage={5} mode="purchase" />
                    </div>
                </DataCard>
            </div>
        </div>
    );
}
