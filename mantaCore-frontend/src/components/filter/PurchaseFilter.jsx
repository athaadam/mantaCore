'use client';

import { useState, useEffect } from 'react';
// Simple SVG icons to replace @heroicons/react/24/outline
const MagnifyingGlassIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const FunnelIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const XMarkIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CalendarDaysIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CurrencyDollarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
);

const BuildingOfficeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

const ClockIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CogIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PurchaseFilter = ({
    onFilterChange,
    activeFilters = [],
}) => {
    // Use predefined status options for consistency
    const statusOptions = [
        { value: 'pending', label: 'Pending', icon: ClockIcon, color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
        { value: 'accepted', label: 'Accepted', icon: CheckCircleIcon, color: 'bg-green-50 text-green-600 border-green-200' },
        { value: 'denied', label: 'Denied', icon: XCircleIcon, color: 'bg-red-50 text-red-600 border-red-200' },
    ];

    // Toggle status filter - use memoization to avoid re-renders
    const handleToggleStatus = (status) => {
        const updatedFilters = activeFilters.includes(status)
            ? activeFilters.filter(s => s !== status)
            : [...activeFilters, status];
            
        onFilterChange(updatedFilters);
    };

    // Clear all filters
    const handleClearFilters = () => {
        onFilterChange([]);
    };

    return (
        <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter Pills */}
                {statusOptions.map(status => (
                    <button
                        key={status.value}
                        onClick={() => handleToggleStatus(status.value)}
                        className={`inline-flex items-center px-3 py-2 rounded-full border transition-all ${activeFilters.includes(status.value)
                                ? `${status.color}`
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <status.icon className={`w-4 h-4 mr-2 ${activeFilters.includes(status.value) ? '' : 'text-gray-400'
                            }`} />
                        <span className="text-sm font-medium">
                            {status.label}
                        </span>
                    </button>
                ))}

                {/* Clear Filters Button (only show if filters are active) */}
                {activeFilters.length > 0 && (
                    <button
                        onClick={handleClearFilters}
                        className="inline-flex items-center px-3 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <XMarkIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                        <span className="text-sm">Clear Filters</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default PurchaseFilter;
