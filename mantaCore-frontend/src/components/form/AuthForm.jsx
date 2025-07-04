'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/context/RoleContext'
import Alert from '@/components/global/Alert'
import { login, getProfile, register } from '@/libs/api/auth'

export default function AuthForm({ mode = 'login', onSwitch }) {
    const router = useRouter()
    const { setRole } = useRole()
    const [alert, setAlert] = useState(null)

    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        company: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    company: '',
                    phone: '',
                })
            }
        } catch (err) {
            setAlert({ message: err.message || 'Something went wrong', type: 'error' })
        }
    }

    return (
        <div className="flex flex-col w-full flex-shrink-0 text-center">
            <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">
                {mode === 'login' ? 'Sign In' : 'Register'}
            </h2>

            {alert && (
                <div className="mb-[20px]">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />

                {mode === 'register' && (
                    <>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmation Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={form.company}
                            onChange={handleChange}
                            className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                            pattern='^\+?[0-9\s-]{7,15}$'
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="mt-[20px] self-center w-[30%] p-[10px] bg-[#6A5ACD] text-white rounded-[6px] text-[1.2rem] cursor-pointer transition hover:bg-[#5a4ac5] font-medium"
                >
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>

            {mode === 'login' ? (
                <>
                    <a
                        href="#"
                        className="mt-[20px] text-sm text-[#362B6D] hover:text-[#211a42] font-medium"
                    >
                        Forgot password?
                    </a>
                    <p className="mt-[70px] text-sm text-gray-800">
                        Doesn’t have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitch}
                            className="text-[#6A5ACD] font-semibold hover:text-[#362B6D] underline underline-offset-2 cursor-pointer"
                        >
                            Create now
                        </button>
                    </p>
                </>
            ) : (
                <p className="mt-[70px] text-sm text-gray-800">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitch}
                        className="text-[#6A5ACD] font-semibold hover:text-[#362B6D] underline underline-offset-2 cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            )}
        </div>
    )
}
