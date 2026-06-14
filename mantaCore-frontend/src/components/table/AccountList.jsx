import { getStatusColor } from '@/libs/utils/colors/statuscolor';
import Pagination from '../common/Pagination';
import useProfile from '@/hooks/context/ProfileContext'


export default function AccountList({ accounts, itemsPerPage, currentPage, onPageChange, onDelete, onEdit }) {
    const { profile: myProfile } = useProfile()

    const companyName = myProfile?.company?.companyName ?? 'Loading...'
    const totalPages = Math.ceil(accounts.length / itemsPerPage)
    const startIdx = (currentPage - 1) * itemsPerPage
    const currentData = accounts.slice(startIdx, startIdx + itemsPerPage)

    if (accounts.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">No Accounts Found</h3>
                <p className="text-slate-500">Create your first account to get started with team management.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        {companyName} Team Directory
                    </h3>
                    <p className="text-sm text-slate-600">
                        Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, accounts.length)} of {accounts.length} accounts
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Inactive</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-4 px-4 font-semibold text-slate-700 bg-slate-50 rounded-tl-lg">User Info</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700 bg-slate-50">Contact</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700 bg-slate-50">Role</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700 bg-slate-50">Status</th>
                            <th className="text-center py-4 px-4 font-semibold text-slate-700 bg-slate-50 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentData.filter(acc => acc).map((acc, index) => (
                            <tr key={acc?.userID || index} className="hover:bg-slate-50 transition-colors duration-200 group">
                                {/* User Info */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {acc.username ? acc.username.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{acc.username || 'No Username'}</p>
                                            <p className="text-sm text-slate-500">{acc.email || 'No Email'}</p>
                                        </div>
                                    </div>
                                </td>
                                
                                {/* Contact */}
                                <td className="py-4 px-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-slate-600">{acc.email || '-'}</span>
                                        </div>
                                        {acc.phone_number && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-slate-600">{acc.phone_number}</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                
                                {/* Role */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(acc.role)}`}>
                                        {acc.role === 'admin' && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        )}
                                        {acc.role === 'management' && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        )}
                                        {acc.role === 'cashier' && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        )}
                                        <span className="capitalize">{acc.role || 'Unknown'}</span>
                                    </span>
                                </td>
                                
                                {/* Status */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(acc.status)}`}>
                                        <div className={`w-2 h-2 rounded-full ${acc.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="capitalize">{acc.status || 'active'}</span>
                                    </span>
                                </td>
                                
                                {/* Actions */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(acc)}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 group-hover:shadow-sm"
                                            title="Edit Account"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(acc.userID)}
                                            disabled={acc.role === 'admin'}
                                            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group-hover:shadow-sm ${
                                                acc.role === 'admin'
                                                    ? 'text-slate-400 bg-slate-50 border border-slate-200 cursor-not-allowed'
                                                    : 'text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300'
                                            }`}
                                            title={acc.role === 'admin' ? 'Cannot disable admin account' : 'Disable Account'}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                            </svg>
                                            {acc.role === 'admin' ? 'Protected' : 'Disable'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pt-4 border-t border-slate-200">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => onPageChange(Math.max(currentPage - 1, 1))}
                        onNext={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    />
                </div>
            )}
        </div>
    );
}
