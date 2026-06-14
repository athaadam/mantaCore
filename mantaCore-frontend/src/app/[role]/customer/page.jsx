import { cookies } from "next/headers";
import CustomerClient from "@/components/client/CustomerClient";
import Header3 from "@/components/header/Header3";
import { apiHit } from "@/libs/api/fetch";

const CustomerPage = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const profile = await apiHit('user', token);

    try {
        const costumersResponse = await apiHit('getAllCostumers', token);
        // Extract costumers array from response
        const costumers = Array.isArray(costumersResponse)
            ? costumersResponse
            : (costumersResponse?.costumers ?? []);

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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            }
                            title="Customer Portal"
                            subtitle="Streamline your customer relationships with our comprehensive management system"
                            colorScheme="purple"
                        />

                        {/* Main Content */}
                        <div className="w-full">
                            <CustomerClient initialCustomers={costumers} profile={profile} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Error</h1>
                    <p className="mt-2 text-red-500">Failed to load customers. Please try again later.</p>
                </div>
            </div>
        )
    }

};

export default CustomerPage;
