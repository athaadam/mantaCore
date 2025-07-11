'use client';

import { useState } from 'react';
import Alert from '../common/Alert';
import Cookies from 'js-cookie';
import StatsGrid from '../card/StatsGrid';
import AccountFormSection from '../section/AccountFormSection';
import AccountListSection from '../section/AccountListSection';
import { apiHit } from '@/libs/api/fetch';
import ConfirmationModal from '../modal/ConfirmationModal';

export default function AccountManagementClient({ initialData }) {
    const [accounts, setAccounts] = useState(initialData || []);
    const [editingAccount, setEditingAccount] = useState(null);
    const [alert, setAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
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

    const initiateDeleteAccount = (userId) => {
        // Find the account by userID
        const accountToDelete = accounts.find(acc => acc.userID === userId);
        if (accountToDelete) {
            setEditingAccount(accountToDelete);
            setDeleteModal(true);
        } else {
            setAlert({ message: 'Cannot find user to delete', type: 'error' });
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            const res = await apiHit(`deleteUser/${id}`, Cookies.get('auth'), 'DELETE');
            const updatedAccounts = accounts.filter(acc => acc.userID !== id);
            setAccounts(updatedAccounts);
            if (editingAccount?.userID === id) setEditingAccount(null);
            
            const newTotalPages = Math.ceil(updatedAccounts.length / itemsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages || 1);
            }
            setAlert({ message: res.message || 'User deleted successfully.', type: 'success' });
        } catch (err) {
            setAlert({ message: err.message || 'Failed to delete user.', type: 'error' });
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
                onDelete={initiateDeleteAccount}
                onEdit={handleEditAccount}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setEditingAccount(null);
                }}
                onConfirm={() => {
                    if (editingAccount?.userID) {
                        handleDeleteAccount(editingAccount.userID);
                    }
                    setDeleteModal(false);
                }}
                message={`Are you sure you want to delete the account for ${editingAccount?.username || 'this user'}?`}
                confirmText="Disable"
                cancelText="Cancel"
                type='danger'
                title='Delete Account Confirmation'
            />
        </div>
    );
}
