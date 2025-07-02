export default function FilterControls({ filter, setFilter, onApply }) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-[#f3f1ff] px-4 py-4 rounded-xl mb-6">
      <div className="flex items-center gap-2">
        <label>From:</label>
        <input
          type="date"
          value={filter.from}
          onChange={(e) => setFilter({ ...filter, from: e.target.value })}
          className="px-2 py-1 rounded border"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>To:</label>
        <input
          type="date"
          value={filter.to}
          onChange={(e) => setFilter({ ...filter, to: e.target.value })}
          className="px-2 py-1 rounded border"
        />
      </div>
      <select
        value={filter.category}
        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        className="px-3 py-1 rounded border"
      >
        <option value="">Category</option>
        <option>Production</option>
        <option>Finance</option>
        <option>Logistics</option>
      </select>
      <select
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        className="px-3 py-1 rounded border"
      >
        <option value="">Status: All</option>
        <option>Approved</option>
        <option>Pending</option>
        <option>Rejected</option>
      </select>
      <button
        onClick={onApply}
        className="bg-[#6A5ACD] text-white px-4 py-1 rounded hover:opacity-90"
      >
        Apply Filter
      </button>
    </div>
  );
}
