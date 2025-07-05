'use client';

import { useState } from 'react';
import Pagination from '@/components/utils/Pagination';

export default function InventoryTable({ items, itemsPerPage, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl drop-shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 font-semibold text-gray-700">No</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Item Name</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Units</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((item, idx) => (
                <tr key={startIdx + idx} className="hover:bg-gray-50 border-t">
                  <td className="py-4 px-4">{startIdx + idx + 1}</td>
                  <td className="py-4 px-4">{item.name}</td>
                  <td className="py-4 px-4">{item.type}</td>
                  <td className="py-4 px-4">{item.stock}</td>
                  <td className="py-4 px-4">{item.units}</td>
                  <td className="py-4 px-4">Rp {item.itemPrice.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button className="text-purple-600 hover:text-purple-800 font-medium mr-3 cursor-pointer">Edit</button>
                    <button onClick={() => onDelete(startIdx + idx)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </div>
      )}
    </div>
  );
}
