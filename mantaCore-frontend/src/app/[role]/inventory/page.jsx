import InventoryClient from "@/components/client/InventoryClient";
import { cookies } from 'next/headers';
import { fetchAllItems } from "@/libs/api/inventory";


export default async function InventoryPage() {
    const token = await cookies().get('auth')?.value;

    let itemsData = [];
    let fetchError = null;

    try {
        itemsData = await fetchAllItems(token);
    } catch (error) {
        fetchError = error;
    }

    if (fetchError) {
        return (
            <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
                <h1 className="text-3xl font-semibold text-red-600 mb-6">
                    Error fetching items
                </h1>
                <p className="text-gray-700">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 px-6 py-8  min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Inventory</h1>
            <InventoryClient
                initialItems={itemsData}
            />
        </div>
    );
}