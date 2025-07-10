'use client';

import { useState, useEffect } from 'react';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { Banknote } from 'lucide-react';
// Simple SVG icons to replace @heroicons/react/24/outline
const XMarkIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MoneyIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="" />
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const MinusIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
);

const ShoppingCartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
);

const BuildingOfficeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const CalendarDaysIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CurrencyDollarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
);

const DocumentTextIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const PurchaseModal = ({
    isOpen,
    onClose,
    onSubmit,
    purchase = null,
    companies = [],
    items = [],
    loading = false,
    userInfoLoading = false
}) => {
    const [formData, setFormData] = useState({
        companyID: '',
        date: '',
        status: '',
        purchaseItems: []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (purchase) {
            // Edit mode
            setFormData({
                companyID: purchase.companyID || '',
                date: purchase.date ? new Date(purchase.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                status: purchase.status || 'pending',
                purchaseItems: purchase.items?.map(item => ({
                    itemID: item.itemID || item.item?.itemID || '',
                    quantity: parseInt(item.quantity) || 1,
                    itemPrice: parseFloat(item.itemPrice || item.unitPrice || 0),
                    type: item.type || 'purchase'
                })) || []
            });
        } else {
            // Add mode - company ID comes from the user profile
            setFormData({
                // We won't need this in the UI as it's automatically set in the client component
                companyID: companies.companyID || '',
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                purchaseItems: []
            });
        }
        setErrors({});
    }, [purchase, isOpen, companies]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const addPurchaseItem = () => {
        setFormData(prev => ({
            ...prev,
            purchaseItems: [
                ...prev.purchaseItems,
                {
                    itemID: '',
                    quantity: 1,
                    itemPrice: 0,
                    type: 'purchase'
                }
            ]
        }));
    };

    const removePurchaseItem = (index) => {
        setFormData(prev => ({
            ...prev,
            purchaseItems: prev.purchaseItems.filter((_, i) => i !== index)
        }));
    };

    const updatePurchaseItem = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            purchaseItems: prev.purchaseItems.map((item, i) => {
                if (i === index) {
                    const updatedItem = { ...item, [field]: value };

                    // Auto-fill item price when item is selected
                    if (field === 'itemID' && value) {
                        const selectedItem = items.find(item => item.itemID === parseInt(value));
                        if (selectedItem) {
                            updatedItem.itemPrice = selectedItem.itemPrice || selectedItem.price || 0;
                        }
                    }

                    return updatedItem;
                }
                return item;
            })
        }));
    };

    const calculateTotal = () => formData.purchaseItems.reduce(
        (total, item) => total + (item.quantity * (item.itemPrice || 0)), 0
    );

    // const validateForm = () => {
    //     const newErrors = {};

    //     if (!formData.date) {
    //         newErrors.date = 'Date is required';
    //     }
    //     if (formData.purchaseItems.length === 0) {
    //         newErrors.purchaseItems = 'At least one item is required';
    //     }

    //     formData.purchaseItems.forEach((item, index) => {
    //         if (!item.itemID) {
    //             newErrors[`item_${index}`] = 'Item is required';
    //         }
    //         if (!item.quantity || item.quantity <= 0) {
    //             newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
    //         }
    //         if (!item.itemPrice || item.itemPrice <= 0) {
    //             newErrors[`itemPrice_${index}`] = 'Item price must be greater than 0';
    //         }
    //     });

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare data and submit
        onSubmit({
            ...formData,
            companyID: parseInt(formData.companyID),
            amount: calculateTotal(),
            purchaseItems: formData.purchaseItems.map(item => ({
                itemID: parseInt(item.itemID),
                quantity: parseInt(item.quantity),
                itemPrice: parseFloat(item.itemPrice),
                unitPrice: parseFloat(item.itemPrice),
                subTotal: parseFloat(item.quantity) * parseFloat(item.itemPrice),
                type: item.type || 'purchase'
            }))
        });
    };

    const getSelectedItem = (itemID) => {
        return items.find(item => item.itemID === itemID);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-200 transform transition-all duration-200 scale-100 z-10" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {purchase ? 'Edit Purchase Request' : 'New Purchase Request'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {purchase ? 'Update purchase request details' : 'Create a new purchase request'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Company Display (Read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <BuildingOfficeIcon className="w-4 h-4 inline mr-1" />
                                Company
                            </label>
                            <div className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-700">
                                {companies && typeof companies === 'object' && (companies.companyName || companies.name) ?
                                    (companies.companyName || companies.name) :
                                    'Your Company'}
                            </div>
                            {/* Hidden input to ensure companyID is included in form data */}
                            <input type="hidden" value={formData.companyID} />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
                                Date *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.date ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <DocumentTextIcon className="w-4 h-4 inline mr-1" />
                                Status
                            </label>
                            <select
                                value={formData.status || 'pending'}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="denied">Denied</option>
                                {/* <option value="processing">Processing</option> */}
                            </select>
                        </div>

                        {/* Total Amount Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Banknote className="w-4 h-4 inline mr-1" />
                                Total Amount
                            </label>
                            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                <span className="text-lg font-semibold text-purple-600">
                                    {formatRupiah(calculateTotal())}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Purchase Items */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-gray-900">Purchase Items</h4>
                            <button
                                type="button"
                                onClick={addPurchaseItem}
                                className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <PlusIcon className="w-4 h-4 mr-1" />
                                Add Item
                            </button>
                        </div>

                        {errors.purchaseItems && (
                            <p className="mb-4 text-sm text-red-600">{errors.purchaseItems}</p>
                        )}

                        <div className="space-y-4">
                            {formData.purchaseItems.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {/* Item Selection */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Item *
                                            </label>
                                            <select
                                                value={item.itemID}
                                                onChange={(e) => updatePurchaseItem(index, 'itemID', e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors[`item_${index}`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select an item</option>
                                                {items.map(availableItem => (
                                                    <option key={availableItem.itemID} value={availableItem.itemID}>
                                                        {availableItem.name} - {availableItem.category}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors[`item_${index}`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`item_${index}`]}</p>
                                            )}
                                        </div>

                                        {/* Quantity */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updatePurchaseItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors[`quantity_${index}`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors[`quantity_${index}`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`quantity_${index}`]}</p>
                                            )}
                                        </div>

                                        {/* Item Price */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Item Price *
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={item.itemPrice}
                                                onChange={(e) => updatePurchaseItem(index, 'itemPrice', parseFloat(e.target.value) || 0)}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors[`itemPrice_${index}`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors[`itemPrice_${index}`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`itemPrice_${index}`]}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subtotal and Remove Button */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                        <div className="text-sm text-gray-600">
                                            Subtotal: <span className="font-semibold">{formatRupiah(item.quantity * item.itemPrice)}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removePurchaseItem(index)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {formData.purchaseItems.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingCartIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No items added yet. Click "Add Item" to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || userInfoLoading}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {(loading || userInfoLoading) && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            <span>
                                {userInfoLoading ? 'Loading user info...' :
                                    loading ? 'Processing...' :
                                        purchase ? 'Update Request' : 'Create Request'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PurchaseModal;
