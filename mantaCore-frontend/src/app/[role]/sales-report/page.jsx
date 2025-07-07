import { cookies } from 'next/headers';
import SalesReportClient from '@/components/client/SalesReportClient';
import { salesReport } from '@/libs/api/sales-report/index';
import { getInvoices } from '@/libs/api/sales-report';

export default async function SalesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const transactions = await getInvoices(token);
    const report = await salesReport(token);

    const summaryData = {
        totalSales: report.totalSales || 0,
        totalInvoice: report.totalInvoice || 0,
        productSold: report.productSold,
        activeCustomers: report.activeCustomer || 0,
    };

    console.log(transactions)


    return <SalesReportClient summaryData={summaryData} transactions={transactions.invoices} report={report} />;
}
