import InventoryClient from "@/components/client/InventoryClient";
import { cookies } from 'next/headers';
import Header3 from "@/components/header/Header3";
import Link from 'next/link';
import { apiHit } from "@/libs/api/fetch";

export default async function InventoryPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const profile = await apiHit('user', token);

    let itemsData = [];
    let fetchError = null;

    try {
        const itemsResponse = await apiHit('getAllItems', token);
        // Extract items array from response
        itemsData = Array.isArray(itemsResponse)
            ? itemsResponse
            : (itemsResponse?.items ?? []);
    } catch (error) {
        fetchError = error;
        console.log(error)
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                </div>

                <div className="relative z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-white/30 max-w-md text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Inventory</h1>
                    <p className="text-slate-600 mb-6">Unable to fetch inventory data. Please check your connection and try again.</p>
                    <Link
                        href="inventory"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Retry
                    </Link>
                </div>
            </div>
        );
    }

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
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <Header3
                        icon={
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                            </svg>
                        }
                        title="Inventory Portal"
                        subtitle="Manage your inventory efficiently with our comprehensive stock management system"
                        colorScheme="purple"
                    />

                    {/* Main Content */}
                    <div className="w-full">
                        <InventoryClient initialItems={itemsData} profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
}