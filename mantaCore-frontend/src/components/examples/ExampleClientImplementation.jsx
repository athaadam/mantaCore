// Example implementation untuk SalesReportClient atau PurchaseApprovalClient

'use client';

import { useState, useMemo } from 'react';
import FilterControls from '@/components/filter/FilterControls';
import TransactionTable from '@/components/table/TransactionTable';
import { extractCustomers, extractCategories, applyFilters } from '@/components/utils/filterUtils';

export default function ExampleClient({ initialData = [] }) {
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        category: '',
        suitor: '',
        status: ''
    });

    // Extract unique customers and categories from data
    const customers = useMemo(() => extractCustomers(initialData), [initialData]);
    const categories = useMemo(() => extractCategories(initialData), [initialData]);
    
    // Apply filters to data
    const filteredData = useMemo(() => {
        return applyFilters(initialData, filter);
    }, [initialData, filter]);

    const handleApplyFilter = () => {
        // Optional: Add any additional logic when apply is clicked
        console.log('Filters applied:', filter);
    };

    const handleExport = () => {
        // Export logic here
        console.log('Exporting filtered data:', filteredData);
    };

    return (
        <div className="space-y-6">
            {/* Filter Controls with dynamic data */}
            <FilterControls
                filter={filter}
                setFilter={setFilter}
                onApply={handleApplyFilter}
                onExport={handleExport}
                customers={customers}
                categories={categories}
                showSuitor={true}
                showCategory={true}
                showStatus={true}
            />
            
            {/* Table with filtered data */}
            <TransactionTable
                transactions={filteredData}
                itemsPerPage={10}
                mode="detailed"
            />
        </div>
    );
}
