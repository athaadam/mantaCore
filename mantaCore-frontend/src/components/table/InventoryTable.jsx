'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/utils/Pagination';
import useProfile from '@/hooks/context/ProfileContext';
import { formatRupiah } from '@/components/utils/formatRupiah';
import { formatDate } from '../utils/formatdate';

export default function InventoryTable({ items, itemsPerPage, onDelete, onEdit, Alert }) {
  const { profile: myProfile, loading } = useProfile()
  const [currentPage, setCurrentPage] = useState(1);
  const companyName = myProfile?.company?.companyName ?? 'Loading...'
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
      
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">
            Inventory Items
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {companyName && companyName !== 'Loading...' ? `Manage ${companyName} inventory` : 'Manage your inventory items'}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                {['No', 'Last Updated', 'Item Name', 'Category', 'Type', 'Stock', 'Unit', 'Price', 'Actions'].map((header) => (
                  <th key={header} className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData && currentData.length > 0 ? (
                currentData.map((item, idx) => (
                  <tr
                    key={startIdx + idx}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                        {startIdx + idx + 1}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {formatDate(item.updated_at) || '-'}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500">Inventory Item</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.type}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.stock > 10 
                            ? 'bg-green-100 text-green-800' 
                            : item.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.units}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-slate-900">
                        {formatRupiah(item.itemPrice)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                          onClick={() => onEdit(item)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                              onDelete(startIdx + idx);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
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
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                      <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <div>
                        <p className="text-lg font-medium text-slate-900">No inventory items found</p>
                        <p className="text-sm">Add your first item to get started</p>
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
