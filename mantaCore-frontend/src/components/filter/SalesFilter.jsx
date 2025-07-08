'use client';

import { useState } from 'react';

const SalesFilter = ({ data, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        start: data?.dateRange?.start || '',
        end: data?.dateRange?.end || ''
    });

    const handleDateChange = (field, value) => {
        const newRange = { ...dateRange, [field]: value };
        setDateRange(newRange);
        if (onFilterChange) {
            onFilterChange(newRange);
        }
    };

    return (
        <div className="flex justify-end">
            <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl px-6 py-4 border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] max-w-md">
                <div className="flex items-center gap-4">
                    {/* Date Range Inputs */}
                    <div className="flex items-center gap-3">
                        <div className="text-center">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                className="px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white text-slate-800 text-sm w-32"
                                value={dateRange.start}
                                onChange={e => handleDateChange('start', e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                className="px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white text-slate-800 text-sm w-32"
                                value={dateRange.end}
                                onChange={e => handleDateChange('end', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SalesFilter;