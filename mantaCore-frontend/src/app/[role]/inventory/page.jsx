import InventoryClient from "@/components/inventory/InventoryClient";
import { cookies } from 'next/headers';

export default async function InventoryPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    if (!token) {
        return <div className="text-center mt-10 text-red-500">Unauthorized</div>;
    }

    // Fetch data dari Laravel API dengan Authorization header
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/getAllItems`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text(); // ← penting: baca isi error response
        console.error('❌ Failed to fetch Items');
        console.error('Status:', res.status, res.statusText);
        console.error('Response body:', errorText);

        return <div className="text-center mt-10 text-red-500">Failed to load items data</div>;
    }


    console.log(res.message);

    const itemsData = await res.json();
    console.log(itemsData);

    return (
        <div className="flex-1 px-6 py-8  min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Inventory</h1>
            <InventoryClient
                initialItems={itemsData}
            />
        </div>
    );
}