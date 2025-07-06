import InventoryClient from "@/components/client/InventoryClient";
import { cookies } from 'next/headers';

export default async function InventoryPage() {
    
    const itemsData = [
        {
            name: 'Rice',
            type: 'Staple',
            stock: 100,
            units: 'kg',
            itemPrice: 15000,
            description: 'High quality rice'
        },
        {
            name: 'Carrot',
            type: 'Vegetable',
            stock: 50,
            units: 'kg',
            itemPrice: 5000,
            description: 'Fresh carrots'
        },
        {
            name: 'Spoon',
            type: 'Utensil',
            stock: 200,
            units: 'pcs',
            itemPrice: 2000,
            description: 'Stainless steel spoon'
        },
        {
            name: 'Chicken Breast',
            type: 'Meat',
            stock: 80,
            units: 'kg',
            itemPrice: 40000,
            description: 'Boneless chicken breast'
        },
        {
            name: 'Milk',
            type: 'Dairy',
            stock: 120,
            units: 'liters',
            itemPrice: 12000,
            description: 'Fresh cow milk'
        },
        {
            name: 'Eggs',
            type: 'Dairy',
            stock: 300,
            units: 'pcs',
            itemPrice: 2000,
            description: 'Farm fresh eggs'
        },
        {
            name: 'Tomato',
            type: 'Vegetable',
            stock: 60,
            units: 'kg',
            itemPrice: 7000,
            description: 'Red ripe tomatoes'
        },
        {
            name: 'Potato',
            type: 'Vegetable',
            stock: 90,
            units: 'kg',
            itemPrice: 6000,
            description: 'Organic potatoes'
        },
        {
            name: 'Beef',
            type: 'Meat',
            stock: 70,
            units: 'kg',
            itemPrice: 60000,
            description: 'Premium beef'
        },
        {
            name: 'Fish',
            type: 'Seafood',
            stock: 40,
            units: 'kg',
            itemPrice: 50000,
            description: 'Freshwater fish'
        },
        {
            name: 'Salt',
            type: 'Spice',
            stock: 150,
            units: 'kg',
            itemPrice: 3000,
            description: 'Iodized salt'
        },
        {
            name: 'Pepper',
            type: 'Spice',
            stock: 80,
            units: 'kg',
            itemPrice: 10000,
            description: 'Black pepper'
        },
        {
            name: 'Cooking Oil',
            type: 'Staple',
            stock: 100,
            units: 'liters',
            itemPrice: 20000,
            description: 'Vegetable cooking oil'
        },
        {
            name: 'Onion',
            type: 'Vegetable',
            stock: 70,
            units: 'kg',
            itemPrice: 8000,
            description: 'Fresh onions'
        },
        {
            name: 'Garlic',
            type: 'Vegetable',
            stock: 40,
            units: 'kg',
            itemPrice: 15000,
            description: 'Aromatic garlic'
        },
        {
            name: 'Sugar',
            type: 'Staple',
            stock: 110,
            units: 'kg',
            itemPrice: 13000,
            description: 'Granulated sugar'
        },
        {
            name: 'Butter',
            type: 'Dairy',
            stock: 30,
            units: 'kg',
            itemPrice: 40000,
            description: 'Creamy butter'
        },
        {
            name: 'Broccoli',
            type: 'Vegetable',
            stock: 25,
            units: 'kg',
            itemPrice: 12000,
            description: 'Fresh broccoli'
        },
        {
            name: 'Apple',
            type: 'Fruit',
            stock: 60,
            units: 'kg',
            itemPrice: 18000,
            description: 'Red apples'
        },
        {
            name: 'Banana',
            type: 'Fruit',
            stock: 80,
            units: 'kg',
            itemPrice: 10000,
            description: 'Sweet bananas'
        },
        {
            name: 'Orange',
            type: 'Fruit',
            stock: 70,
            units: 'kg',
            itemPrice: 20000,
            description: 'Juicy oranges'
        },
        {
            name: 'Plate',
            type: 'Utensil',
            stock: 150,
            units: 'pcs',
            itemPrice: 5000,
            description: 'Ceramic plate'
        },
        {
            name: 'Fork',
            type: 'Utensil',
            stock: 180,
            units: 'pcs',
            itemPrice: 2500,
            description: 'Stainless steel fork'
        },
        {
            name: 'Cup',
            type: 'Utensil',
            stock: 100,
            units: 'pcs',
            itemPrice: 4000,
            description: 'Glass cup'
        },
        {
            name: 'Yogurt',
            type: 'Dairy',
            stock: 50,
            units: 'kg',
            itemPrice: 25000,
            description: 'Plain yogurt'
        },
        {
            name: 'Shrimp',
            type: 'Seafood',
            stock: 30,
            units: 'kg',
            itemPrice: 80000,
            description: 'Fresh shrimp'
        }
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