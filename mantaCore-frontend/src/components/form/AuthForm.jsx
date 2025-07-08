'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/hooks/context/RoleContext'
import Alert from '@/components/utils/Alert'
import { login, getProfile, register } from '@/libs/api/auth'
import { extractErrorMessage } from '@/libs/exceptions'

export default function AuthForm({ mode = 'login', onSwitch }) {
    const router = useRouter()
    const { setRole } = useRole()
    const [alert, setAlert] = useState(null)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        company: '',
        phone_number: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAlert(null)

        try {
            if (mode === 'login') {
                const token = await login(form.username, form.password)
                const profile = await getProfile(token)
                setAlert({ message: 'Login successful', type: 'success' })
                setRole(profile.user.role)
                router.push(`/${profile.user.role}/dashboard`)
            } else {
                await register(form)
                setAlert({ message: 'Registration successful. Please login.', type: 'success' })
                setForm({
                    username: form.username,
                    password: form.password,
                    password_confirmation: '',
                    email: '',
                    company: '',
                    phone_number: '',
                })
            }
        } catch (err) {
            const message = extractErrorMessage(err)
            setAlert({ message: `${message}`, type: 'error' });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Join MantaCore'}
                </h2>
                <p className="text-slate-600 text-sm">
                    {mode === 'login' ? 'Sign in to access your dashboard' : 'Create your business account today'}
                </p>
            </div>

            {alert && (
                <div className="mb-6">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="group">
                        <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                required
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    </div>
                    
                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                required
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    </div>

                {mode === 'register' && (
                    <>
                        <div className="group">
                            <label htmlFor="password_confirmation" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                    required
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                    required
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        <div className="group">
                            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                                Company Name
                            </label>
                            <div className="relative">
                                <input
                                    id="company"
                                    type="text"
                                    name="company"
                                    placeholder="Enter your company name"
                                    value={form.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                    required
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        <div className="group">
                            <label htmlFor="phone_number" className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-violet-600 transition-colors">
                                Phone Number
                            </label>
                            <div className="relative">
                                <input
                                    id="phone_number"
                                    type="text"
                                    name="phone_number"
                                    placeholder="Enter your phone number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all duration-300 outline-none hover:border-slate-300"
                                    pattern='^\+?[0-9\s-]{7,15}$'
                                    required
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                    </>
                )}
                </div>

                <button
                    type="submit"
                    className={`relative w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-6 overflow-hidden group ${
                        loading 
                            ? 'bg-slate-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 active:scale-[0.98]'
                    }`}
                    disabled={loading}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </span>
                    {!loading && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center space-y-3">
                {mode === 'login' && (
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors duration-200 group"
                    >
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.116 9.48 12.845 9 13.657 9H15z" />
                        </svg>
                        Forgot your password?
                    </button>
                )}
                
                <p className="text-sm text-slate-600">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                        type="button"
                        onClick={onSwitch}
                        className="font-semibold text-violet-600 hover:text-violet-700 transition-colors duration-200 underline underline-offset-2 hover:underline-offset-4"
                    >
                        {mode === 'login' ? 'Create one now' : 'Sign in instead'}
                    </button>
                </p>
            </div>
        </div>
    )
}
