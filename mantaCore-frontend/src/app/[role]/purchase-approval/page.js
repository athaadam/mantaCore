// ✅ src/app/[role]/purchase-approval/page.js
import SummaryCards from '@/components/summarycards';
import PurchaseApprovalClient from '@/components/purchase-approval/PurchaseApprovalClient';

export default function PurchaseApprovalPage() {
    const summaryData = {
        totalRequests: 120,
        approvedRequests: 80,
        pendingRequests: 30,
        rejectedRequests: 10,
    };

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
            <PurchaseApprovalClient />
        </div>
    );
}
