'use client';

import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import React from 'react';

const InvoiceStats = ({ invoices = [] }) => {
    // Calculate statistics
    const stats = invoices.reduce((acc, invoice) => {
        const amount = invoice.total_amount || 0;
        const status = invoice.status?.toLowerCase() || 'draft';

        acc.total += amount;
        acc.count += 1;

        if (status === 'paid') {
            acc.paid += amount;
            acc.paidCount += 1;
        } else if (status === 'pending') {
            acc.pending += amount;
            acc.pendingCount += 1;
        } else if (status === 'overdue') {
            acc.overdue += amount;
            acc.overdueCount += 1;
        } else if (status === 'draft') {
            acc.draft += amount;
            acc.draftCount += 1;
        }

        return acc;
    }, {
        total: 0,
        paid: 0,
        pending: 0,
        overdue: 0,
        draft: 0,
        count: 0,
        paidCount: 0,
        pendingCount: 0,
        overdueCount: 0,
        draftCount: 0
    });

    // Format currency
    const formatCurrency = (amount) => {
        return formatRupiah(amount, 'IDR');
    };

    const statCards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.total),
            count: `${stats.count} invoices`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            gradient: 'from-purple-500 to-indigo-600',
            bg: 'bg-gradient-to-br from-purple-100 to-indigo-100'
        },
        {
            title: 'Paid',
            value: formatCurrency(stats.paid),
            count: `${stats.paidCount} invoices`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-green-500 to-emerald-600',
            bg: 'bg-gradient-to-br from-green-100 to-emerald-100'
        },
        {
            title: 'Pending',
            value: formatCurrency(stats.pending),
            count: `${stats.pendingCount} invoices`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-yellow-500 to-orange-600',
            bg: 'bg-gradient-to-br from-yellow-100 to-orange-100'
        },
        {
            title: 'Overdue',
            value: formatCurrency(stats.overdue),
            count: `${stats.overdueCount} invoices`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            gradient: 'from-red-500 to-red-600',
            bg: 'bg-gradient-to-br from-red-100 to-red-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statCards.map((card, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`bg-gradient-to-r ${card.gradient} px-6 py-4`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    {card.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">{card.title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="text-2xl font-bold text-slate-900 mb-1">{card.value}</div>
                        <div className="text-sm text-slate-600">{card.count}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InvoiceStats;
