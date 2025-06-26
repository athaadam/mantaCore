const summaryStructure = [
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
    }
];

export default summaryStructure;
