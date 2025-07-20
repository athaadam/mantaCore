'use client';

import React from 'react';

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Delete', 
    cancelText = 'Cancel', 
    type = 'danger',
    loading = false 
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            icon: (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            iconBg: 'bg-red-100',
            confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
            gradient: 'from-red-600 to-red-700'
        },
        warning: {
            icon: (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            iconBg: 'bg-yellow-100',
            confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
            gradient: 'from-yellow-600 to-yellow-700'
        },
        info: {
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconBg: 'bg-blue-100',
            confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            gradient: 'from-blue-600 to-blue-700'
        }
    };

    const currentStyle = typeStyles[type] || typeStyles.danger;

    // Loading spinner component
    const LoadingSpinner = () => (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );

    return (
        <div className="fixed inset-0 z-[99999] overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={loading ? null : onClose}></div>
            
            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${currentStyle.gradient} px-6 py-4 rounded-t-2xl`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 ${currentStyle.iconBg} rounded-xl`}>
                                {currentStyle.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                {title}
                            </h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-2xl">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className={`px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={loading}
                                className={`flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentStyle.confirmButton} ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {loading && <LoadingSpinner />}
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
