import { cookies } from "next/headers";
import Image from "next/image";
import { getProfile } from "@/libs/api/auth";
import { formatDate } from "@/components/utils/formatdate";
import { ProfileAction, EditAccountAction } from '@/components/action/ProfileAction';


export default async function ProfilePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    const data = await getProfile(token);

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
                            src="/assets/common/user.jpg"
                            alt="User Avatar"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{data.user.username}</h2>
                            <p className="text-gray-500 capitalize">{data.user.role}</p>
                        </div>
                    </div>
                    <EditAccountAction role={data.user.role} />
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">
                    <div>
                        <p className="font-semibold text-gray-700">Email</p>
                        <p>{data.user.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Company Name</p>
                        <p>{data.company.companyName}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Phone Number</p>
                        <p>{data.user.phone_number || '='}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Subscription Active Until</p>
                        <p>{formatDate(data.company.subscription_until)}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Joined Since</p>
                        <p>{formatDate(data.user.created_at)}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Last Updated</p>
                        <p>{formatDate(data.user.updated_at)}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <ProfileAction role={data.user.role} />
                </div>
            </div>
        </div>
    );
}
