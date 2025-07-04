import UserForm from '@/components/form/UserChangesForm'

export default function EditAccountPage() {
    return (
        <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-purple-100 mx-auto">
                <UserForm mode="edit" />
            </div>
        </div>
    )
}
