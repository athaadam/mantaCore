'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import Alert from '@/utils/Alert'
import { editProfile, changePassword } from '@/libs/api/profile'
import { useParams, useRouter } from 'next/navigation'

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
            const token = Cookies.get('auth')
            let result
            if (mode === 'edit') {
                result = await editProfile(token, form)
            } else if (mode === 'password') {
                result = await changePassword(token, form)
            }

            setForm(initialForm)
            setAlert({ type: 'success', message: result.message })
        } catch (err) {
            let message = 'Something went wrong';
            if (typeof err.message === 'string') {
                const lines = err.message.split('\n');
                message = lines.find(line => line.trim().length > 0) || message;
            }
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
        <div className="flex flex-col w-full gap-4">
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="flex gap-2 w-full">
                <button
                    type="button"
                    className="w-1/2 bg-gray-300 text-black py-3 font-semibold rounded-2xl shadow hover:bg-gray-400 transition"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-1/2 text-white py-3 font-semibold rounded-2xl shadow transition 
            ${loading
                            ? 'bg-purple-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
                >
                    {loading
                        ? mode === 'edit' ? 'Updating...' : 'Processing...'
                        : mode === 'edit' ? 'Update Profile' : 'Change Password'}
                </button>
            </div>
        </div>
    )
}
