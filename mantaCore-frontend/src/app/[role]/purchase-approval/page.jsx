import PurchaseApprovalClient from '@/components/client/PurchaseApprovalClient';
import { apiHit } from '@/libs/api/fetch';
import { cookies } from 'next/headers';

export default async function PurchaseApprovalPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const allData = await apiHit('getAllPurchases', token);
    const res = await apiHit('purchase-report', token);
    const summaryData = {
        totalRequests: res.total_requests,
        approvedRequests: res.approved_requests,
        pendingRequests: res.pending_requests,
        rejectedRequests: res.rejected_requests,
    };



    return <PurchaseApprovalClient summaryData={summaryData} allData={allData} />;
}
