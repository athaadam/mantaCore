import DataCard from "@/components/card/DataCard"
import InvoiceStats from "@/components/card/InvoiceStatsCards"
// import Alert from "@/components/common/Alert"
import InvoiceFilter from "@/components/filter/InvoiceFilter"
import Header2 from "@/components/header/Header2"
import Header3 from "@/components/header/Header3"
// import ConfirmationModal from "@/components/modal/ConfirmationModal"
// import InvoiceModal from "@/components/modal/InvoiceModal"
// import InvoiceViewModal from "@/components/modal/InvoiceViewModal"
import InvoiceTable from "@/components/table/InvoiceTable"

const { apiHit } = require("@/libs/api/fetch")
const { cookies } = require("next/headers")

const Page = async () => {
    const cookie = await cookies()
    const token = await cookie.get('auth').value
    const myInvoiceRes = await apiHit('getMyInvoices', token)
    const myInvoices = myInvoiceRes.invoices || []
    const myProfile = await apiHit('user', token)
    const customer = await apiHit('getAllCostumers', token)

    if (!myInvoices || myInvoices.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">No Invoices Found</h1>
                    <p className="mt-2 text-gray-600">You have no invoices available.</p>
                </div>
            </div>
        );
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
                        {/* Header2 */}
                        <Header2
                            title="Invoices Operations"
                            description={`Manage your own invoices for ${myProfile.company.companyName || 'Your Company'}`}
                        />
                        {/* Invoice Stats */}
                        <InvoiceStats

                        />

                        {/* <Alert

                        /> */}

                        <DataCard
                            title="My Invoices"
                            subtitle="Manage your invoices efficiently"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m-3-7a9 9 0 11-9 9 9 9 0 019-9z" />
                                </svg>
                            }
                            gradient={'bg-gradient-to-br from-purple-50 via-white to-indigo-100'}

                        >
                            <InvoiceFilter />

                            <InvoiceTable
                                invoices={myInvoices}
                                itemsPerPage={5}
                            // onEdit={() => { }}
                            // onDelete={() => { }}
                            // onView={() => { }}
                            // isFiltered={false}
                            />
                        </DataCard>
                        {/* <InvoiceViewModal />
                        <InvoiceModal />
                        <ConfirmationModal /> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Page;
