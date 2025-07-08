'use client';

import StatsGrid from '../card/StatsGrid';

export default function InvoiceStatsGrid({ invoices = [] }) {
    // Override data untuk invoice statistics
    const invoiceStatsData = [
        {
            title: "Total Invoices",
            value: invoices.length,
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            title: "Paid Invoices",
            value: invoices.filter(inv => inv.status === 'paid').length,
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            title: "Pending",
            value: invoices.filter(inv => inv.status === 'pending').length,
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600"
        },
        {
            title: "Overdue",
            value: invoices.filter(inv => inv.status === 'overdue').length,
            icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
            bgColor: "bg-red-100",
            iconColor: "text-red-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {invoiceStatsData.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                />
            ))}
        </div>
    );
}
