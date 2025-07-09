'use client';

import React, { useState, useEffect } from 'react';

const InvoiceModal = ({ isOpen, onClose, invoice, onSave, mode = 'add' }) => {
    const [formData, setFormData] = useState({
        invoice_number: '',
        customer_name: '',
        customer_email: '',
        total_amount: '',
        status: 'draft',
        issue_date: '',
        due_date: '',
        currency: 'USD',
        description: '',
        items: [{ description: '', quantity: 1, unit_price: 0, total: 0 }]
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Initialize form data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && invoice) {
                setFormData({
                    invoice_number: invoice.invoice_number || '',
                    customer_name: invoice.customer?.username || '',
                    customer_email: invoice.customer?.email || '',
                    total_amount: invoice.total_amount?.toString() || '',
                    status: invoice.status || 'draft',
                    issue_date: invoice.issue_date ? new Date(invoice.issue_date).toISOString().split('T')[0] : '',
                    due_date: invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : '',
                    currency: invoice.currency || 'USD',
                    description: invoice.description || '',
                    items: invoice.items || [{ description: '', quantity: 1, unit_price: 0, total: 0 }]
                });
            } else {
                // Reset form for add mode
                const today = new Date().toISOString().split('T')[0];
                const nextMonth = new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                const dueDate = nextMonth.toISOString().split('T')[0];
                
                setFormData({
                    invoice_number: generateInvoiceNumber(),
                    customer_name: '',
                    customer_email: '',
                    total_amount: '',
                    status: 'draft',
                    issue_date: today,
                    due_date: dueDate,
                    currency: 'USD',
                    description: '',
                    items: [{ description: '', quantity: 1, unit_price: 0, total: 0 }]
                });
            }
            setErrors({});
        }
    }, [isOpen, mode, invoice]);

    // Generate invoice number
    const generateInvoiceNumber = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${year}-${randomNum}`;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle item changes
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        
        // Calculate total for the item
        if (field === 'quantity' || field === 'unit_price') {
            newItems[index].total = newItems[index].quantity * newItems[index].unit_price;
        }
        
        setFormData(prev => ({
            ...prev,
            items: newItems,
            total_amount: newItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)
        }));
    };

    // Add new item
    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, unit_price: 0, total: 0 }]
        }));
    };

    // Remove item
    const removeItem = (index) => {
        if (formData.items.length > 1) {
            const newItems = formData.items.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                items: newItems,
                total_amount: newItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.invoice_number.trim()) {
            newErrors.invoice_number = 'Invoice number is required';
        }
        
        if (!formData.customer_name.trim()) {
            newErrors.customer_name = 'Customer name is required';
        }
        
        if (!formData.customer_email.trim()) {
            newErrors.customer_email = 'Customer email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
            newErrors.customer_email = 'Please enter a valid email address';
        }
        
        if (!formData.total_amount || parseFloat(formData.total_amount) <= 0) {
            newErrors.total_amount = 'Total amount must be greater than 0';
        }
        
        if (!formData.issue_date) {
            newErrors.issue_date = 'Issue date is required';
        }
        
        if (!formData.due_date) {
            newErrors.due_date = 'Due date is required';
        }
        
        // Validate items
        formData.items.forEach((item, index) => {
            if (!item.description.trim()) {
                newErrors[`item_${index}_description`] = 'Item description is required';
            }
            if (item.quantity <= 0) {
                newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
            }
            if (item.unit_price <= 0) {
                newErrors[`item_${index}_unit_price`] = 'Unit price must be greater than 0';
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            const invoiceData = {
                ...formData,
                total_amount: parseFloat(formData.total_amount),
                issue_date: new Date(formData.issue_date).toISOString(),
                due_date: new Date(formData.due_date).toISOString(),
                customer: {
                    username: formData.customer_name,
                    email: formData.customer_email
                }
            };
            
            if (mode === 'edit') {
                invoiceData.invoiceID = invoice.invoiceID;
            }
            
            await onSave(invoiceData, mode);
            onClose();
        } catch (error) {
            console.error('Error saving invoice:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle modal close
    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
            
            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {mode === 'edit' ? 'Edit Invoice' : 'Create New Invoice'}
                                    </h2>
                                    <p className="text-purple-100 text-sm">
                                        {mode === 'edit' ? 'Update invoice information' : 'Add a new invoice to your system'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                disabled={loading}
                                className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200 disabled:opacity-50"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Invoice Number */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Invoice Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="invoice_number"
                                        value={formData.invoice_number}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.invoice_number ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="INV-2025-001"
                                    />
                                    {errors.invoice_number && (
                                        <p className="mt-1 text-sm text-red-600">{errors.invoice_number}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Status *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="overdue">Overdue</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Customer Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Customer Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        value={formData.customer_name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.customer_name ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.customer_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
                                    )}
                                </div>

                                {/* Customer Email */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Customer Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="customer_email"
                                        value={formData.customer_email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.customer_email ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.customer_email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>
                                    )}
                                </div>

                                {/* Issue Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Issue Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="issue_date"
                                        value={formData.issue_date}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.issue_date ? 'border-red-500' : 'border-slate-300'}`}
                                    />
                                    {errors.issue_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.issue_date}</p>
                                    )}
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Due Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={formData.due_date}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.due_date ? 'border-red-500' : 'border-slate-300'}`}
                                    />
                                    {errors.due_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Items Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Item
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.items.map((item, index) => (
                                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium text-slate-700">Item {index + 1}</h4>
                                                {formData.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-600 hover:text-red-700 p-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                                        Description *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`item_${index}_description`] ? 'border-red-500' : 'border-slate-300'}`}
                                                        placeholder="Item description"
                                                    />
                                                    {errors[`item_${index}_description`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_description`]}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                                        Quantity *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-slate-300'}`}
                                                        min="1"
                                                    />
                                                    {errors[`item_${index}_quantity`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_quantity`]}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                                        Unit Price *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.unit_price}
                                                        onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`item_${index}_unit_price`] ? 'border-red-500' : 'border-slate-300'}`}
                                                        min="0"
                                                    />
                                                    {errors[`item_${index}_unit_price`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_unit_price`]}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-3 text-right">
                                                <span className="text-sm text-slate-600">
                                                    Total: <span className="font-semibold">${item.total.toFixed(2)}</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Amount */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-slate-700">Total Amount:</span>
                                    <span className="text-2xl font-bold text-purple-600">
                                        ${parseFloat(formData.total_amount || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Additional notes or description..."
                                />
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {loading ? 'Saving...' : (mode === 'edit' ? 'Update Invoice' : 'Create Invoice')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
