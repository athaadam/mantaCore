export default function InventoryFilter({ types, onChange }) {
  return (
    <select
      className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Types</option>
      {types.map((type, index) => (
        <option key={index} value={type}>{type}</option>
      ))}
    </select>
  );
}
