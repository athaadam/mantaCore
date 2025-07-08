'use client';

import { useState, useEffect } from 'react';

const CustomerModal = ({ mode = 'add', customer, isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({ username: '' });

    useEffect(() => {
        if (mode === 'edit' && customer) {
            setForm({
                username: customer.username || '',
            });
        } else {
            setForm({ username: '' });
        }
    }, [mode, customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const updatedData = {
            ...customer,
            username: form.username,
            updated_at: new Date().toISOString(),
        };
        onSubmit(updatedData, mode);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 transform transition-all duration-200 scale-100">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">
                        {mode === 'edit' ? 'Edit Customer' : 'Add New Customer'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 px-4 py-3 rounded-lg transition-all duration-200 outline-none placeholder-slate-500"
                            placeholder="Enter customer username"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {mode === 'edit' ? 'Update Customer' : 'Create Customer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
