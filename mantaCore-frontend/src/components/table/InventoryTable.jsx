'use client';

import { useState } from 'react';
import Pagination from '@/utils/Pagination';

export default function InventoryTable({ items, itemsPerPage, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl overflow-x-auto transition-all duration-300">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
              <th className="py-4 px-5 font-bold text-purple-700 rounded-l-xl">No</th>
              <th className="py-4 px-5 font-bold text-purple-700">Item Name</th>
              <th className="py-4 px-5 font-bold text-purple-700">Type</th>
              <th className="py-4 px-5 font-bold text-purple-700">Stock</th>
              <th className="py-4 px-5 font-bold text-purple-700">Units</th>
              <th className="py-4 px-5 font-bold text-purple-700">Price</th>
              <th className="py-4 px-5 font-bold text-purple-700 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((item, idx) => (
                <tr
                  key={startIdx + idx}
                  className="bg-white hover:bg-purple-50 transition-colors border-t border-gray-100 rounded-xl shadow-sm"
                >
                  <td className="py-4 px-5 text-gray-700">{startIdx + idx + 1}</td>
                  <td className="py-4 px-5 text-gray-900 font-medium">{item.name}</td>
                  <td className="py-4 px-5 text-gray-600">{item.type}</td>
                  <td className="py-4 px-5 text-gray-600">{item.stock}</td>
                  <td className="py-4 px-5 text-gray-600">{item.units}</td>
                  <td className="py-4 px-5 text-gray-700 font-semibold">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">
                      Rp {item.itemPrice.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap flex gap-2">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-lg font-semibold shadow transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(startIdx + idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold shadow transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400 font-medium">
                  No items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
