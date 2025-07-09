'use client';

import SectionWrapper from './SectionWrapper';
import EditingBadge from '../common/EditingBadge';
import NewAccountForm from '../form/NewAccountForm';

export default function AccountFormSection({
    editingAccount,
    onAdd,
    onUpdate,
    onCancelEdit
}) {
    const title = editingAccount ? 'Edit Account' : 'Add New Account';
    const description = editingAccount
        ? 'Update account information and permissions'
        : 'Create a new user account with appropriate role and permissions';

    const icon = "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z";

    const badge = editingAccount ? <EditingBadge /> : null;

    return (
        <SectionWrapper
            title={title}
            description={description}
            icon={icon}
            badge={badge}
            headerGradient="from-violet-50 to-purple-50"
            iconGradient="from-violet-600 to-purple-600"
        >
            <NewAccountForm
                onAdd={onAdd}
                onUpdate={onUpdate}
                editingAccount={editingAccount}
                cancelEdit={onCancelEdit}
            />
        </SectionWrapper>
    );
}
