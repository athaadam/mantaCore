'use client';

import { useEffect, useState } from 'react';
import Alert from '@/components/alert';

export default function NewAccountForm({ onAdd, onUpdate, editingAccount, cancelEdit }) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone_number: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (editingAccount) {
            setForm({
                username: editingAccount.username || '',
                email: editingAccount.email || '',
                phone_number: editingAccount.phone_number || '',
                role: editingAccount.role || '',
                password: '',
                password_confirmation: '',
            });
        } else {
            setForm({
                username: '',
                email: '',
                phone_number: '',
                role: '',
                password: '',
                password_confirmation: '',
            });
        }
        setAlert(null);
    }, [editingAccount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);

        try {
            if (editingAccount) {
                const updated = { ...editingAccount, ...form };
                onUpdate(updated);
                setAlert({ message: 'User updated successfully.', type: 'success' });

                // Reset form
                setForm({
                    username: '',
                    email: '',
                    phone_number: '',
                    role: '',
                    password: '',
                    password_confirmation: '',
                });
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/addUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1]}`,
                    },
                    body: JSON.stringify(form),
                });

                const text = await res.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error('Invalid server response');
                }

                if (!res.ok) {
                    const errors = data?.errors;
                    const errorMessage = errors
                        ? Object.values(errors).flat().join('\n')
                        : data.message || 'Failed to create user';
                    setAlert({ message: errorMessage, type: 'error' });
                    return;
                }
                const newUser = data.user;
                onAdd(newUser);
                console.log('✅ User added:', newUser);
                setAlert({ message: 'User added successfully.', type: 'success' });

                // ✅ Reset form setelah berhasil
                setForm({
                    username: '',
                    email: '',
                    phone_number: '',
                    role: '',
                    password: '',
                    password_confirmation: '',
                });
            }
        } catch (err) {
            console.error('❌ Error:', err.message);
            setAlert({ message: err.message || 'Something went wrong', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-10">
            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="flex-1 px-4 py-2 border rounded"
            />
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="flex-1 px-4 py-2 border rounded"
            />
            <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="flex-1 px-4 py-2 border rounded"
            />
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border rounded"
            >
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
                <option value="management">Management</option>
            </select>
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required={!editingAccount}
                className="flex-1 px-4 py-2 border rounded"
            />
            <input
                name="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                required={!editingAccount}
                className="flex-1 px-4 py-2 border rounded"
            />

            <div className="flex gap-2 items-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                >
                    {loading ? 'Processing...' : editingAccount ? 'Update Account' : 'Add Account'}
                </button>
                {editingAccount && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {alert && (
                <div className="w-full">
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                </div>
            )}
        </form>
    );
}
