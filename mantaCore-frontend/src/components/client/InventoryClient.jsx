'use client';

import { useState } from 'react';
import InventoryFilter from '../filter/InventoryFilter';
import InventoryActions from '../action/InventoryAction';
import InventoryTable from '../table/InventoryTable';
import InventoryModal from '../modal/InventoryModal';
import { createItem, updateItem, deleteItemById } from '@/libs/api/inventory';
import Alert from '../utils/Alert';
import { getToken } from '@/libs/api/auth';
import { extractErrorMessage } from '@/libs/exceptions';

export default function InventoryClient({ initialItems }) {
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

    const handleFilter = (category) => {
        if (category === 'all') {
            setItems(originalItems);
        } else {
            const filtered = originalItems.filter(item => item.category === category);
            setItems(filtered);
        }
    };

    const handleSubmitItem = async (e) => {
        e.preventDefault();
        const token = await getToken();

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
                const createdItem = await createItem(itemPayload, token);
                const updated = [...originalItems, createdItem];
                setOriginalItems(updated);
                setItems(updated);
                setAlert({ message: 'Item added successfully', type: 'success' });
            } else if (modalMode === 'edit') {
                const updatedItem = await updateItem(selectedItemIndex, itemPayload, token);
                const updated = originalItems.map(item =>
                    item.itemID === selectedItemIndex ? updatedItem : item
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


    const handleDelete = async (index) => {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            const token = await getToken();
            const itemId = items[index].itemID;

            await deleteItemById(itemId, token);

            // Jika berhasil, hapus dari state lokal
            const updated = [...items];
            updated.splice(index, 1);
            setItems(updated);
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
        <>
            <div className="flex items-center justify-between mb-6">
                <InventoryFilter categories={itemCategories} onChange={handleFilter} />
                <InventoryActions onAdd={() => setShowModal(true)} />
            </div>
            {alert && (
                <div className="mb-4">
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <InventoryTable
                items={items}
                onDelete={handleDelete}
                onEdit={handleEditItem}
                itemsPerPage={5}
            />
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
        </>
    );
}
