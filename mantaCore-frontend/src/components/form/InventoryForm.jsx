export default function InventoryForm({ item, onChange, onSubmit, onClose }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Item Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={onChange}
                        placeholder="Enter item name"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        value={item.category}
                        onChange={onChange}
                        placeholder="Enter category"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                        Type
                    </label>
                    <input
                        id="type"
                        name="type"
                        value={item.type}
                        onChange={onChange}
                        placeholder="Enter type"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-2">
                        Stock Quantity
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        value={item.stock}
                        onChange={onChange}
                        placeholder="0"
                        type="number"
                        min="0"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="units" className="block text-sm font-medium text-slate-700 mb-2">
                        Unit
                    </label>
                    <input
                        id="units"
                        name="units"
                        value={item.units}
                        onChange={onChange}
                        placeholder="e.g., pcs, kg, liter"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
                
                <div className="sm:col-span-2">
                    <label htmlFor="itemPrice" className="block text-sm font-medium text-slate-700 mb-2">
                        Price (Rp)
                    </label>
                    <input
                        id="itemPrice"
                        name="itemPrice"
                        value={item.itemPrice}
                        onChange={onChange}
                        placeholder="0"
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none placeholder-slate-500"
                        required
                    />
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-200">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200 order-2 sm:order-1"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] order-1 sm:order-2"
                >
                    Save Item
                </button>
            </div>
        </form>
    );
}
