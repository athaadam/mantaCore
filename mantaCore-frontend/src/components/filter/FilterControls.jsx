'use client';

export default function FilterControls({
  filter,
  setFilter,
  onApply,
  onExport,
  onClear,
  showSuitor = true,
  showAuthor = false,
  showCategory = true,
  showStatus = true,
  customers = [],
  authors = [],
  categories = [],
  statuses = [],
  resultCount = null,
  totalCount = null,
}) {

  // Check if any filters are active
  const hasActiveFilters = Object.values(filter).some(value => value && value !== '');
  
  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl">
      {/* Results Info */}
      {resultCount !== null && totalCount !== null && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              {hasActiveFilters ? (
                <>Showing <span className="font-semibold">{resultCount}</span> of <span className="font-semibold">{totalCount}</span> results</>
              ) : (
                <>Total <span className="font-semibold">{totalCount}</span> records</>
              )}
            </div>
            {hasActiveFilters && (
              <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Filtered
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 items-end">
        {/* Date From */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">From Date</label>
          <input
            type="date"
            value={filter.dateRange?.start || filter.from || ''}
            onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">To Date</label>
          <input
            type="date"
            value={filter.dateRange?.end || filter.to || ''}
            onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm"
          />
        </div>

        {/* Category Filter */}
        {showCategory && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={filter.category || ''}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Suitor Filter */}
        {showSuitor && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Suitor</label>
            <select
              value={filter.suitor || ''}
              onChange={(e) => setFilter({ ...filter, suitor: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Suitors</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Author Filter */}
        {showAuthor && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Author</label>
            <select
              value={filter.author || ''}
              onChange={(e) => setFilter({ ...filter, author: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Authors</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
        )}

        {showStatus && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={filter.status || ''}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm min-w-[140px]"
            >
              <option value="">All Status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={onApply}
            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 h-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Apply Filters
          </button>

          {onClear && (
            <button
              onClick={onClear}
              className="group relative px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 h-12"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}

          <button
            onClick={onExport}
            className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 h-12"
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
