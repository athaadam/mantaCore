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
    const [disableModal, setDisableModal] = useState(false);
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

    const initiateDisableAccount = (userId) => {
        // Find the account by userID
        const accountToDisable = accounts.find(acc => acc.userID === userId);
        if (accountToDisable) {
            setEditingAccount(accountToDisable);
            setDisableModal(true);
        } else {
            setAlert({ message: 'Cannot find user to disable', type: 'error' });
        }
    };

    const handleDisableAccount = async (id) => {
        try {
            const res = await apiHit(`deleteUser/${id}`, Cookies.get('auth'), 'PUT');

            // Update the account status in the local state using the response data
            const updatedAccounts = accounts.map(acc =>
                acc.userID === id ? res.user : acc
            );

            setAccounts(updatedAccounts);
            if (editingAccount?.userID === id) setEditingAccount(null);

            setAlert({ message: res.message || 'User disabled successfully.', type: 'success' });
        } catch (err) {
            setAlert({ message: err.message || 'Failed to disable user.', type: 'error' });
        }
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setAlert(null);
        // Memastikan elemen ada sebelum melakukan scrollIntoView
        setTimeout(() => {
            const formElement = document.getElementById('account-form-section');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
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
            <div className="fixed bottom-4 right-4 z-50">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>

            {/* Account List Section */}
            <AccountListSection
                accounts={accounts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onDelete={initiateDisableAccount}
                onEdit={handleEditAccount}
            />

            {/* Disable Account Confirmation Modal */}
            <ConfirmationModal
                isOpen={disableModal}
                onClose={() => {
                    setDisableModal(false);
                    setEditingAccount(null);
                }}
                onConfirm={() => {
                    if (editingAccount?.userID) {
                        handleDisableAccount(editingAccount.userID);
                    }
                    setDisableModal(false);
                }}
                message={`Are you sure you want to disable the account for ${editingAccount?.username || 'this user'}? The user will be marked as inactive but will remain in the system.`}
                confirmText="Disable"
                cancelText="Cancel"
                type='danger'
                title='Disable Account Confirmation'
            />
        </div>
    );
}
