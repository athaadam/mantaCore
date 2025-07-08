import { getAllCustomers } from "@/libs/api/customer";
import { getProfile } from "@/libs/api/auth";
import { cookies } from "next/headers";
import CustomerClient from "@/components/client/CustomerClient";

const CustomerPage = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const profile = await getProfile(token);
    const api = await getAllCustomers(token);

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
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v6m0 0h-6m6 0l-6-6" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-4 tracking-tight">
                            Customer Portal
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Streamline your customer relationships with our comprehensive management system
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full">
                        <CustomerClient initialCustomers={api} profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;
