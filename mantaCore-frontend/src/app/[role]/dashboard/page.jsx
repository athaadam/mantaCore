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
  } else if (profile.user.role === 'cashier') {

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Cashier PAge</h1>
          <p className="mt-2 text-gray-600">This is Cashier Dashboard Page.</p>
        </div>
      </div>
    );

  } else if (profile.user.role === 'management') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Management page</h1>
          <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>

    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Unknown Role</h1>
          <p className="mt-2 text-gray-600">Your role is not recognized. Please contact support.</p>
        </div>
      </div>
    );
  }


}
