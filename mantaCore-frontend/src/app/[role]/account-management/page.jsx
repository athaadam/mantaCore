import PageBreadcrumb from "@/components/layout/PageBreadCrump";
import Header4 from '@/components/header/Header4'
import QuickActions from '@/components/action/QuickActions'
import AccountManagementClient from "@/components/client/AccountManagementClient";
import { cookies } from "next/headers";
import { apiHit } from "@/libs/api/fetch";

export default async function AccountManagementPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;

    try {
        const accounts = await apiHit('getAllUsers', token);
        return (
            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    <PageBreadcrumb items={["Dashboard", "Account Management"]} />

                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 lg:p-8">
                        <Header4
                            icon={
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            }
                            title="Account Management"
                            description="Manage user accounts, roles, and permissions for your organization. Create new accounts, update existing ones, and control access levels."
                            stats={[
                                {
                                    icon: (
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    ),
                                    value: accounts?.length || 0,
                                    label: "Total Accounts",
                                }
                            ]}
                            statusText="System Active"
                        />

                        <QuickActions
                            actions={[
                                { label: "Create new accounts", color: "green", path: "M12 4.5v15m7.5-7.5h-15" },
                                { label: "Edit user details", color: "blue", path: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" },
                                { label: "Manage permissions", color: "purple", path: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
                                { label: "Disable accounts", color: "red", path: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
                            ]}
                        />
                    </div>

                    <AccountManagementClient initialData={accounts} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-medium">Failed to load account data</p>
                </div>
            </div>
        );
    }
}
