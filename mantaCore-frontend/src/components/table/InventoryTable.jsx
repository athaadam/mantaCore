'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import { formatRupiah } from '@/libs/utils/formats/formatRupiah';
import { formatDate } from '../../libs/utils/formats/formatdate';

export default function InventoryTable({ items, itemsPerPage, onDelete, onEdit, Alert }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);
  const startIdx = Math.max((currentPage - 1) * itemsPerPage, 0);
  const currentData = items.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    const pages = Math.ceil((items?.length || 0) / itemsPerPage);
    if (currentPage > pages) {
      setCurrentPage(1);
    }
  }, [items, itemsPerPage, currentPage]);


  return (
    <div className="space-y-6">
      {Alert && (
        <div className="mb-6">
          <Alert message={Alert.message} type={Alert.type} />
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-visible hover:shadow-2xl transition-all duration-300">
        <div className="px-8 pt-8 pb-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-purple-800 tracking-tight">
                Inventory Items
              </h2>
              <p className="text-purple-600 text-sm mt-1">
                Manage your inventory items
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 overflow-x-auto block w-full">
          <table className="w-full min-w-[1000px] table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                {['No', 'Updated', 'Item', 'Category', 'Stock', 'Price', 'Actions'].map((header) => (
                  <th key={header} className="px-4 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-purple-100">
              {currentData && currentData.length > 0 ? (
                currentData.map((item, idx) => (
                  <tr
                    key={startIdx + idx}
                    className="hover:bg-purple-50/70 transition-all duration-200 group"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-full text-xs font-bold text-purple-700">
                        {startIdx + idx + 1}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-slate-600">
                      {formatDate(item.updated_at) || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 capitalize">{item.name}</div>
                          <div className="text-xs text-purple-600 font-medium capitalize">{item.type} • {item.units}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 shadow-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold shadow-lg ${item.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : item.stock > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {item.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-purple-700">
                        {formatRupiah(item.itemPrice)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs"
                          onClick={() => onEdit(item)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            onDelete(startIdx + idx);
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-600 mb-2">No Inventory Items Found</p>
                        <p className="text-sm text-slate-400">Add your first item to get started with inventory management</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      )}
    </div>
  );
}
