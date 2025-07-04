'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import ActionForm from '@/components/action/ProfileChangesAction'
import { getProfile } from '@/libs/api/auth'

export default function UserForm({ mode = 'edit' }) {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(true)

    
    const initialForms = {
        edit: {
            username: '',
            email: '',
            phone_number: '',
        },
        password: {
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        },
    }

    const initialForm = initialForms[mode]

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (mode === 'edit') {
                    const token = Cookies.get('auth')
                    const data = await getProfile(token)

                    setForm({
                        username: data.user.username || '',
                        email: data.user.email || '',
                        phone_number: data.user.phone_number || '',
                    })
                } else {
                    setForm(initialForms.password)
                }
            } catch (err) {
                console.error('Failed to fetch user:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [mode])

    if (loading) return <p className="text-center py-10">Loading...</p>

    return (
        <form className="space-y-6">
            {mode === 'edit' && (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Enter new username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Enter new email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Enter new phone number"
                        />
                    </div>
                </>
            )}

            {mode === 'password' && (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            name="current_password"
                            value={form.current_password}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Enter current password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            value={form.new_password}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="new_password_confirmation"
                            value={form.new_password_confirmation}
                            onChange={handleChange}
                            className="input-style"
                            placeholder="Re-enter new password"
                            required
                        />
                    </div>
                </>
            )}

            <div className="flex justify-between gap-4">
                <ActionForm mode={mode} form={form} setForm={setForm} initialForm={initialForm} />
            </div>
        </form>
    )
}
