import InvoicesClient from "@/components/client/InvoicesClient"
import Header3 from "@/components/header/Header3"

const { apiHit } = require("@/libs/api/fetch")
const { cookies } = require("next/headers")

const Page = async () => {

    const cookie = await cookies()
    const token = await cookie.get('auth').value

    // Get user profile and customers which should always exist
    const myProfile = await apiHit('user', token)
    const customer = await apiHit('getAllCostumers', token)
    const getItems = await apiHit('getAllItems', token)

    // Try to get invoices, handle the case when none exist
    let myInvoices = []
    try {
        const myInvoiceRes = await apiHit('getMyInvoices', token)
        myInvoices = myInvoiceRes.invoices || []
    } catch (error) {
        // If the API returns a 404 "No invoices found", we'll just use an empty array
        // No need to throw, we'll continue with empty invoices array
    }

    // Get items and ensure they have the right properties
    let items = []
    try {
        items = Array.isArray(getItems) ? getItems : []
    } catch (error) {
        // Silently handle any errors processing items
    }

    const data = {
        myInvoices: Array.isArray(myInvoices) ? myInvoices : [],
        myProfile: myProfile || { user: {}, company: {} },
        customer: customer || [],
        items: items
    }



    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                </div>
                {/* Content Container */}
                <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <Header3
                            // icon={ }
                            title="Invoices Management Portal"
                            subtitle="Manage your invoices with ease"
                            colorScheme="purple"

                        />
                        <InvoicesClient data={data} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Page;
