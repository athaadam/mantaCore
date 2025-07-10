'use client';

import { formatRupiah } from '@/libs/utils/formats/formatRupiah';

// Simple SVG icons to replace @heroicons/react/24/outline
const ShoppingCartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
);

const ClockIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CurrencyDollarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
);

const TrendingUpIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const CalendarDaysIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PurchaseStats = ({ stats, loading = false }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Requests',
            value: stats?.total || 0,
            icon: ShoppingCartIcon,
            color: 'from-purple-500 to-indigo-600',
            textColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            change: stats?.totalChange || 0,
            changeType: 'increase'
        },
        {
            title: 'Pending',
            value: stats?.pending || 0,
            icon: ClockIcon,
            color: 'from-yellow-500 to-orange-600',
            textColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            change: stats?.pendingChange || 0,
            changeType: 'neutral'
        },
        {
            title: 'Accepted',
            value: stats?.accepted || 0,
            icon: CheckCircleIcon,
            color: 'from-green-500 to-emerald-600',
            textColor: 'text-green-600',
            bgColor: 'bg-green-50',
            change: stats?.acceptedChange || 0,
            changeType: 'increase'
        },
        {
            title: 'Denied',
            value: stats?.denied || 0,
            icon: XCircleIcon,
            color: 'from-red-500 to-rose-600',
            textColor: 'text-red-600',
            bgColor: 'bg-red-50',
            change: stats?.rejectedChange || 0,
            changeType: 'decrease'
        },
        {
            title: 'Total Value',
            value: stats?.totalValue || 0,
            icon: CurrencyDollarIcon,
            color: 'from-blue-500 to-cyan-600',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            change: stats?.valueChange || 0,
            changeType: 'increase',
            isAmount: true
        }
    ];

    const formatValue = (value, isAmount = false) => {
        if (isAmount) {
            return formatRupiah(value);
        }
        return new Intl.NumberFormat('en-US').format(value);
    };

    const getChangeColor = (change, changeType) => {
        if (change === 0) return 'text-gray-500';
        if (changeType === 'increase') {
            return change > 0 ? 'text-green-600' : 'text-red-600';
        } else if (changeType === 'decrease') {
            return change > 0 ? 'text-red-600' : 'text-green-600';
        }
        return 'text-gray-500';
    };

    const getChangeIcon = (change) => {
        if (change === 0) return null;
        return change > 0 ? '↗' : '↘';
    };

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bgColor}`}>
                                <card.icon className={`h-6 w-6 ${card.textColor}`} />
                            </div>
                            {card.change !== 0 && (
                                <div className={`text-sm font-medium ${getChangeColor(card.change, card.changeType)}`}>
                                    {getChangeIcon(card.change)} {Math.abs(card.change)}%
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatValue(card.value, card.isAmount)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Stats Row */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-indigo-50">
                            <UsersIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Active Companies</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats?.activeCompanies || 0}
                        </p>
                        <p className="text-sm text-gray-500">
                            Companies with requests
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-pink-50">
                            <TrendingUpIcon className="h-6 w-6 text-pink-600" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Avg. Request Value</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatValue(stats?.avgRequestValue || 0, true)}
                        </p>
                        <p className="text-sm text-gray-500">
                            Per request average
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-teal-50">
                            <CalendarDaysIcon className="h-6 w-6 text-teal-600" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats?.thisMonth || 0}
                        </p>
                        <p className="text-sm text-gray-500">
                            New requests
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseStats;
