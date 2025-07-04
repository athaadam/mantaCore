'use client';

import { useState } from 'react';
import InventoryFilter from '../filter/InventoryFilter';
import InventoryActions from '../action/InventoryAction';
import InventoryTable from '../table/InventoryTable';
import InventoryModal from '../modal/InventoryModal';

export default function InventoryClient({ initialItems }) {
    const [originalItems, setOriginalItems] = useState(initialItems);
    const [items, setItems] = useState(initialItems);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        type: '',
        stock: '',
        unit: '',
        price: '',
        description: '',
    });

    const handleFilter = (type) => {
        if (type === 'all') {
            setItems(originalItems);
        } else {
            const filtered = originalItems.filter(item => item.type === type);
            setItems(filtered);
        }
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const item = {
            ...newItem,
            stock: parseInt(newItem.stock),
            price: parseInt(newItem.price),
        };
        const updated = [...originalItems, item];
        setOriginalItems(updated);
        setItems(updated);
        setNewItem({ name: '', type: '', stock: '', unit: '', price: '', description: '' });
        setShowModal(false);
    };

    const handleDelete = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
        setOriginalItems(updated);
    };

    const itemTypes = [...new Set(originalItems.map(item => item.type))];

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <InventoryFilter types={itemTypes} onChange={handleFilter} />
                <InventoryActions onAdd={() => setShowModal(true)} />
            </div>
            <InventoryTable
                items={items}
                onDelete={handleDelete}
                itemsPerPage={5}
            />
            <InventoryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddItem}
                item={newItem}
                onChange={(e) => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
            />
        </>
    );
}
