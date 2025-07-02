export default function TransactionFilterRow() {
    return (
        <div className="flex flex-wrap items-center gap-3 p-4">
            {/* Tanggal Mulai */}
            <input
                type="date"
                id="startDate2"
                name="startDate"
                defaultValue="2025-04-24"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />

            <span className="text-gray-500">-</span>

            {/* Tanggal Akhir */}
            <input
                type="date"
                id="endDate2"
                name="endDate"
                defaultValue="2025-06-20"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />

            {/* Dropdown Kategori Produk */}
            <select
                name="category"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option>Product Category</option>
            </select>

            {/* Dropdown Suitor */}
            <select
                name="suitor"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option>Suitor</option>
            </select>

            {/* Tombol Filter */}
            <button className="bg-purple-800 hover:bg-purple-900 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer">
                Apply Filter
            </button>

            {/* Tombol Export (didorong ke kanan) */}
            <div className="ml-auto">
                <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer">
                    Export as PDF
                </button>
            </div>
        </div>
    );
}
