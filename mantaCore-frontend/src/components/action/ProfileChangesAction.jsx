'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import Alert from '@/components/utils/Alert'
import { editProfile, changePassword } from '@/libs/api/profile'
import { useParams, useRouter } from 'next/navigation'
import { extractErrorMessage } from '@/libs/exceptions'
import { getToken } from '@/libs/api/auth'

export default function ActionForm({ mode = 'edit', form, setForm, initialForm }) {
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    const router = useRouter()
    const { role } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAlert(null)
        try {
            const token = await getToken();
            let result
            if (mode === 'edit') {
                result = await editProfile(token, form)
            } else if (mode === 'password') {
                result = await changePassword(token, form)
            }

            setForm(initialForm)
            setAlert({ type: 'success', message: result.message })
        } catch (err) {
            const message = extractErrorMessage(err)
            setAlert({ type: 'error', message: `${message}` })
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        if (mode === 'edit') {
            router.replace(`/${role}/profile`)
            setTimeout(() => router.refresh(), 100)
        } else {
            window.history.back()
        }
    }

    return (
        <div className="space-y-6">
            {alert && (
                <div className="transform transition-all duration-300 ease-in-out">
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    className="group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 text-slate-700 border border-slate-300 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-200"
                    onClick={handleBack}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200/0 via-slate-200/50 to-slate-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="relative z-10">Go Back</span>
                </button>
                
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        loading
                            ? 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'
                            : mode === 'edit'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                            : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
                    }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {loading ? (
                        <>
                            <svg className="w-5 h-5 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="relative z-10">
                                {mode === 'edit' ? 'Updating Profile...' : 'Changing Password...'}
                            </span>
                        </>
                    ) : (
                        <>
                            {mode === 'edit' ? (
                                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0117 9zm-6 2l4 4m0 0l-2 2m2-2H9" />
                                </svg>
                            )}
                            <span className="relative z-10">
                                {mode === 'edit' ? 'Update Profile' : 'Change Password'}
                            </span>
                        </>
                    )}
                </button>
            </div>

            {/* Progress indicator for form completion */}
            {mode === 'password' && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-slate-600">
                            After changing your password, you'll need to log in again on all devices for security.
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
