export default function InventoryPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
            <p className="text-gray-600">Manage your inventory and stock levels here.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Total Items</h3>
                        <p className="text-xl font-bold">1500</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Items in Stock</h3>
                        <p className="text-xl font-bold">1200</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Low Stock Alerts</h3>
                        <p className="text-xl font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
                {/* Table component would go here */}
            </div>
        </div>
    );
}