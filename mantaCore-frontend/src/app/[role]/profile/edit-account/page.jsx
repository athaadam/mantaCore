import UserForm from '@/components/form/UserChangesForm'
import PageBreadcrumb from '@/components/layout/PageBreadCrump'

export default function EditAccountPage() {
    return (
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 min-h-screen overflow-y-auto">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Breadcrumb Navigation */}
                    <PageBreadcrumb items={["Dashboard", "Profile", "Edit Account"]} />

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">
                            Edit Your Profile
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Update your personal information to keep your account current and secure.
                            Changes will be reflected across the entire platform.
                        </p>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-w-2xl mx-auto">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Account Information</h2>
                                    <p className="text-white/80">Modify your profile details below</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8 lg:p-12">
                            <UserForm mode="edit" />
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-medium text-slate-900 mb-1">Need Help?</h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    Having trouble updating your profile? Here are some tips:
                                </p>
                                <ul className="text-sm text-slate-600 space-y-1">
                                    <li>• Make sure your email address is valid and unique</li>
                                    <li>• Username must be at least 3 characters long</li>
                                    <li>• Phone number should include country code if international</li>
                                    <li>• Changes may take a few moments to appear everywhere</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
