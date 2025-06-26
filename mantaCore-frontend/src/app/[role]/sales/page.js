import Image from 'next/image'
import TopSales from '@/components/topsales'
import SummaryCards from '@/components/dashboard/summarycards';
import TransactionTable from '@/components/dashboard/transactiontable.';
import PurchaseRequestTable from '@/components/dashboard/purchaserequesttable';
import SalesByCategory from '@/components/sales/salesbycategory';
import TransactionFilterRow from '@/components/sales/transactionfilter';
import TransactionHistory from '@/components/sales/transactionhistory';


export default function DashboardPage() {

    const summaryData = {
        totalSales: 400000000,
        totalInvoice: 2000,
        productSold: 2000,
        activeCustomers: 500,
    };

    const transactions = [
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
        {
            date: 'April 1, 2025',
            invoiceId: 'INV-001',
            author: 'AHMD',
            item: 'Tumbler, Spoon',
            customerId: 'CUST-001',
            amount: 'Rp20.000',
        },
    ];

    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Sales Report
            </h1>
            {/* Summary Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 drop-shadow-lg mb-8 w-full">
                <SummaryCards
                    data={summaryData}
                    only={['totalSales', 'totalInvoice', 'productSold', 'activeCustomers']}
                />
            </div>
            {/* Charts & Sales by Category */}
            <div className="grid md:grid-cols-2 gap-6 mb-6 drop-shadow-lg items-stretch">
                <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
                    <TopSales />
                </div>
                <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
                    <SalesByCategory />
                </div>
            </div>
            {/* Transasction History */}

            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 drop-shadow-lg">
                <h3 className="text-xl text-gray-800 font-semibold">
                    Transaction History
                </h3>
                <TransactionFilterRow />
            </div>
            <TransactionHistory
                transactions={transactions}
                itemsPerPage={10}
            />
        </div>
    )
}