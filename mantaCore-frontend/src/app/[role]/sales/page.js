export default function SalesPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Sales Dashboard</h1>
            <p className="text-gray-600">Manage your sales and transactions here.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Sales Summary</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Total Sales</h3>
                        <p className="text-xl font-bold">Rp400.000.000</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Today's PnL</h3>
                        <p className="text-xl font-bold">Rp2.000.000</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Lifetime PnL</h3>
                        <p className="text-xl font-bold">Rp2.000.000</p>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                {/* Table component would go here */}
            </div>
        </div>
    )
}