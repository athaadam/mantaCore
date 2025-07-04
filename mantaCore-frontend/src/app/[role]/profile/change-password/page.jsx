import UserForm from '@/components/form/UserChangesForm'

export default function ChangePasswordPage() {
    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Change Password</h1>
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-purple-100 mx-auto">
                <UserForm mode="password" />
            </div>
        </div>
    )
}
