'use client';

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const unitOptions = [
    'pcs', 'kg', 'liter', 'box', 'pack', 'meter', 'gram', 'ml', 'dozen', 'roll'
];

export default function InventoryForm({ item, onChange, onSubmit, onClose }) {
    const handleUnitChange = (value) => {
        onChange({ target: { name: 'units', value } });
    };
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
                    <select
                        id="type"
                        name="type"
                        value={item.type}
                        onChange={onChange}
                        size="1"
                        className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-violet-400"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 12px center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '16px'
                        }}
                        required
                    >
                        <option value="">Select type</option>
                        <option value="sales">Sales</option>
                        <option value="operational">Operational</option>
                    </select>
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
                    <Listbox value={item.units} onChange={handleUnitChange}>
                        <div className="relative">
                            <Listbox.Button className="w-full border border-slate-300 px-4 py-3 rounded-lg bg-white text-left focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200 relative">
                                {item.units || 'Select unit'}
                                <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </Listbox.Button>

                            <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Listbox.Option
                                    key=""
                                    value=""
                                    className={({ active }) =>
                                        `cursor-pointer select-none py-2 px-4 ${active ? 'bg-violet-100 text-violet-900' : 'text-slate-900'
                                        }`
                                    }
                                >
                                    Select unit
                                </Listbox.Option>
                                {unitOptions.map((unit, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        value={unit}
                                        className={({ active }) =>
                                            `cursor-pointer select-none py-2 px-4 ${active ? 'bg-violet-100 text-violet-900' : 'text-slate-900'
                                            }`
                                        }
                                    >
                                        {unit}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
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
