import { cookies } from 'next/headers';
import SalesReportClient from '@/components/client/SalesReportClient';
import { apiHit } from '@/libs/api/fetch';

export default async function SalesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    try {
        const transactions = await apiHit('getAllInvoices', token);
        const report = await apiHit('sales-report', token);
        const filteredInvoices = await apiHit('filterInvoices', token);
        const summaryData = {
            totalSales: report.totalSales || 0,
            totalInvoice: report.totalInvoice || 0,
            productSold: report.productSold,
            activeCustomers: report.activeCustomer || 0,
        };

        return <SalesReportClient summaryData={summaryData} transactions={transactions.invoices} report={report} filter={filteredInvoices} />;
    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-medium">Failed to load sales report</p>
                </div>
            </div>
        );
    }
}
