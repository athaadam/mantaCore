'use client';

import { useState } from 'react';
import FilterControls from './FilterControls';
import ActionButtons from './ActionButtons';
import PurchaseTable from './PurchaseTable';
import Pagination from '@/components/global/Pagination';

export default function PurchaseApprovalClient() {
    const [filter, setFilter] = useState({ from: '', to: '', category: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const allData = [
        { id: 1, date: '2023-10-01', invoiceId: 'INV001', suitor: 'John Doe', item: 'Laptop', customerId: 'CUST001', amount: 15000000, status: 'Approved' },
        { id: 2, date: '2023-10-02', invoiceId: 'INV002', suitor: 'Jane Smith', item: 'Printer', customerId: 'CUST002', amount: 3000000, status: 'Pending' },
        { id: 3, date: '2023-10-03', invoiceId: 'INV003', suitor: 'Alice Johnson', item: 'Monitor', customerId: 'CUST003', amount: 5000000, status: 'Declined' },
        { id: 4, date: '2023-10-04', invoiceId: 'INV004', suitor: 'Bob Brown', item: 'Keyboard', customerId: 'CUST004', amount: 500000, status: 'Approved' },
        { id: 5, date: '2023-10-05', invoiceId: 'INV005', suitor: 'Charlie White', item: 'Mouse', customerId: 'CUST005', amount: 200000, status: 'Pending' },
        { id: 6, date: '2023-10-06', invoiceId: 'INV006', suitor: 'Diana Prince', item: 'Desk Chair', customerId: 'CUST006', amount: 1200000, status: 'Approved' },
        { id: 7, date: '2023-10-07', invoiceId: 'INV007', suitor: 'Clark Kent', item: 'Desk Lamp', customerId: 'CUST007', amount: 350000, status: 'Pending' },
        { id: 8, date: '2023-10-08', invoiceId: 'INV008', suitor: 'Bruce Wayne', item: 'Notebook', customerId: 'CUST008', amount: 80000, status: 'Declined' },
        { id: 9, date: '2023-10-09', invoiceId: 'INV009', suitor: 'Barry Allen', item: 'Pen Set', customerId: 'CUST009', amount: 45000, status: 'Approved' },
        { id: 10, date: '2023-10-10', invoiceId: 'INV010', suitor: 'Hal Jordan', item: 'Tablet', customerId: 'CUST010', amount: 2500000, status: 'Pending' },
        { id: 11, date: '2023-10-11', invoiceId: 'INV011', suitor: 'Arthur Curry', item: 'Projector', customerId: 'CUST011', amount: 7000000, status: 'Approved' },
        { id: 12, date: '2023-10-12', invoiceId: 'INV012', suitor: 'Victor Stone', item: 'Whiteboard', customerId: 'CUST012', amount: 600000, status: 'Declined' },
        { id: 13, date: '2023-10-13', invoiceId: 'INV013', suitor: 'Selina Kyle', item: 'Filing Cabinet', customerId: 'CUST013', amount: 900000, status: 'Pending' },
        { id: 14, date: '2023-10-14', invoiceId: 'INV014', suitor: 'Pamela Isley', item: 'Coffee Machine', customerId: 'CUST014', amount: 1500000, status: 'Approved' },
        { id: 15, date: '2023-10-15', invoiceId: 'INV015', suitor: 'Harleen Quinzel', item: 'Shredder', customerId: 'CUST015', amount: 400000, status: 'Declined' },
    ];
    const paginatedData = allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    return (
        <>
        <div className="flex items-center gap-3 mb-6">
                <FilterControls filter={filter} setFilter={setFilter} onApply={() => console.log('Apply filter')} />
                <ActionButtons onExport={() => console.log('Export PDF')} />
        </div>

            <PurchaseTable data={paginatedData} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
        </>
    );
}
