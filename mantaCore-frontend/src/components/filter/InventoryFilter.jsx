export default function InventoryFilter({ categories, onChange }) {
  return (
    <select
      className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
}
