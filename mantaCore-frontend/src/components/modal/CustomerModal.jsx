'use client';

import { useState, useEffect } from 'react';

const CustomerModal = ({ mode = 'add', customer, isOpen, onClose, onSubmit, validationErrors = null }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone_number: ''
    });
    
    // Store backend error messages
    const [backendErrors, setBackendErrors] = useState(null);
    
    // Update backend errors when props change
    useEffect(() => {
        if (validationErrors) {
            setBackendErrors(validationErrors);
        }
    }, [validationErrors]);

    useEffect(() => {
        if (mode === 'edit' && customer) {
            setForm({
                username: customer.username || '',
                email: customer.email || '',
                phone_number: customer.phone_number || ''
            });
        } else {
            setForm({
                username: '',
                email: '', 
                phone_number: ''
            });
        }
        // Clear any backend errors when modal opens/closes or mode changes
        setBackendErrors(null);
    }, [mode, customer, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        
        // Clear backend error for this field when user starts typing
        if (backendErrors && backendErrors[name]) {
            setBackendErrors({
                ...backendErrors,
                [name]: null
            });
        }
    };

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        
        const updatedData = {
            ...customer,
            username: form.username.trim(),
            updated_at: new Date().toISOString(),
            email: form.email.trim(),
            phone_number: form.phone_number.trim()
        };
        
        try {
            onSubmit(updatedData, mode);
        } catch (error) {
            // If onSubmit throws an error with validation messages
            if (error && error.validation) {
                setBackendErrors(error.validation);
                return; // Prevent modal from closing if there are validation errors
            }
        }
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
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Display general backend error if present */}
                        {backendErrors?.general && (
                            <div className="bg-rose-50 border border-rose-300 text-rose-700 p-3 rounded-lg mb-4">
                                <p className="text-sm">{backendErrors.general}</p>
                            </div>
                        )}
                        
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                Customer Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className={`w-full border ${backendErrors?.username ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-200 px-4 py-3 rounded-lg transition-all duration-200 outline-none placeholder-slate-500`}
                                placeholder="Enter customer name"
                                autoFocus
                                required
                            />
                            {backendErrors?.username && (
                                <p className="mt-1 text-xs text-rose-600">{Array.isArray(backendErrors.username) ? backendErrors.username[0] : backendErrors.username}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${backendErrors?.email ? 'text-rose-400' : 'text-slate-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full border ${backendErrors?.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-200 pl-10 px-4 py-3 rounded-lg transition-all duration-200 outline-none placeholder-slate-500`}
                                    placeholder="customer@example.com"
                                />
                            </div>
                            {backendErrors?.email && (
                                <p className="mt-1 text-xs text-rose-600">{Array.isArray(backendErrors.email) ? backendErrors.email[0] : backendErrors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${backendErrors?.phone_number ? 'text-rose-400' : 'text-slate-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <input
                                    id="phone_number"
                                    type="tel"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    className={`w-full border ${backendErrors?.phone_number ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-200 pl-10 px-4 py-3 rounded-lg transition-all duration-200 outline-none placeholder-slate-500`}
                                    placeholder="+1 (123) 456-7890"
                                />
                            </div>
                            {backendErrors?.phone_number && (
                                <p className="mt-1 text-xs text-rose-600">{Array.isArray(backendErrors.phone_number) ? backendErrors.phone_number[0] : backendErrors.phone_number}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {mode === 'edit' ? 'Update Customer' : 'Create Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
