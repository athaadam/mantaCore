'use client';

import React, { useState } from 'react';

const InvoiceFilter = ({ onFilterChange, totalInvoices = 0, filteredCount = 0 }) => {
    const [filters, setFilters] = useState({
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customer: '',
        invoiceNumber: '',
        startDate: '',
        endDate: ''
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            dateRange: '',
            minAmount: '',
            maxAmount: '',
            customer: '',
            invoiceNumber: '',
            startDate: '',
            endDate: ''
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    // Count active filters
    const activeFiltersCount = Object.values(filters).filter(value => value !== '' && value !== null && value !== undefined).length;

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-purple-800">Filter Invoices</h3>
                        {activeFiltersCount > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {activeFiltersCount} active
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-600">
                        {filteredCount !== totalInvoices 
                            ? `${filteredCount} of ${totalInvoices} invoices` 
                            : `${totalInvoices} total invoices`
                        }
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Invoice Number Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Invoice Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Invoice ID or #"
                            value={filters.invoiceNumber}
                            onChange={(e) => handleFilterChange('invoiceNumber', e.target.value)}
                            className="w-full px-3 py-2 pl-9 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Date Range Preset Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Date Range</label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                {/* Min Amount Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Min Amount</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="0.00"
                            value={filters.minAmount}
                            onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                            className="w-full px-3 py-2 pl-9 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Max Amount Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Max Amount</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="999999.99"
                            value={filters.maxAmount}
                            onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                            className="w-full px-3 py-2 pl-9 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Customer Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Customer</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search customer..."
                            value={filters.customer}
                            onChange={(e) => handleFilterChange('customer', e.target.value)}
                            className="w-full px-3 py-2 pl-9 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Custom Date Range - Only show when custom date range is selected */}
            {filters.dateRange === 'custom' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Start Date</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">End Date</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            )}

            {/* Filter Actions */}
            <div className="mt-4 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                    {activeFiltersCount > 0 
                        ? `${filteredCount} results found with ${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}`
                        : `Showing all ${totalInvoices} invoices`
                    }
                </div>
                
                {activeFiltersCount > 0 && (
                    <button
                        onClick={handleClearFilters}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 font-medium rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-all duration-200 text-sm border border-purple-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear All Filters ({activeFiltersCount})
                    </button>
                )}
            </div>
        </div>
    );
};

export default InvoiceFilter;
