'use client';

import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import React from 'react';

const InvoiceStats = ({ invoices = [] }) => {
    // Calculate statistics
    const stats = invoices.reduce((acc, invoice) => {
        const amount = invoice.amount || 0;
        const itemCount = invoice.items?.length || 0;
        
        // Total revenue and invoice count
        acc.total += amount;
        acc.count += 1;
        
        // Total items sold
        acc.totalItems += itemCount;
        
        // Highest value invoice
        if (amount > acc.highestValue) {
            acc.highestValue = amount;
            acc.highestInvoiceId = invoice.invoiceID;
        }
        
        // Invoice with most items
        if (itemCount > acc.mostItems) {
            acc.mostItems = itemCount;
            acc.mostItemsInvoiceId = invoice.invoiceID;
        }
        
        // Recent invoices (last 30 days)
        const invoiceDate = new Date(invoice.date);
        const now = new Date();
        const daysDiff = Math.floor((now - invoiceDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 30) {
            acc.recent += amount;
            acc.recentCount += 1;
        }

        return acc;
    }, {
        total: 0,
        count: 0,
        totalItems: 0,
        highestValue: 0,
        highestInvoiceId: '',
        mostItems: 0,
        mostItemsInvoiceId: '',
        recent: 0,
        recentCount: 0
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
            title: 'Total Items Sold',
            value: stats.totalItems.toString(),
            count: `Across all invoices`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            gradient: 'from-green-500 to-emerald-600',
            bg: 'bg-gradient-to-br from-green-100 to-emerald-100'
        },
        {
            title: 'Recent Revenue',
            value: formatCurrency(stats.recent),
            count: `${stats.recentCount} invoices in 30 days`,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-yellow-500 to-orange-600',
            bg: 'bg-gradient-to-br from-yellow-100 to-orange-100'
        },
        {
            title: 'Best Selling Invoice',
            value: formatCurrency(stats.highestValue),
            count: stats.highestInvoiceId ? `Invoice #${stats.highestInvoiceId}` : 'No data available',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            gradient: 'from-blue-500 to-sky-600',
            bg: 'bg-gradient-to-br from-blue-100 to-sky-100'
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
