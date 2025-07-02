import AccountList from '@/components/account-management/accountlist';
import NewAccountForm from '@/components/account-management/newaccountform';


export default function AccountManagementPage() {

    const accounts = [
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            role: 'Administrator',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Jane Smith',
            username: 'janesmith',
            role: 'Cashier',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            username: 'alicej',
            role: 'Viewer',
            status: 'Inactive',
        },
        {
            id: 4,
            name: 'Bob Williams',
            username: 'bobw',
            role: 'Administrator',
            status: 'Active',
        },
        {
            id: 5,
            name: 'Carol Evans',
            username: 'carole',
            role: 'Cashier',
            status: 'Inactive',
        },
        {
            id: 6,
            name: 'David Brown',
            username: 'davidb',
            role: 'Viewer',
            status: 'Active',
        },
        {
            id: 7,
            name: 'Emily Clark',
            username: 'emilyc',
            role: 'Administrator',
            status: 'Active',
        },
        {
            id: 8,
            name: 'Frank Harris',
            username: 'frankh',
            role: 'Cashier',
            status: 'Inactive',
        },
        {
            id: 9,
            name: 'Grace Lee',
            username: 'gracel',
            role: 'Viewer',
            status: 'Active',
        },
        {
            id: 10,
            name: 'Henry King',
            username: 'henryk',
            role: 'Administrator',
            status: 'Inactive',
        },
        {
            id: 11,
            name: 'Ivy Martinez',
            username: 'ivym',
            role: 'Cashier',
            status: 'Active',
        },
        {
            id: 12,
            name: 'Jack Nelson',
            username: 'jackn',
            role: 'Viewer',
            status: 'Active',
        },
        {
            id: 13,
            name: 'Karen Ortiz',
            username: 'kareno',
            role: 'Administrator',
            status: 'Active',
        },
    ];


    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Account Management
            </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add New Account
            </h2>

            {/* Form tanpa card */}
            <NewAccountForm />

            {/* Tabel akun */}
            <div className="mt-6">
                <AccountList
                    accounts={accounts}
                    itemsPerPage={5}
                />
                
            </div>
        </div>
    );
}
