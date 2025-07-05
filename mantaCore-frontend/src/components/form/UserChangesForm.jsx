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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    if (loading) {
        return (
            <div className="py-10 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <form className="space-y-6">
            {mode === 'edit' && (
                <>
                    <FormGroup
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter new username"
                        type="text"
                        autoComplete="username"
                    />
                    <FormGroup
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter new email"
                        type="email"
                        autoComplete="email"
                    />
                    <FormGroup
                        label="Phone Number"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="Enter new phone number"
                        type="tel"
                        autoComplete="tel"
                    />
                </>
            )}

            {mode === 'password' && (
                <>
                    <FormGroup
                        label="Current Password"
                        name="current_password"
                        value={form.current_password}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormGroup
                        label="New Password"
                        name="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <FormGroup
                        label="Confirm New Password"
                        name="new_password_confirmation"
                        value={form.new_password_confirmation}
                        onChange={handleChange}
                        placeholder="Re-enter new password"
                        type="password"
                        autoComplete="new-password"
                    />
                </>
            )}

            <div className="flex justify-between gap-4">
                <ActionForm
                    mode={mode}
                    form={form}
                    setForm={setForm}
                    initialForm={initialForms[mode]}
                />
            </div>
        </form>
    )
}

function FormGroup({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    autoComplete,
    required = true,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700 mb-1"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="input-style"
                placeholder={placeholder}
                required
                autoComplete={autoComplete}
            />
        </div>
    )
}
