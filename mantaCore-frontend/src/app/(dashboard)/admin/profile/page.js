export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Profile Dashboard</h1>
            <p className="text-gray-600">View and manage your profile information here.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                {/* Profile information form or display component would go here */}
            </div>
        </div>
    );
}