import AdminDashboardLayout from '@/components/layout/AdminDashboardLayout';
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
    const summaryData = {
      totalLifetimeSales: totalSalesValue?.totalSales || 0,
      todayPnL: todayProfitLossValue?.profitLoss || 0,
      lifetimePnL: lifetimeProfitLossValue?.profitLoss || 0,
    };
    const data = {
      summaryData,
      transactions,
      topSells,
      purchaseRequests,
    };
    return <AdminDashboardLayout data={data} />;
  }
}
