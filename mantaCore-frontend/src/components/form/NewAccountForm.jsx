'use client';

import { useEffect, useState } from 'react';
import Alert from '@/components/common/Alert';
import { extractErrorMessage } from '@/libs/exceptions';
import { apiHit } from '@/libs/api/fetch';
import Cookies from 'js-cookie';

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
        setForm((prev) => ({ ...prev, [name]: value, status: 'active' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);

        try {
            if (editingAccount) {
                const updatePayload = { ...form };
                if (!updatePayload.password) {
                    delete updatePayload.password;
                    delete updatePayload.password_confirmation;
                }
                const updated = await apiHit(`updateUser/${editingAccount.userID}`, Cookies.get('auth'), 'POST', updatePayload);
                onUpdate(updated.user);
            } else {
                const newUser = await apiHit('addUser', Cookies.get('auth'), 'POST', form);
                console.log('New user created:', newUser);
                onAdd(newUser.user);
            }
            resetForm();
        } catch (err) {
            const message = extractErrorMessage(err);
            setAlert({ type: 'error', message: `${message}` })
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 placeholder-slate-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 placeholder-slate-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-slate-700">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 placeholder-slate-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm font-medium text-slate-700">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 bg-white"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="cashier">Cashier</option>
                            <option value="management">Management</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
                    Security Settings
                </h3>
                {editingAccount && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-amber-800">Password & Status Update</p>
                                <p className="text-sm text-amber-600">Leave password fields empty to keep current password unchanged and status automatically reactivated.</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                            Password {!editingAccount && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder={editingAccount ? "Enter new password (optional)" : "Enter password"}
                            required={!editingAccount}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 placeholder-slate-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-700">
                            Confirm Password {!editingAccount && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            placeholder={editingAccount ? "Confirm new password (optional)" : "Confirm password"}
                            required={!editingAccount}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 placeholder-slate-400"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                <button
                    type="submit"
                    disabled={loading || (editingAccount?.role === 'admin')}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${editingAccount?.role === 'admin'
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : loading
                            ? 'bg-violet-400 text-white cursor-wait'
                            : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                >
                    {loading && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {!loading && editingAccount && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    )}
                    {!loading && !editingAccount && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    )}
                    {editingAccount?.role === 'admin'
                        ? 'Admin Account Locked'
                        : loading
                            ? 'Processing...'
                            : editingAccount
                                ? 'Update Account'
                                : 'Create Account'}
                </button>

                {editingAccount && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 border border-slate-300"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel Edit
                    </button>
                )}
            </div>

            {/* Alert */}
            {alert && (
                <div className="mt-4">
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                </div>
            )}
        </form>
    );
}
