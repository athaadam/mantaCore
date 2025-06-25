'use client'

import { useState } from 'react'

export default function RegisterForm({ onSwitch }) {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        company: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        // Simulasi registrasi
        console.log('Registering:', form)

        // Di sini bisa panggil API register
    }

    return (
        <div className="flex flex-col w-full flex-shrink-0 text-center">
            <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">Register</h2>

            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={form.username}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmation Password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
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

                <button
                    type="submit"
                    className="mt-[20px] self-center w-[30%] p-[10px] bg-[#6A5ACD] text-white rounded-[6px] text-[1.2rem] cursor-pointer transition hover:bg-[#5a4ac5] font-medium"
                >
                    Register
                </button>
            </form>

            <p className="mt-[70px] text-sm text-gray-800">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-[#6A5ACD] font-semibold hover:text-[#362B6D] underline underline-offset-2"
                >
                    Login
                </button>
            </p>
        </div>
    )
}
