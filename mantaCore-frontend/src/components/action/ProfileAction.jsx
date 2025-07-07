'use client';

import { useRouter } from 'next/navigation';

export function ProfileAction({ role }) {
    const router = useRouter();
    return (
        <div className="mt-6 flex justify-end gap-2">
            <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer rounded-b-lg"
                onClick={() => router.push(`profile/change-password`)}
            >
                Change Password
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer rounded-b-lg">
                Delete Account
            </button>
        </div>
    );
}

export function EditAccountAction({ role }) {
    const router = useRouter();
    return (
        <button
            className="bg-purple-600 text-white px-4 py-2 rounded-2xl hover:bg-purple-700 transition cursor-pointer"
            onClick={() => router.push(`profile/edit-account`)}
        >
            Edit
        </button>
    );
}
