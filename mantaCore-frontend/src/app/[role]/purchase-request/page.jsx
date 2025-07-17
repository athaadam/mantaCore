import PurchaseRequestClient from "@/components/client/PurchaseRequestClient";
import Header3 from "@/components/header/Header3";
import { apiHit } from "@/libs/api/fetch";
import { cookies } from "next/headers";

const Page = async () => {
    const cookie = await cookies();
    const token = await cookie.get('auth').value;

    // Fetch all necessary data for the purchase request page
    const [profile, myPurchaseRequests, items] = await Promise.all([
        apiHit('user', token),
        apiHit('getMyPurchases', token),
        apiHit('getAllItems', token)
    ]);

    // Prepare API data for client component
    const api = {
        profile: profile || { user: {}, company: {} },
        // Make sure we handle both the case where purchases is undefined and where it's an array
        purchases: myPurchaseRequests?.purchases || [],
        items: Array.isArray(items) ? items : []
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>
            {/* Content Container */}
            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="max-w-7xl mx-auto">
                    <Header3
                        icon={
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M8 11v4a4 4 0 008 0v-4m-8 0h8" />
                            </svg>
                        }
                        title="Purchase Request Portal"
                        subtitle="Manage your purchase requests efficiently and effectively"
                        colorScheme="purple"
                    />
                    {/* Main Content */}
                    <PurchaseRequestClient api={api} />
                </div>
            </div>
        </div>
    );
};

export default Page;