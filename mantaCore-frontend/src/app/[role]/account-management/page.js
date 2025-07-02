import { cookies } from 'next/headers';
import AccountManagementClient from '@/components/account-management/AccountManagementClient';

export default async function AccountManagementPage() {
    // Ambil token dari cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    if (!token) {
        return <div className="text-center mt-10 text-red-500">Unauthorized</div>;
    }

    // Fetch data dari Laravel API dengan Authorization header
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/getAllUsers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text(); // ← penting: baca isi error response
        console.error('❌ Failed to fetch users');
        console.error('Status:', res.status, res.statusText);
        console.error('Response body:', errorText);

        return <div className="text-center mt-10 text-red-500">Failed to load user data</div>;
    }


    console.log(res.message);

    const accounts = await res.json();
    console.log(accounts);

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
}
