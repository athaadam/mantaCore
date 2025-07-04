export default function InventoryActions({ onAdd }) {
  return (
    <button onClick={onAdd} className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition">
      + Add Item
    </button>
  );
}
