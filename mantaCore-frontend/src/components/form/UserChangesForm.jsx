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
            <div className="py-16 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <div className="mt-6 text-center">
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Loading Profile Data</h3>
                    <p className="text-sm text-slate-500">Please wait while we fetch your information...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {mode === 'edit' && (
                <>
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <div className="text-center pb-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Personal Information</h3>
                            <p className="text-sm text-slate-600">Update your basic profile details</p>
                        </div>
                        
                        <div className="space-y-6">
                            <FormGroup
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your unique username"
                                type="text"
                                autoComplete="username"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                }
                                description="This will be displayed across the platform"
                            />
                            <FormGroup
                                label="Email Address"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                type="email"
                                autoComplete="email"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                }
                                description="Used for notifications and account recovery"
                            />
                            <FormGroup
                                label="Phone Number"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={handleChange}
                                placeholder="Enter your phone number (optional)"
                                type="tel"
                                autoComplete="tel"
                                required={false}
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                }
                                description="For SMS notifications and two-factor authentication"
                            />
                        </div>
                    </div>
                </>
            )}

            {mode === 'password' && (
                <>
                    {/* Security Section */}
                    <div className="space-y-6">
                        <div className="text-center pb-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Security Update</h3>
                            <p className="text-sm text-slate-600">Change your account password for better security</p>
                        </div>
                        
                        <div className="space-y-6">
                            <FormGroup
                                label="Current Password"
                                name="current_password"
                                value={form.current_password}
                                onChange={handleChange}
                                placeholder="Enter your current password"
                                type="password"
                                autoComplete="current-password"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                                description="Verify your identity with your current password"
                            />
                            <FormGroup
                                label="New Password"
                                name="new_password"
                                value={form.new_password}
                                onChange={handleChange}
                                placeholder="Enter a strong new password"
                                type="password"
                                autoComplete="new-password"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0117 9zm-6 2l4 4m0 0l-2 2m2-2H9" />
                                    </svg>
                                }
                                description="Use at least 8 characters with mixed case, numbers, and symbols"
                            />
                            <FormGroup
                                label="Confirm New Password"
                                name="new_password_confirmation"
                                value={form.new_password_confirmation}
                                onChange={handleChange}
                                placeholder="Re-enter your new password"
                                type="password"
                                autoComplete="new-password"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                description="Must match the new password exactly"
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="pt-6 border-t border-slate-200">
                <ActionForm
                    mode={mode}
                    form={form}
                    setForm={setForm}
                    initialForm={initialForms[mode]}
                />
            </div>
        </div>
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
    icon,
    description,
}) {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const isPasswordField = type === 'password'
    const inputType = isPasswordField && showPassword ? 'text' : type

    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
                {icon && (
                    <span className="text-slate-500">
                        {icon}
                    </span>
                )}
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            
            <div className="relative group">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white placeholder-slate-400 ${
                        isFocused 
                            ? 'border-indigo-500 ring-4 ring-indigo-100 shadow-lg' 
                            : 'hover:border-slate-300 group-hover:shadow-md'
                    } ${isPasswordField ? 'pr-12' : ''}`}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                />
                
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
                
                {/* Focus indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${
                    isFocused ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}></div>
            </div>
            
            {description && (
                <p className="text-xs text-slate-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {description}
                </p>
            )}
        </div>
    )
}
