import AdminDashboardLayout from '@/components/layout/AdminDashboardLayout';
import { cookies } from 'next/headers';
import { apiHit } from '@/libs/api/fetch';

export default async function DashboardPage() {
  const token = cookies().get('auth')?.value;

  const profile = await apiHit('user', token);

  if (profile.user.role === 'admin') {
    const [
      totalSalesValue,
      todayProfitLossValue,
      lifetimeProfitLossValue,
      transactions,
      topSells,
      purchaseRequests,
    ] = await Promise.all([
      apiHit('totalPenjualan', token),
      apiHit('todayProfitLoss', token),
      apiHit('lifetimeProfitLoss', token),
      apiHit('getAllInvoices', token),
      apiHit('topSellingItems', token),
      apiHit('getAllPurchases', token),
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

  return null;
}
