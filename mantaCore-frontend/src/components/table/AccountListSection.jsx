'use client';

import SectionWrapper from '../section/SectionWrapper';
import CountBadge from '../common/CountBadge';
import AccountList from '../table/AccountList';

export default function AccountListSection({ 
    accounts, 
    itemsPerPage, 
    currentPage, 
    onPageChange, 
    onDelete, 
    onEdit 
}) {
    const icon = "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z";
    
    const badge = (
        <CountBadge 
            count={accounts.length} 
            singularLabel="Account" 
            pluralLabel="Accounts" 
        />
    );

    return (
        <SectionWrapper
            title="Account Directory"
            description="Manage existing user accounts and permissions"
            icon={icon}
            badge={badge}
            headerGradient="from-slate-50 to-slate-100"
            iconGradient="from-slate-600 to-slate-700"
        >
            <AccountList
                accounts={accounts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </SectionWrapper>
    );
}
