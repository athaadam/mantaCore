'use client';

import { useState } from 'react';
import NewAccountForm from '../form/NewAccountForm';
import AccountList from '../table/AccountList';
import Alert from '../utils/Alert';
import Cookies from 'js-cookie';
import { deleteAccountById } from '@/libs/api/account-management';
import { getToken } from '@/libs/api/auth';

export default function AccountManagementClient({ initialData }) {
    const [accounts, setAccounts] = useState(initialData || []);
    const [editingAccount, setEditingAccount] = useState(null);
    const [alert, setAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    

    const handleAddAccount = (newAccount) => {
        setAccounts(prev => [...prev, newAccount]);
        setAlert({ message: 'User added successfully.', type: 'success' });
    };

    const handleUpdateAccount = (updatedAccount) => {
        setAccounts(prev =>
            prev.map(acc => acc.userID === updatedAccount.userID ? updatedAccount : acc)
        );
        setEditingAccount(null);
        setAlert({ message: 'User updated successfully.', type: 'success' });
    };

    const handleDeleteAccount = async (id) => {
        if (!confirm('Are you sure you want to delete this account?')) return;
        try {
            const token = await getToken();
            await deleteAccountById(id, token);
            setAccounts(prev => prev.filter(acc => acc.userID !== id));
            if (editingAccount?.userID === id) setEditingAccount(null);
            const updatedAccounts = accounts.filter(acc => acc.userID !== id);
            setAccounts(updatedAccounts);

            const newTotalPages = Math.ceil(updatedAccounts.length / itemsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages || 1);
            }
            setAlert({ message: 'User deleted successfully.', type: 'success' });
        } catch (err) {
            setAlert({ message: err.message, type: 'error' });
        }
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setAlert(null);
    };

    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{accounts.length}</p>
                            <p className="text-sm text-slate-600">Total Accounts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {accounts.filter(acc => acc.status === 'active').length}
                            </p>
                            <p className="text-sm text-slate-600">Active Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {accounts.filter(acc => acc.role === 'management').length}
                            </p>
                            <p className="text-sm text-slate-600">Managers</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {accounts.filter(acc => acc.role === 'cashier').length}
                            </p>
                            <p className="text-sm text-slate-600">Cashiers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Account Section */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                {editingAccount ? 'Edit Account' : 'Add New Account'}
                            </h2>
                            <p className="text-sm text-slate-600">
                                {editingAccount ? 'Update account information and permissions' : 'Create a new user account with appropriate role and permissions'}
                            </p>
                        </div>
                        {editingAccount && (
                            <div className="ml-auto">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editing Mode
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6">
                    <NewAccountForm
                        onAdd={handleAddAccount}
                        onUpdate={handleUpdateAccount}
                        editingAccount={editingAccount}
                        cancelEdit={() => setEditingAccount(null)}
                    />
                </div>
            </div>

            {/* Alerts */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Account List Section */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Account Directory</h2>
                                <p className="text-sm text-slate-600">Manage existing user accounts and permissions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                {accounts.length} {accounts.length === 1 ? 'Account' : 'Accounts'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <AccountList
                        accounts={accounts}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onDelete={handleDeleteAccount}
                        onEdit={handleEditAccount}
                    />
                </div>
            </div>
        </div>
    );
}
