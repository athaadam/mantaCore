'use client';

import { useState } from 'react';

export default function NewAccountForm({}) {
    const [form, setForm] = useState({
        username: '',
        role: '',
        password: '',
    });
    const [accounts, setAccounts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAccount = {
            id: Date.now(),
            name: '-', // No full name
            username: form.username,
            role: form.role,
            status: 'Active',
        };

        setAccounts([...accounts, newAccount]);

        // Reset form
        setForm({ username: '', role: '', password: '' });
    };
    return (
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-10">
            <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                <option value="" disabled>Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Cashier">Cashier</option>
                <option value="Inventory Manager">Inventory Manager</option>
            </select>
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
                Add Account
            </button>
        </form>
    )
}