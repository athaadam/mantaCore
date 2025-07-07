import TopSales from '@/components/chart/TopSales';
import SummaryCards from '@/components/card/SummaryCards';
import TransactionTable from '@/components/table/TransactionTable';
import PurchaseTable from '@/components/table/PurchaseTable';
import { getAllPurchases } from '@/libs/api/purchase-approval';
import { cookies } from 'next/headers';
import { getInvoices } from '@/libs/api/sales-report';
import {
  todayProfitLoss,
  topSellingItems,
  totalPenjualan,
  lifetimeProfitLoss,
} from '@/libs/api/dashboard';
import { getProfile } from '@/libs/api/auth';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value;

  const profile = await getProfile(token);
  console.log('Profile:', profile);

  if (profile.user.role === 'admin') {
    const [
      totalSalesValue,
      todayProfitLossValue,
      lifetimeProfitLossValue,
      transactions,
      topSells,
      purchaseRequests,
    ] = await Promise.all([
      totalPenjualan(token),
      todayProfitLoss(token),
      lifetimeProfitLoss(token),
      getInvoices(token),
      topSellingItems(token),
      getAllPurchases(token),
    ]);
    console.log('Total Sales Value:', totalSalesValue);
    const summaryData = {
      totalPenjualan: totalSalesValue.totalSales || 0,
      todayPnL: todayProfitLossValue?.profitLoss || 0,
      lifetimePnL: lifetimeProfitLossValue?.profitLoss || 0,
    };

    return (
      profile.user.role === 'admin' ? (
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Quick summary of today’s activities</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SummaryCards data={summaryData} only={['totalPenjualan', 'todayPnL', 'lifetimePnL']} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-xl bg-white p-6 shadow-md flex flex-col min-h-[320px]">
              <h3 className="text-xl text-gray-800 font-semibold mb-4 self-start">
                Top Lifetime Sales Item
              </h3>
              <TopSales report={topSells} />
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md flex flex-col min-h-[320px]">
              <TransactionTable transactions={transactions.invoices} itemsPerPage={5} />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <PurchaseTable data={purchaseRequests} itemsPerPage={5} mode="request" />
          </div>
        </div>
      ) : null
    );
  } else if (profile.user.role === 'cashier') {
    return (
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Quick summary of today’s activities</p>
        </div>
      </div>
    )
  } else {
    return (
      <div>Management</div>
    )
  }


}