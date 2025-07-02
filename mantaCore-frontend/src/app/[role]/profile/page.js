import { cookies } from "next/headers";
import Image from "next/image";
import Action from "@/components/profile/action";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
        return <div className="text-center mt-10 text-red-500">Unauthorized</div>;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });

    if (!res.ok) {
        return <div className="text-center mt-10 text-red-500">Failed to load user data</div>;
    }

    const data = await res.json();
    const user = {
        name: data.user.username,
        role: data.user.role,
        email: data.user.email,
        phone: data.user.phone_number || 'N/A',
        username: data.user.username,
        companyName: data.company.companyName,
        subscriptionUntil: new Date(data.company.subscription_until).toLocaleDateString(),
        joinedSince: new Date(data.user.created_at).toLocaleDateString(),
    };
    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                User Profile
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/user.jpg"
                            alt="User Avatar"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-2xl hover:bg-purple-700 transition cursor-pointer">
                        Edit
                    </button>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">
                    <div>
                        <p className="font-semibold text-gray-700">Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Company Name</p>
                        <p>{user.companyName}</p>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-700">Phone Number</p>
                        <p>{user.phone}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Subscription Active Until</p>
                        <p>{user.subscriptionUntil}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Joined Since</p>
                        <p>{user.joinedSince}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <Action role={user.role} />
                </div>
            </div>
        </div>
    );
}
