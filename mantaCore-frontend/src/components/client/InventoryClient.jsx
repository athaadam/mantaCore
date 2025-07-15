'use client';

import { useState, useMemo } from 'react';
import InventoryFilter from '../filter/InventoryFilter';
import InventoryTable from '../table/InventoryTable';
import InventoryModal from '../modal/InventoryModal';
import Alert from '../common/Alert';
import { extractErrorMessage } from '@/libs/exceptions';
import Header2 from '@/components/header/Header2';
import DataCard from '@/components/card/DataCard';
import Cookies from 'js-cookie';
import { apiHit } from '@/libs/api/fetch';
import ConfirmationModal from '../modal/ConfirmationModal';

export default function InventoryClient({ initialItems, profile }) {
    const [alert, setAlert] = useState(null);
    const [originalItems, setOriginalItems] = useState(initialItems);
    const [items, setItems] = useState(initialItems);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        type: '',
        stock: '',
        units: '',
        itemPrice: '',
    });
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentCategory, setCurrentCategory] = useState('all');

    // Filter items based on both category and search term
    const filteredItems = useMemo(() => {
        let result = originalItems;
        
        // Apply category filter
        if (currentCategory !== 'all') {
            result = result.filter(item => item.category === currentCategory);
        }
        
        // Apply search filter
        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(item => 
                (item.name && item.name.toLowerCase().includes(searchLower)) ||
                (item.type && item.type.toLowerCase().includes(searchLower))
            );
        }
        
        return result;
    }, [originalItems, currentCategory, searchTerm]);
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (category) => {
        setCurrentCategory(category);
    };

    const handleSubmitItem = async (e) => {
        e.preventDefault();
        const token = Cookies.get('auth');
        const itemPayload = {
            name: newItem.name,
            category: newItem.category,
            type: newItem.type,
            stock: parseInt(newItem.stock),
            units: newItem.units,
            itemPrice: parseInt(newItem.itemPrice),
        };

        try {
            if (modalMode === 'add') {
                const createdItem = await apiHit('createItem', token, 'POST', itemPayload);
                const updated = [...originalItems, createdItem.item];
                setOriginalItems(updated);
                setItems(updated);
                setAlert({ message: 'Item added successfully', type: 'success' });
            } else if (modalMode === 'edit') {
                const updatedItem = await apiHit(`updateItem/${selectedItemIndex}`, token, 'POST', itemPayload);
                const updated = originalItems.map(item =>
                    item.itemID === selectedItemIndex ? updatedItem.item : item
                );
                setOriginalItems(updated);
                setItems(updated);
                setAlert({ message: 'Item updated successfully', type: 'success' });
            }
        } catch (error) {
            const message = extractErrorMessage(error);
            setAlert({ type: 'error', message: `${message}` })
        } finally {
            setShowModal(false);
            setNewItem({ name: '', category: '', type: '', stock: '', units: '', itemPrice: '' });
            setModalMode('add');
            setSelectedItemIndex(null);
        }
    };


    const initiateDeleteItem = (index) => {
        const itemToDelete = filteredItems[index];
        setNewItem(itemToDelete);
        setSelectedItemIndex(index);
        setDeleteModal(true);
    };

    const handleDelete = async (index) => {
        try {
            const token = Cookies.get('auth');
            const itemId = filteredItems[index].itemID;
            await apiHit(`deleteItem/${itemId}`, token, 'DELETE');
            const updated = originalItems.filter(item => item.itemID !== itemId);
            setOriginalItems(updated);
            setAlert({ type: 'success', message: 'Item deleted successfully' });
        } catch (err) {
            console.error('❌ Failed to delete item:', err);
            setAlert({ type: 'error', message: 'Failed to delete item' });
        }
    };

    const handleEditItem = (item) => {
        setNewItem(item);
        setSelectedItemIndex(item.itemID);
        setModalMode('edit');
        setShowModal(true);
    };


    const itemCategories = [...new Set(originalItems.map(item => item.category))];

    return (
        <div className="space-y-8">

            {/* Header2 Component for Inventory Actions */}
            <Header2
                title="Stock Operations"
                description="Manage inventory for"
                companyName={profile.company?.companyName || 'N/A'}
                colorScheme="purple"
                icon={
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                }
                onAdd={() => setShowModal(true)}
            />
            {/* Alert Section */}
            {alert && (
                <div className="mb-6">
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            {/* Enhanced Inventory Management Section */}
            <DataCard
                title="Inventory Overview"
                subtitle="Monitor stock levels, track items, and manage inventory operations efficiently"
                icon={
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                }
                gradient="bg-gradient-to-br from-white via-purple-50 to-indigo-100"
            >
                {/* Enhanced Filter Section */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold text-slate-700">Filter by Category:</label>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-white/30 relative">
                            <InventoryFilter categories={itemCategories} onChange={handleFilter} />
                        </div>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                        Total Items: <span className="font-bold text-purple-600">{filteredItems.length}</span>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white/80 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Search by item name or type..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {searchTerm && (
                        <div className="mt-2 flex items-center">
                            <span className="text-sm text-purple-700 font-medium">
                                Found {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                            </span>
                            {filteredItems.length !== (currentCategory === 'all' ? originalItems.length : originalItems.filter(item => item.category === currentCategory).length) && (
                                <button 
                                    className="ml-2 text-xs text-gray-600 hover:text-purple-700 underline"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Inventory Table - Full width, no horizontal scroll */}
                <div className="w-full">
                    <InventoryTable
                        items={filteredItems}
                        onDelete={initiateDeleteItem}
                        onEdit={handleEditItem}
                        itemsPerPage={5}
                    />
                </div>
            </DataCard>

            {/* Inventory Modal */}
            <InventoryModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setModalMode('add');
                    setSelectedItemIndex(null);
                    setNewItem({ name: '', category: '', type: '', stock: '', units: '', itemPrice: '' });
                }}
                onSubmit={handleSubmitItem}
                item={newItem}
                onChange={(e) => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setSelectedItemIndex(null);
                }}
                onConfirm={() => {
                    if (selectedItemIndex !== null) {
                        handleDelete(selectedItemIndex);
                    }
                    setDeleteModal(false);
                }}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the item "${newItem?.name || ''}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
}
