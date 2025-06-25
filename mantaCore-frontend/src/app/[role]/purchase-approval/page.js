export default function PurchaseApprovalPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Purchase Approval Dashboard</h1>
            <p className="text-gray-600">Manage and approve purchase requests here.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Pending Purchase Requests</h2>
                {/* Table component for pending requests would go here */}
            </div>
        </div>
    );
}