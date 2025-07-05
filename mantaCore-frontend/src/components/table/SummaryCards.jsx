'use client';

import Image from 'next/image';

export default function SummaryCards({ data = {}, only = [] }) {
  const structure = [
    {
      key: 'totalSales',
      title: 'Total Sales',
      icon: '/sales.png',
      isCurrency: true,
    },
    {
      key: 'todayPnL',
      title: "Today's Profit & Loss",
      icon: '/pnl.png',
      isCurrency: true,
    },
    {
      key: 'lifetimePnL',
      title: 'Lifetime Profit & Loss',
      icon: '/pnl.png',
      isCurrency: true,
    },
    {
      key: 'totalInvoice',
      title: 'Total Invoices',
      icon: '/invoice.svg',
      isCurrency: false,
    },
    {
      key: 'productSold',
      title: 'Products Sold',
      icon: '/purchase.svg',
      isCurrency: false,
    },
    {
      key: 'activeCustomers',
      title: 'Active Customers',
      icon: '/customer.svg',
      isCurrency: false,
    },
    {
      key: 'totalRequests',
      title: 'Total Requests',
      icon: '/request.svg',
      isCurrency: false,
    },
    {
      key: 'approvedRequests',
      title: 'Approved Requests',
      icon: '/approved.svg',
      isCurrency: false,
    },
    {
      key: 'pendingRequests',
      title: 'Pending Requests',
      icon: '/pending.svg',
      isCurrency: false,
    },
    {
      key: 'rejectedRequests',
      title: 'Rejected Requests',
      icon: '/rejected.svg',
      isCurrency: false,
    },
  ];

  const filtered = only.length
    ? structure.filter(({ key }) => only.includes(key))
    : structure;

  return (
<>
      {filtered.map(({ key, title, icon, isCurrency }) => {
        const rawValue = data[key];
        const displayValue =
          rawValue !== undefined
            ? isCurrency
              ? `Rp${Number(rawValue).toLocaleString()}`
              : Number(rawValue).toLocaleString()
            : isCurrency
              ? 'Rp0'
              : '0';

        return (
          <div
            key={key}
            className="bg-white flex items-center gap-4 p-6 h-[120px] shadow rounded-xl"
          >
            <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#f3f0ff] rounded">
              <Image src={icon} alt={title} width={40} height={40} className="object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm text-gray-500 mb-1">{title}</div>
              <div className="text-xl font-bold text-gray-900">{displayValue}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
