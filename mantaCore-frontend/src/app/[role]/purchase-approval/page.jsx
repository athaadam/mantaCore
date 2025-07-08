import SummaryCards from '@/components/card/SummaryCards';
import PurchaseApprovalClient from '@/components/client/PurchaseApprovalClient';
import { getAllPurchases } from '@/libs/api/purchase-approval';
import { cookies } from 'next/headers';

export default async function PurchaseApprovalPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    const summaryData = {
        totalRequests: 120,
        approvedRequests: 80,
        pendingRequests: 30,
        rejectedRequests: 10,
    };

    const allData = await getAllPurchases(token);
    return <PurchaseApprovalClient summaryData={summaryData} allData={allData} />;
}
