// Contoh penggunaan SectionWrapper untuk berbagai section
'use client';

import SectionWrapper from '../layout/SectionWrapper';

// Contoh untuk Dashboard Overview
export function DashboardOverviewSection({ children }) {
    return (
        <SectionWrapper
            title="Dashboard Overview"
            description="Monitor your business performance and key metrics"
            icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            headerGradient="from-blue-50 to-indigo-50"
            iconGradient="from-blue-600 to-indigo-600"
        >
            {children}
        </SectionWrapper>
    );
}

// Contoh untuk Invoice Management
export function InvoiceManagementSection({ children, invoiceCount }) {
    const badge = (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-lg text-sm text-blue-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {invoiceCount} Invoices
        </span>
    );

    return (
        <SectionWrapper
            title="Invoice Management"
            description="Create, edit, and track your invoices and payments"
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            badge={badge}
            headerGradient="from-emerald-50 to-teal-50"
            iconGradient="from-emerald-600 to-teal-600"
        >
            {children}
        </SectionWrapper>
    );
}

// Contoh untuk Settings
export function SettingsSection({ children }) {
    return (
        <SectionWrapper
            title="System Settings"
            description="Configure your application preferences and system settings"
            icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            headerGradient="from-gray-50 to-slate-50"
            iconGradient="from-gray-600 to-slate-600"
        >
            {children}
        </SectionWrapper>
    );
}
