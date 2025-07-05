'use client';

import { useEffect, useState } from 'react';
import Alert from '@/components/utils/Alert';
import { createAccount } from '@/libs/api/account-management';
import { updateAccount } from '@/libs/api/account-management';

const initialFormState = {
    username: '',
    email: '',
    phone_number: '',
    role: '',
    password: '',
    password_confirmation: '',
};

export default function NewAccountForm({ onAdd, onUpdate, editingAccount, cancelEdit }) {
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const resetForm = () => setForm(initialFormState);

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
            const token = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];
            if (editingAccount) {
                const updatePayload = { ...form };
                if (!updatePayload.password) {
                    delete updatePayload.password;
                    delete updatePayload.password_confirmation;
                }
                const updated = await updateAccount(editingAccount.userID, updatePayload, token);
                onUpdate(updated);
            } else {
                const newUser = await createAccount(form, token);
                onAdd(newUser);
            }
            resetForm();
        } catch (err) {
            let message = 'Something went wrong';
            if (typeof err.message === 'string') {
                const lines = err.message.split('\n');
                message = lines.find(line => line.trim().length > 0) || message;
            }
            setAlert({ type: 'error', message: `${message}` })
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
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border rounded"
            >
                <option value="" disabled>Select Role</option>
                <option value="cashier">Cashier</option>
                <option value="management">Management</option>
            </select>

            <div className="flex gap-2 items-center">
                <button
                    type="submit"
                    disabled={loading || (editingAccount?.role === 'admin')}
                    className={`px-6 py-2 rounded text-white 
        ${editingAccount?.role === 'admin'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                    {editingAccount?.role === 'admin'
                        ? 'Admin Locked'
                        : loading
                            ? 'Processing...'
                            : editingAccount
                                ? 'Update Account'
                                : 'Add Account'}
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
