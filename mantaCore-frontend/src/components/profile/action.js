'use client'
import { useRouter } from 'next/navigation';

export default function ProfileAction({ role }) {
    const router = useRouter();
    return (
        <div className="mt-6 flex justify-end gap-2">
            <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer rounded-b-lg"
                onClick={() => router.push(`/${role}/profile/change-password`)}
            >
                Change Password
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer rounded-b-lg">
                Delete Account
            </button>
        </div>
    );
}