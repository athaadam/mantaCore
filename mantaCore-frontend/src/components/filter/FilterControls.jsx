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
    <div className="flex flex-wrap gap-3 bg-[#f3f1ff] px-4 py-4 rounded-xl mb-6 items-center">
      {/* Date From */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">From:</label>
        <input
          type="date"
          value={filter.from}
          onChange={(e) => setFilter({ ...filter, from: e.target.value })}
          className="px-3 py-2 rounded border text-sm text-gray-800"
        />
      </div>

      {/* Date To */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">To:</label>
        <input
          type="date"
          value={filter.to}
          onChange={(e) => setFilter({ ...filter, to: e.target.value })}
          className="px-3 py-2 rounded border text-sm text-gray-800"
        />
      </div>

      {/* Category Filter */}
      {showCategory && (
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="px-3 py-2 rounded border text-sm text-gray-800"
        >
          <option value="">Category</option>
          <option>Production</option>
          <option>Finance</option>
          <option>Logistics</option>
          <option>Logistics</option>
          <option>Logistics</option>
        </select>
      )}

      {/* Suitor Filter */}
      {showSuitor && (
        <select
          value={filter.suitor}
          onChange={(e) => setFilter({ ...filter, suitor: e.target.value })}
          className="px-3 py-2 rounded border text-sm text-gray-800"
        >
          <option value="">Suitor</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
          <option>Andi Setiawan</option>
        </select>
      )}
      {showStatus && (
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-3 py-2 rounded border text-sm text-gray-800"
        >
          <option value="">Status: All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      )}

      {/* Apply Filter Button */}
      <button
        onClick={onApply}
        className="bg-purple-800 hover:bg-purple-900 text-white text-sm font-medium px-4 py-2 rounded"
      >
        Apply Filter
      </button>

      {/* Export Button */}
      <div className="ml-auto">
        <button
          onClick={onExport}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
