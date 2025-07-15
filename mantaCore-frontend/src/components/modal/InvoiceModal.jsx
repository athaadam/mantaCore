'use client';

import React, { useState, useEffect } from 'react';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';

const InvoiceModal = ({ isOpen, onClose, invoice, onSave, mode = 'add', customers = [], items = [] }) => {
    // Process items to ensure consistent ID format and filter for sales items only
    const processedItems = React.useMemo(() => {
        // More flexible matching: check if type is 'sales' in any case, or if it's 'Sales' or doesn't exist
        const filteredItems = items.filter(item => {
            // If type doesn't exist or is empty, include the item
            if (!item.type) return true;
            
            // Check for 'sales' in any case format
            const itemType = item.type.toLowerCase();
            return itemType === 'sales' || itemType === '';
        });
        
        // If we filtered out everything, just show all items
        const itemsToUse = filteredItems.length > 0 ? filteredItems : items;
        
        return itemsToUse.map(item => ({
            ...item,
            itemID: String(item.itemID) // Convert all IDs to strings for consistent comparison
        }));
    }, [items]);

    const [formData, setFormData] = useState({
        costumerID: '',
        date: '',
        amount: 0,
        items: [{ itemID: '', quantity: 1, unitPrice: 0, subTotal: 0, type: '' }]
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Initialize form data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && invoice) {
                // For edit mode
                setFormData({
                    costumerID: invoice.costumerID || '',
                    date: invoice.date ? new Date(invoice.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    amount: invoice.amount || 0,
                    items: invoice.items?.map(item => {
                        // Find matching item to get correct itemPrice
                        const itemIdStr = String(item.itemID);
                        const matchedItem = processedItems.find(i => i.itemID === itemIdStr);
                        
                        return {
                            itemID: itemIdStr,
                            quantity: item.quantity || 1,
                            unitPrice: matchedItem?.itemPrice || item.itemPrice || 0,
                            subTotal: (matchedItem?.itemPrice || item.itemPrice || 0) * (item.quantity || 1),
                            type: 'sales' // Always use sales type
                        };
                    }) || [{ itemID: '', quantity: 1, unitPrice: 0, subTotal: 0, type: 'sales' }]
                });
                
                // Set selected items for edit
                if (invoice.items && invoice.items.length > 0) {
                    const selectedItemsList = invoice.items.map(invoiceItem => {
                        // Convert both IDs to strings for comparison
                        const invoiceItemIdStr = String(invoiceItem.itemID);
                        const matchedItem = processedItems.find(i => i.itemID === invoiceItemIdStr);
                        return matchedItem || null;
                    }).filter(Boolean);
                    
                    setSelectedItems(selectedItemsList);
                }
            } else {
                // Reset form for add mode
                const today = new Date().toISOString().split('T')[0];
                
                setFormData({
                    costumerID: '',
                    date: today,
                    amount: 0,
                    items: [{ itemID: '', quantity: 1, unitPrice: 0, subTotal: 0, type: 'sales' }]
                });
                
                setSelectedItems([]);
            }
            setErrors({});
        }
    }, [isOpen, mode, invoice, items]);

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

    // Handle item selection
    const handleItemSelection = (index, itemID) => {
        // All IDs are converted to strings for consistent comparison
        const itemIdString = String(itemID);
        
        // Find item using string comparison
        const selectedItem = processedItems.find(item => item.itemID === itemIdString);
        
        if (selectedItem) {            
            // According to ItemController.php, the field for price is 'itemPrice'
            const itemPrice = selectedItem.itemPrice || 0;
            
            const newItems = [...formData.items];
            
            newItems[index] = {
                ...newItems[index],
                itemID: selectedItem.itemID, // Already a string
                unitPrice: itemPrice,
                subTotal: itemPrice * newItems[index].quantity
            };
            
            // Update selected items array for UI
            const newSelectedItems = [...selectedItems];
            newSelectedItems[index] = selectedItem;
            setSelectedItems(newSelectedItems);
            
            // Update form data
            setFormData(prev => ({
                ...prev,
                items: newItems,
                amount: calculateTotalAmount(newItems)
            }));
        } else {
            console.error("No item found with ID:", itemID);
        }
    };

    // Handle item changes
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        
        if (field === 'quantity') {
            value = Math.max(1, parseInt(value) || 0); // Ensure quantity is at least 1
        } else if (field === 'unitPrice') {
            value = parseFloat(value) || 0;
        }
        
        newItems[index][field] = value;
        
        // Calculate subtotal for the item
        if (field === 'quantity' || field === 'unitPrice') {
            newItems[index].subTotal = newItems[index].quantity * newItems[index].unitPrice;
        }
        
        // Update form data
        setFormData(prev => ({
            ...prev,
            items: newItems,
            amount: calculateTotalAmount(newItems)
        }));
    };

    // Calculate total amount
    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + (item.subTotal || 0), 0);
    };

    // Add new item
    const addItem = () => {
        const newItems = [
            ...formData.items, 
            { itemID: '', quantity: 1, unitPrice: 0, subTotal: 0, type: 'sales' }
        ];
        
        setFormData(prev => ({
            ...prev,
            items: newItems
        }));
        
        setSelectedItems(prev => [...prev, null]);
    };

    // Remove item
    const removeItem = (index) => {
        if (formData.items.length > 1) {
            const newItems = formData.items.filter((_, i) => i !== index);
            const newSelectedItems = selectedItems.filter((_, i) => i !== index);
            
            setFormData(prev => ({
                ...prev,
                items: newItems,
                amount: calculateTotalAmount(newItems)
            }));
            
            setSelectedItems(newSelectedItems);
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.costumerID) {
            newErrors.costumerID = 'Customer is required';
        }
        
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        
        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = 'Total amount must be greater than 0';
        }
        
        // Validate items
        formData.items.forEach((item, index) => {
            if (!item.itemID) {
                newErrors[`item_${index}_itemID`] = 'Item selection is required';
            }
            if (!item.quantity || item.quantity <= 0) {
                newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
            }
            if (!item.unitPrice || item.unitPrice <= 0) {
                newErrors[`item_${index}_unitPrice`] = 'Unit price must be greater than 0';
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
            // Format the data for the API
            const invoiceData = {
                costumerID: formData.costumerID,
                date: formData.date,
                amount: formData.amount,
                items: formData.items.map(item => ({
                    itemID: item.itemID,
                    quantity: parseInt(item.quantity),
                    unitPrice: parseFloat(item.unitPrice),
                    subTotal: parseFloat(item.subTotal),
                    type: item.type || null
                }))
            };
            
            if (mode === 'edit' && invoice) {
                invoiceData.invoiceID = invoice.invoiceID;
            }
            
            await onSave(invoiceData, mode);
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
                                {/* Customer Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Customer *
                                    </label>
                                    <select
                                        name="costumerID"
                                        value={formData.costumerID}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.costumerID ? 'border-red-500' : 'border-slate-300'}`}
                                    >
                                        <option value="">Select a customer</option>
                                        {customers.map(customer => (
                                            <option key={customer.costumerID} value={customer.costumerID}>
                                                {customer.username} - {customer.email}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.costumerID && (
                                        <p className="mt-1 text-sm text-red-600">{errors.costumerID}</p>
                                    )}
                                </div>

                                {/* Invoice Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Invoice Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.date ? 'border-red-500' : 'border-slate-300'}`}
                                    />
                                    {errors.date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.date}</p>
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
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                                        Product *
                                                    </label>
                                                    <select
                                                        value={item.itemID !== undefined && item.itemID !== null ? String(item.itemID) : ''}
                                                        onChange={(e) => {
                                                            // Select values are always strings
                                                            const selectedValue = e.target.value;
                                                            
                                                            if (selectedValue === '') {
                                                                // Handle the "Select a product" option (empty value)
                                                                handleItemChange(index, 'itemID', '');
                                                            } else {
                                                                // Process normal selection with string ID
                                                                handleItemSelection(index, selectedValue);
                                                            }
                                                        }}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`item_${index}_itemID`] ? 'border-red-500' : 'border-slate-300'}`}
                                                    >
                                                        <option value="">Select a product</option>
                                                        {processedItems.map(product => (
                                                            <option key={product.itemID} value={product.itemID}>
                                                                {product.name} - {formatRupiah(product.itemPrice || 0)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[`item_${index}_itemID`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_itemID`]}</p>
                                                    )}
                                                    
                                                    {selectedItems[index] && (
                                                        <div className="mt-1 text-xs text-slate-500">
                                                            Available stock: {selectedItems[index].stock}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                                        Quantity *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-slate-300'}`}
                                                        min="1"
                                                    />
                                                    {errors[`item_${index}_quantity`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_quantity`]}</p>
                                                    )}
                                                </div>
                                                
                                                {/* Type field removed since we're already filtering for sales items */}
                                            </div>
                                            
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-sm text-slate-600">
                                                    <span className="font-medium">Unit Price:</span> {formatRupiah(item.unitPrice)}
                                                </div>
                                                <div className="text-sm font-semibold text-purple-700">
                                                    <span className="font-medium">Subtotal:</span> {formatRupiah(item.subTotal)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Amount */}
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-slate-700">Total Amount:</span>
                                    <span className="text-2xl font-bold text-purple-600">
                                        {formatRupiah(formData.amount)}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="border-t border-slate-200 mt-6 pt-4 flex justify-end gap-3">
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
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;

