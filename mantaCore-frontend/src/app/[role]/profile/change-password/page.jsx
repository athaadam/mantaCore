import UserForm from '@/components/form/UserChangesForm'
import PageBreadcrumb from '@/components/header/layout/PageBreadCrump'

export default function ChangePasswordPage() {
    return (
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 min-h-screen overflow-y-auto">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Breadcrumb Navigation */}
                    <PageBreadcrumb items={["Dashboard", "Profile", "Change Password"]} />

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0117 9zm-6 2l4 4m0 0l-2 2m2-2H9" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">
                            Change Your Password
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Keep your account secure by updating your password regularly.
                            Choose a strong password that you haven't used before.
                        </p>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg p-6 max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-amber-800 mb-2">Security Reminder</h3>
                                <ul className="text-sm text-amber-700 space-y-1">
                                    <li>• Use a combination of uppercase, lowercase, numbers, and symbols</li>
                                    <li>• Make it at least 8 characters long</li>
                                    <li>• Avoid using personal information or common words</li>
                                    <li>• Don't reuse passwords from other accounts</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-w-2xl mx-auto">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 p-8">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Security Update</h2>
                                    <p className="text-white/80">Update your account password</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8 lg:p-12">
                            <UserForm mode="password" />
                        </div>
                    </div>

                    {/* Security Tips */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <h3 className="font-medium text-slate-900 mb-1">Password Security Tips</h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    Follow these best practices to keep your account secure:
                                </p>
                                <ul className="text-sm text-slate-600 space-y-1">
                                    <li>• Enable two-factor authentication when available</li>
                                    <li>• Change passwords regularly, especially if compromised</li>
                                    <li>• Use a password manager to generate unique passwords</li>
                                    <li>• Never share your password with anyone</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
