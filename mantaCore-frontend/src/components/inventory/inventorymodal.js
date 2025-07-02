  export default function InventoryModal({ isOpen, onClose, onSubmit, item, onChange }) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" value={item.name} onChange={onChange} placeholder="Item Name" className="w-full border px-4 py-2 rounded-lg" required />
            <input name="type" value={item.type} onChange={onChange} placeholder="Type" className="w-full border px-4 py-2 rounded-lg" required />
            <input name="stock" value={item.stock} onChange={onChange} placeholder="Stock" type="number" className="w-full border px-4 py-2 rounded-lg" required />
            <input name="units" value={item.unit} onChange={onChange} placeholder="Unit" className="w-full border px-4 py-2 rounded-lg" required />
            <input name="price" value={item.price} onChange={onChange} placeholder="Price" type="number" className="w-full border px-4 py-2 rounded-lg" required />
            <textarea name="description" value={item.description} onChange={onChange} placeholder="Description" className="w-full border px-4 py-2 rounded-lg" required />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
