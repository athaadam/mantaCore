'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getProfile } from '@/libs/api/auth';
import Action from '@/components/profile/edit-account/Action';

const initialForm = {
    username: '',
    email: '',
    phone_number: '',
};

export default function EditAccountPage() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('auth');
                const data = await getProfile(token);

                setForm({
                    username: data.user.username || '',
                    email: data.user.email || '',
                    phone_number: data.user.phone_number || '',
                });
            } catch (err) {
                console.error('Failed to load profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-purple-100 mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
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
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
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
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
                            placeholder="Enter new phone number"
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <Action form={form} setForm={setForm} initialForm={initialForm} />
                    </div>
                </form>
            </div>
        </div>
    );
}
