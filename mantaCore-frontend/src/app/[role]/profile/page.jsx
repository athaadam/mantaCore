import { cookies } from "next/headers";
import Image from "next/image";
import { formatDate } from "@/libs/utils/formats/formatdate";
import { ProfileAction, EditAccountAction } from '@/components/action/ProfileAction';
import PageBreadcrumb from "@/components/header/layout/PageBreadCrump";
import { apiHit } from "@/libs/api/fetch";


export default async function ProfilePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const data = await apiHit('user', token);

    return (
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-y-auto">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Breadcrumb Navigation */}
                    <PageBreadcrumb items={["Dashboard", "Profile"]} />

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
                        {/* Hero Header */}
                        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 lg:p-12">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                                {/* Avatar Section */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-white p-1 rounded-full">
                                        <Image
                                            src="/assets/common/user.jpg"
                                            alt="User Avatar"
                                            width={128}
                                            height={128}
                                            className="w-full h-full rounded-full object-cover ring-4 ring-white/50 group-hover:ring-white transition-all duration-300"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-white">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                                                {data.user.username}
                                            </h1>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${data.user.role === 'admin' ? 'bg-red-500/20 text-red-100 border border-red-400/30' :
                                                    data.user.role === 'management' ? 'bg-blue-500/20 text-blue-100 border border-blue-400/30' :
                                                        'bg-green-500/20 text-green-100 border border-green-400/30'
                                                    }`}>
                                                    {data.user.role === 'admin' && (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                    )}
                                                    {data.user.role === 'management' && (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    )}
                                                    {data.user.role === 'cashier' && (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    )}
                                                    <span className="capitalize">{data.user.role}</span>
                                                </span>
                                            </div>
                                            <p className="text-white/80 text-lg">
                                                Member of {data.company.companyName}
                                            </p>
                                        </div>

                                        {/* Quick Action */}
                                        <div className="flex gap-3">
                                            <EditAccountAction role={data.user.role} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-8 lg:p-12">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 hover:border-blue-300/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-600 group-hover:text-blue-700 transition-colors">Company</p>
                                            <p className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{data.company.companyName}</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="group relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200/50 hover:border-green-300/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-600 group-hover:text-green-700 transition-colors">Status</p>
                                            <p className="text-lg font-bold text-green-600 group-hover:text-green-800 transition-colors">Active</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="group relative bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200/50 hover:border-purple-300/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-600 group-hover:text-purple-700 transition-colors">Member Since</p>
                                            <p className="text-lg font-bold text-slate-900 group-hover:text-purple-900 transition-colors">{formatDate(data.user.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>

                            {/* Detailed Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        Personal Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-slate-600">Email Address</p>
                                                    <p className="text-slate-900 font-semibold">{data.user.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-slate-600">Phone Number</p>
                                                    <p className="text-slate-900 font-semibold">{data.user.phone_number || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        Account Details
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-200/50 hover:bg-green-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-green-700">Subscription Status</p>
                                                    <p className="text-green-900 font-semibold">Active until {formatDate(data.company.subscription_until)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-slate-600">Last Updated</p>
                                                    <p className="text-slate-900 font-semibold">{formatDate(data.user.updated_at)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <ProfileAction role={data.user.role} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
