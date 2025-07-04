import { cookies } from 'next/headers';
import AccountManagementClient from '@/components/client/AccountManagementClient';
import { fetchAllUsers } from '@/libs/api/account-management';

export default async function AccountManagementPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    try {
        const accounts = await fetchAllUsers(token);
        return (
            <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Account Management
                </h1>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Add New Account
                </h2>
                <AccountManagementClient initialData={accounts} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return (
            <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
                <h1 className="text-3xl font-semibold text-red-600 mb-6">
                    Error fetching accounts
                </h1>
                <p className="text-gray-700">Please try again later.</p>
            </div>
        );
    }
}
