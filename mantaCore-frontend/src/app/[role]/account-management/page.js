export default function AccountManagementPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Account Management Dashboard</h1>
            <p className="text-gray-600">Manage user accounts and permissions here.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
                {/* User accounts table component would go here */}
            </div>
        </div>
    );
}