'use client'

import { useState } from 'react'
import Alert from '@/components/alert'


export default function RegisterForm({ onSwitch }) {
    const [alert, setAlert] = useState(null)
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    password_confirmation: form.confirmPassword,
                    company: form.company,
                }),
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error('Response is not valid JSON');
            }

            if (response.ok) {
                setAlert({ message: 'Registration successful please login', type: 'success' });
                setForm({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    company: '',
                });
            } else {
                const errors = data?.errors;
                if (errors) {
                    const errorList = Object.values(errors).flat().join('\n');
                    setAlert({ message: errorList, type: 'error' });
                } else {
                    setAlert({ message: data.message || 'Registration failed', type: 'error' });
                }
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setAlert({ message: 'Server/network error.', type: 'error' });
        }
    };



    return (
        <div className="flex flex-col w-full flex-shrink-0 text-center">
            <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">Register</h2>
            <div className="mb-[20px]">
                {alert && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>
            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    // required
                    value={form.username}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    // required
                    value={form.password}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmation Password"
                    // required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    // required
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
                    className="text-[#6A5ACD] font-semibold hover:text-[#362B6D] underline underline-offset-2 cursor-pointer"
                >
                    Login
                </button>
            </p>
        </div>
    )
}
