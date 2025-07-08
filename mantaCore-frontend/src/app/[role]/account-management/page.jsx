import { cookies } from 'next/headers';
import AccountManagementClient from '@/components/client/AccountManagementClient';
import { fetchAllUsers } from '@/libs/api/account-management';

export default async function AccountManagementPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    try {
        const accounts = await fetchAllUsers(token);
        return (
            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                        </svg>
                        <span>Dashboard</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-slate-900 font-medium">Account Management</span>
                    </nav>

                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                        Account Management
                                    </h1>
                                    <p className="text-slate-600 max-w-2xl">
                                        Manage user accounts, roles, and permissions for your organization. 
                                        Create new accounts, update existing ones, and control access levels.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                        <span className="font-medium text-slate-700">{accounts?.length || 0}</span>
                                        <span className="text-slate-500">Total Accounts</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-slate-600">System Active</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Create new accounts</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Edit user details</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>Manage permissions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                    </svg>
                                    <span>Disable accounts</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <AccountManagementClient initialData={accounts} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return (
            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-red-50 to-orange-50 min-h-screen overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                        </svg>
                        <span>Dashboard</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-slate-900 font-medium">Account Management</span>
                    </nav>

                    <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
                        {/* Error Header */}
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold">Unable to Load Account Data</h1>
                                    <p className="text-red-100 text-sm">System encountered an error while fetching account information</p>
                                </div>
                            </div>
                        </div>

                        {/* Error Content */}
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">
                                Something Went Wrong
                            </h2>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                We encountered an error while fetching account data. This could be due to network issues, 
                                server problems, or authentication timeout.
                            </p>

                            {/* Error Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Try Again
                                </button>
                                
                                <button 
                                    onClick={() => window.history.back()} 
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 font-medium border border-slate-300"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Go Back
                                </button>
                            </div>
                        </div>

                        {/* Help Section */}
                        <div className="bg-slate-50 border-t border-slate-200 px-8 py-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-medium text-slate-900 mb-1">Need Help?</h3>
                                    <p className="text-sm text-slate-600 mb-3">
                                        If this problem persists, try the following steps:
                                    </p>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• Check your internet connection</li>
                                        <li>• Clear your browser cache and cookies</li>
                                        <li>• Try logging out and logging back in</li>
                                        <li>• Contact support if the issue continues</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
