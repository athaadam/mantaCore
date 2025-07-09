'use client';

import React, { useState } from 'react';

const InvoiceFilter = ({ onFilterChange, totalInvoices = 0, filteredCount = 0 }) => {
    const [filters, setFilters] = useState({
        status: '',
        dateRange: '',
        minAmount: '',
        maxAmount: '',
        customer: ''
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            status: '',
            dateRange: '',
            minAmount: '',
            maxAmount: '',
            customer: ''
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Status</label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Date Range Filter */}
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
                    </select>
                </div>

                {/* Min Amount Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Min Amount</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={filters.minAmount}
                        onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Max Amount Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Max Amount</label>
                    <input
                        type="number"
                        placeholder="999999.99"
                        value={filters.maxAmount}
                        onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Customer Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Customer</label>
                    <input
                        type="text"
                        placeholder="Search customer..."
                        value={filters.customer}
                        onChange={(e) => handleFilterChange('customer', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleClearFilters}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-all duration-200 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear Filters ({activeFiltersCount})
                    </button>
                </div>
            )}
        </div>
    );
};

export default InvoiceFilter;
