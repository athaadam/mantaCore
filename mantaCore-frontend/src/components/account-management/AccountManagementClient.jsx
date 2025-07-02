'use client';

import { useState } from 'react';
import NewAccountForm from './NewAccountForm';
import AccountList from './AccountList';
import Alert from '../global/Alert';
import Cookies from 'js-cookie';
import { deleteAccountById } from '@/libs/api/account-management';

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
            const token = Cookies.get('auth');
            await deleteAccountById(id, token);
            setAccounts(prev => prev.filter(acc => acc.userID !== id));
            if (editingAccount?.userID === id) setEditingAccount(null);
            // ✅ Hapus dari array
            const updatedAccounts = accounts.filter(acc => acc.userID !== id);
            setAccounts(updatedAccounts);

            // ✅ Hitung ulang total page
            const newTotalPages = Math.ceil(updatedAccounts.length / itemsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages || 1);
            }
            setAlert({ message: 'User deleted successfully.', type: 'success' });
        } catch (err) {
            console.error('❌ Failed to delete user:', err.message);
            setAlert({ message: err.message, type: 'error' });
        }
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setAlert(null);
    };

    return (
        <>
            <NewAccountForm
                onAdd={handleAddAccount}
                onUpdate={handleUpdateAccount}
                editingAccount={editingAccount}
                cancelEdit={() => setEditingAccount(null)}
            />
            <div className="mt-6">
                {alert && (
                    <div className="mb-4">
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                        />
                    </div>
                )}
                <AccountList
                    accounts={accounts}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onDelete={handleDeleteAccount}
                    onEdit={handleEditAccount}
                />
            </div>
        </>
    );
}
