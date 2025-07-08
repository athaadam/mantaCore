'use client';

export default function FilterControls({
  filter,
  setFilter,
  onApply,
  onExport,
  showSuitor = true,
  showCategory = true,
  showStatus = true,
}) {
  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Date From */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">From Date</label>
          <input
            type="date"
            value={filter.from}
            onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">To Date</label>
          <input
            type="date"
            value={filter.to}
            onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm"
          />
        </div>

        {/* Category Filter */}
        {showCategory && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Categories</option>
              <option>Production</option>
              <option>Finance</option>
              <option>Logistics</option>
            </select>
          </div>
        )}

        {/* Suitor Filter */}
        {showSuitor && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Customer</label>
            <select
              value={filter.suitor}
              onChange={(e) => setFilter({ ...filter, suitor: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Customers</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Andi Setiawan</option>
            </select>
          </div>
        )}

        {showStatus && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={onApply}
            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Apply Filters
          </button>

          <button
            onClick={onExport}
            className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
