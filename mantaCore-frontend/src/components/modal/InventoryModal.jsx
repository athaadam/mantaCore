  export default function InventoryModal({ isOpen, onClose, onSubmit, item, onChange }) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-700">Add New Item</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                name="name"
                value={item.name}
                onChange={onChange}
                placeholder="Item Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                // required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                name="category"
                value={item.category}
                onChange={onChange}
                placeholder="Category"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                // required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                name="type"
                value={item.type}
                onChange={onChange}
                placeholder="Type"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                // required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  name="stock"
                  value={item.stock}
                  onChange={onChange}
                  placeholder="Stock"
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  // required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  name="units"
                  value={item.units}
                  onChange={onChange}
                  placeholder="Unit"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  // required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                name="itemPrice"
                value={item.itemPrice}
                onChange={onChange}
                placeholder="Price"
                type="number"
                min="0"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                // required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
