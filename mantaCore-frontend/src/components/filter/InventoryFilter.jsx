export default function InventoryFilter({ categories, onChange }) {
  return (
    <select
      className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm text-slate-800 font-medium min-w-[160px]"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
}
