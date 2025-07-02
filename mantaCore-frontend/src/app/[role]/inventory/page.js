import InventoryClient from "@/components/inventory/inventoryclient";

export default function InventoryPage() {

    const itemsData = [
        {
            name: 'Tumbler',
            type: 'Drinkware',
            stock: 100,
            unit: 'pcs',
            price: 20000,
            description: 'High quality tumbler for beverages',
        },
        {
            name: 'Spoon',
            type: 'Cutlery',
            stock: 150,
            unit: 'pcs',
            price: 5000,
            description: 'Stainless steel spoon',
        },
        {
            name: 'Rice',
            type: 'Food',
            stock: 50,
            unit: 'kg',
            price: 15000,
            description: 'Premium quality rice',
        },
        {
            name: 'Carrot',
            type: 'Vegetable',
            stock: 200,
            unit: 'kg',
            price: 8000,
            description: 'Fresh organic carrots',
        },
        {
            name: 'Plate',
            type: 'Tableware',
            stock: 120,
            unit: 'pcs',
            price: 10000,
            description: 'Ceramic dinner plate',
        },
        {
            name: 'Fork',
            type: 'Cutlery',
            stock: 130,
            unit: 'pcs',
            price: 6000,
            description: 'Stainless steel fork',
        },
        {
            name: 'Knife',
            type: 'Cutlery',
            stock: 110,
            unit: 'pcs',
            price: 7000,
            description: 'Sharp kitchen knife',
        },
        {
            name: 'Glass',
            type: 'Drinkware',
            stock: 90,
            unit: 'pcs',
            price: 8000,
            description: 'Clear glass for drinks',
        },
        {
            name: 'Chicken',
            type: 'Meat',
            stock: 60,
            unit: 'kg',
            price: 35000,
            description: 'Fresh chicken meat',
        },
        {
            name: 'Beef',
            type: 'Meat',
            stock: 40,
            unit: 'kg',
            price: 80000,
            description: 'Premium beef cuts',
        },
        {
            name: 'Potato',
            type: 'Vegetable',
            stock: 180,
            unit: 'kg',
            price: 6000,
            description: 'Organic potatoes',
        },
        {
            name: 'Milk',
            type: 'Dairy',
            stock: 70,
            unit: 'ltr',
            price: 12000,
            description: 'Fresh cow milk',
        },
        {
            name: 'Egg',
            type: 'Dairy',
            stock: 200,
            unit: 'pcs',
            price: 2000,
            description: 'Free-range eggs',
        },
        {
            name: 'Salt',
            type: 'Spices',
            stock: 300,
            unit: 'kg',
            price: 4000,
            description: 'Refined table salt',
        },
    ];

    return (
        <div className="flex-1 px-6 py-8  min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Inventory</h1>
           <InventoryClient
           initialItems={itemsData}
              />
        </div>
    );
}