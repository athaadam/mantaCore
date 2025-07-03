'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import Alert from '@/components/global/Alert';
import { editProfile } from '@/libs/api/profile';
import { useParams, useRouter } from 'next/navigation';

export default function Action({ form, setForm, initialForm }) {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const router = useRouter();
    const { role } = useParams();

    const handleEditProfile = async () => {
        setLoading(true);
        setAlert(null);

        try {
            const token = Cookies.get('auth');
            const result = await editProfile(token, form);
            setForm(initialForm);
            setAlert({ type: 'success', message: result.message });
        } catch (err) {
            setAlert({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

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
                    onClick={() => {
                        router.replace(`/${role}/profile`);
                        setTimeout(() => {
                            router.refresh();
                        }, 100);
                    }}
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleEditProfile}
                    disabled={loading}
                    className={`w-1/2 text-white py-3 font-semibold rounded-2xl shadow transition 
            ${loading
                            ? 'bg-purple-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
        </div>
    );
}
