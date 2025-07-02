'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/context/RoleContext'
import Alert from '@/components/global/Alert'
import { login, getProfile } from '@/libs/api/auth'

export default function LoginForm({ onSwitch }) {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(null)
    const { setRole } = useRole()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = await login(username, password)
            const profile = await getProfile(token)
            setAlert({ message: 'Login successful', type: 'success' })
            setRole(profile.user.role)
            router.push(`/${profile.user.role}/dashboard`)
        } catch (err) {
            console.error(err)
            setAlert({ message: err.message || 'Login failed', type: 'error' })
        }
    }

    return (
        <div className="flex flex-col w-full flex-shrink-0 text-center">
            <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">Sign In</h2>
            <div className="mb-[20px]">
                {alert && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>
            {/* Form */}
            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    // required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    placeholder="Password"
                    // required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <button
                    type="submit"
                    className="mt-[20px] self-center w-[30%] p-[10px] bg-[#6A5ACD] text-white rounded-[6px] text-[1.2rem] cursor-pointer transition hover:bg-[#5a4ac5] font-medium"
                >
                    Login
                </button>
            </form>

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
        </div>
    )
}
