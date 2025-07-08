'use client';

import { useState } from 'react';
import Alert from '../utils/Alert';
import Cookies from 'js-cookie';
import { deleteAccountById } from '@/libs/api/account-management';
import { getToken } from '@/libs/api/auth';

// Import komponen baru
import StatsGrid from '../card/StatsGrid';
import AccountFormSection from '../form/AccountFormSection';
import AccountListSection from '../table/AccountListSection';

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
            <StatsGrid accounts={accounts} />

            {/* Add New Account Section */}
            <AccountFormSection
                editingAccount={editingAccount}
                onAdd={handleAddAccount}
                onUpdate={handleUpdateAccount}
                onCancelEdit={() => setEditingAccount(null)}
            />

            {/* Alerts */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Account List Section */}
            <AccountListSection
                accounts={accounts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onDelete={handleDeleteAccount}
                onEdit={handleEditAccount}
            />
        </div>
    );
}
