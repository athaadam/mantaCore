'use client';

import { useState } from 'react';

// Simple SVG icons to replace @heroicons/react/24/outline
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

const PurchaseFilter = ({
    onFilterChange,
    activeFilters = [],
    onDateChange,
    dateRange = { preset: '' }
}) => {
    // Extract status filter options
    const statusOptions = [
        {
            value: 'pending',
            label: 'Pending',
            icon: ClockIcon,
            type: 'status',
            color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
        },
        {
            value: 'accepted',
            label: 'Accepted',
            icon: CheckCircleIcon,
            type: 'status',
            color: 'bg-green-50 text-green-600 border-green-200'
        },
        {
            value: 'denied',
            label: 'Denied',
            icon: XCircleIcon,
            type: 'status',
            color: 'bg-red-50 text-red-600 border-red-200'
        }
    ];

    // Extract date filter preset options
    const dateFilterOptions = [
        {
            value: 'today',
            label: 'Today',
        },
        {
            value: 'yesterday',
            label: 'Yesterday',
        },
        {
            value: 'thisWeek',
            label: 'This Week',
        },
        {
            value: 'lastWeek',
            label: 'Last Week',
        },
        {
            value: 'thisMonth',
            label: 'This Month',
        },
        {
            value: 'lastMonth',
            label: 'Last Month',
        }
    ];

    // Toggle status filter
    const handleToggleStatus = (status) => {
        const updatedFilters = activeFilters.includes(status)
            ? activeFilters.filter(s => s !== status)
            : [...activeFilters, status];

        onFilterChange(updatedFilters);
    };

    // Handle date preset selection with toggle behavior
    const handleDatePresetChange = (preset) => {
        if (onDateChange) {
            // If the same preset is clicked, clear it; otherwise set the new preset
            const newPreset = dateRange.preset === preset ? '' : preset;
            onDateChange({ preset: newPreset });
        }
    };

    // Clear all filters
    const handleClearFilters = () => {
        onFilterChange([]);
        if (onDateChange) {
            onDateChange({ preset: '' });
        }
    };

    // Check if any filter is active
    const isAnyFilterActive = activeFilters.length > 0 || dateRange.preset;

    return (
        <div className="mb-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <FunnelIcon className="w-4 h-4 mr-2 text-purple-500" />
                        Filters
                    </h3>
                    
                    {/* Clear All Filters Button (only show if any filter is active) */}
                    {isAnyFilterActive && (
                        <button
                            onClick={handleClearFilters}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <XMarkIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                            <span className="text-xs font-medium">Clear All Filters</span>
                        </button>
                    )}
                </div>
                
                <div className="space-y-5">
                    {/* Status Filters Section */}
                    <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Status</h4>
                        <div className="flex flex-wrap items-center gap-2">
                            {statusOptions.map(status => (
                                <button
                                    key={status.value}
                                    onClick={() => handleToggleStatus(status.value)}
                                    className={`inline-flex items-center px-4 py-2 rounded-lg border transition-all ${
                                        activeFilters.includes(status.value)
                                            ? `${status.color}`
                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <status.icon className={`w-5 h-5 mr-2 ${
                                        activeFilters.includes(status.value) ? '' : 'text-gray-400'
                                    }`} />
                                    <span className="text-sm font-medium">
                                        {status.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Date Filters Section */}
                    {onDateChange && (
                        <div>
                            <h4 className="text-xs font-medium text-gray-500 mb-2">Date</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                {dateFilterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleDatePresetChange(option.value)}
                                        className={`inline-flex items-center justify-center px-3 py-2 rounded-lg border transition-all ${
                                            dateRange.preset === option.value
                                                ? 'bg-purple-100 text-purple-700 border-purple-300 shadow-sm'
                                                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="text-sm font-medium">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchaseFilter;
