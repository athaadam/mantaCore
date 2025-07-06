'use client';

import { useState } from 'react';
import FilterControls from '../filter/FilterControls';
import PurchaseTable from '../table/PurchaseTable';

export default function PurchaseApprovalClient({allData}) {
    const [filter, setFilter] = useState({ from: '', to: '', category: '', status: '' });

    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <FilterControls
                    filter={filter}
                    setFilter={setFilter}
                    onApply={() => console.log('apply', filter)}
                    onExport={() => console.log('export')}
                    showCategory={true}
                    showSuitor={true}
                    showStatus={true}
                />
            </div>
            <PurchaseTable data={allData} itemsPerPage={5} mode="purchase" />
        </>
    );
}
