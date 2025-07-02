import Action from "@/components/profile/change-password/Action";

export default function ChangePasswordPage() {
    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Change Password
            </h1>
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-purple-100 mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
                            required
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
                            required
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-purple-200 rounded-xl shadow focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition px-4 py-2 bg-purple-50"
                            required
                            placeholder="Re-enter new password"
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                       <Action />
                    </div>
                </form>
            </div>
        </div>
    );
}