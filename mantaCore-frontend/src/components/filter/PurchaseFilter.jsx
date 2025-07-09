'use client';

import { useState } from 'react';
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
    onFilter, 
    onClear, 
    hasActiveFilters, 
    companies = [],
    loading = false 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        companyID: '',
        dateFrom: '',
        dateTo: '',
        amountMin: '',
        amountMax: ''
    });

    const statusOptions = [
        { value: 'pending', label: 'Pending', icon: ClockIcon, color: 'text-yellow-600' },
        { value: 'approved', label: 'Approved', icon: CheckCircleIcon, color: 'text-green-600' },
        { value: 'rejected', label: 'Rejected', icon: XCircleIcon, color: 'text-red-600' },
        { value: 'processing', label: 'Processing', icon: CogIcon, color: 'text-blue-600' }
    ];

    const handleInputChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleApplyFilters = () => {
        onFilter(filters);
        setIsOpen(false);
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            search: '',
            status: '',
            companyID: '',
            dateFrom: '',
            dateTo: '',
            amountMin: '',
            amountMax: ''
        };
        setFilters(clearedFilters);
        onClear();
        setIsOpen(false);
    };

    const getActiveFilterCount = () => {
        return Object.values(filters).filter(value => value !== '').length;
    };

    return (
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
                        <p className="text-sm text-gray-500">Find purchase requests quickly</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <FunnelIcon className="h-4 w-4" />
                        <span>Filters</span>
                        {getActiveFilterCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {getActiveFilterCount()}
                            </span>
                        )}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by request ID, company name, or user..."
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        value={filters.search}
                        onChange={(e) => handleInputChange('search', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
                    />
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-purple-700">Active Filters:</span>
                                <span className="text-sm text-purple-600">{getActiveFilterCount()} filter(s) applied</span>
                            </div>
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-purple-700 hover:text-purple-900 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                )}

                {/* Advanced Filters Panel */}
                {isOpen && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">All Statuses</option>
                                    {statusOptions.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Company Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company
                                </label>
                                <select
                                    value={filters.companyID}
                                    onChange={(e) => handleInputChange('companyID', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">All Companies</option>
                                    {companies.map(company => (
                                        <option key={company.companyID} value={company.companyID}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date From */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date From
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            {/* Date To */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date To
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) => handleInputChange('dateTo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            {/* Amount Min */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={filters.amountMin}
                                    onChange={(e) => handleInputChange('amountMin', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            {/* Amount Max */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={filters.amountMax}
                                    onChange={(e) => handleInputChange('amountMax', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={handleClearFilters}
                                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                <XMarkIcon className="h-4 w-4" />
                                Clear Filters
                            </button>
                            <button
                                onClick={handleApplyFilters}
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <FunnelIcon className="h-4 w-4" />
                                )}
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Quick Apply Button for Search */}
                {!isOpen && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleApplyFilters}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <MagnifyingGlassIcon className="h-4 w-4" />
                            )}
                            Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseFilter;
