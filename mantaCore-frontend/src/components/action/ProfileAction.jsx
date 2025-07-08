'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ProfileAction({ role }) {
    const router = useRouter();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
            {/* Change Password Button */}
            <button
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700"
                onClick={() => router.push(`profile/change-password`)}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0117 9zm-6 2l4 4m0 0l-2 2m2-2H9" />
                </svg>
                <span className="relative z-10">Change Password</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse"></div>
            </button>

            {/* Delete Account Button */}
            {!showDeleteConfirm ? (
                <button 
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-rose-700"
                    onClick={() => setShowDeleteConfirm(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="relative z-10">Delete Account</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse"></div>
                </button>
            ) : (
                <div className="flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="font-medium">Are you sure?</span>
                    </div>
                    <button 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        onClick={() => {
                            // Handle delete logic here
                            alert('Account deletion feature coming soon!');
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button 
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export function EditAccountAction({ role }) {
    const router = useRouter();
    return (
        <button
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border-2 border-white/30 rounded-2xl font-semibold shadow-lg backdrop-blur-sm hover:bg-white hover:text-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => router.push(`profile/edit-account`)}
        >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="relative z-10">Edit Profile</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
    );
}
