import SummaryCards from '@/components/table/SummaryCards';
import PurchaseApprovalClient from '@/components/client/PurchaseApprovalClient';
import { getAllPurchases } from '@/libs/api/purchase-approval';
import { cookies } from 'next/headers';

export default async function PurchaseApprovalPage() {
    const token = cookies().get('auth')?.value;

    const summaryData = {
        totalRequests: 120,
        approvedRequests: 80,
        pendingRequests: 30,
        rejectedRequests: 10,
    };

    const allData = await getAllPurchases(token);

    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Purchase Approval</h1>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 drop-shadow-lg mb-8 w-full">
                {/* ✅ SummaryCards tetap server component */}
                <SummaryCards
                    data={summaryData}
                    only={['totalRequests', 'approvedRequests', 'pendingRequests', 'rejectedRequests']}
                />
            </div>

            {/* ✅ Komponen client terpisah */}
            <PurchaseApprovalClient allData={allData} />
        </div>
    );
}
