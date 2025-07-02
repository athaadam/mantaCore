'use client';

import { useState } from 'react';
import NewAccountForm from './newaccountform';
import AccountList from './accountlist';
import Alert from '../alert';

export default function AccountManagementClient({ initialData }) {
    const [accounts, setAccounts] = useState(initialData || []);
    const [editingAccount, setEditingAccount] = useState(null);
    const [alert, setAlert] = useState(null);

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
        const confirmDelete = confirm('Are you sure you want to delete this account?');
        if (!confirmDelete) return;

        const userToDelete = accounts.find(acc => acc.userID === id);
        console.log('🗑️ Deleting user:', userToDelete); // ✅ Log user yang akan dihapus

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1]}`,
                    'Accept': 'application/json',
                },
            });

            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error('Invalid response from server');
            }

            if (!res.ok) {
                const errorMsg = data?.message || 'Failed to delete user';
                setAlert({ message: errorMsg, type: 'error' });
                return;
            }

            setAccounts(prev => prev.filter(acc => acc.userID !== id));
            if (editingAccount?.userID === id) setEditingAccount(null);

            setAlert({ message: 'User deleted successfully.', type: 'success' });

        } catch (err) {
            console.error('❌ Failed to delete user:', err.message);
            setAlert({ message: err.message || 'Delete failed', type: 'error' });
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
                    itemsPerPage={5}
                    onDelete={handleDeleteAccount}
                    onEdit={handleEditAccount}
                />
            </div>
        </>
    );
}
