import AdminDashboardLayout from '@/components/layout/AdminDashboardLayout';
import CashierDashboardLayout from '@/components/layout/CashierDashboardLayout';
import ManagementDashboardLayout from '@/components/layout/ManagementDashboardLayout';
import { apiHit } from '@/libs/api/fetch';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookie = await cookies();
  const token = await cookie.get('auth')?.value;
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
    // Fetch all necessary data in parallel for improved performance
    const [customersData, myInvoicesRaw, allItems] = await Promise.all([
      apiHit('getAllCostumers', token),
      apiHit('getMyInvoices', token),
      apiHit('getAllItems', token),
    ]);

    // Process the invoice data to handle different response formats
    const myInvoices = Array.isArray(myInvoicesRaw)
      ? myInvoicesRaw
      : (myInvoicesRaw?.invoices ?? []); 

    // Prepare data object for the cashier dashboard with customers as the primary focus
    const data = {
      customers: customersData,
      items: allItems,
      myInvoices
    };

    return <CashierDashboardLayout data={data} />;

  } else if (profile.user.role === 'management') {
    // Fetch all necessary data in parallel for improved performance
    const [allPurchases, purchaseReportData, allItems, allUsers] = await Promise.all([
      apiHit('getAllPurchases', token),
      apiHit('purchase-report', token),
      apiHit('getAllItems', token),
      apiHit('getAllUsers', token),
    ]);

    // Prepare data object for the management dashboard
    const data = {
      purchases: allPurchases,
      purchaseReport: purchaseReportData,
      items: allItems,
      users: allUsers
    };

    return <ManagementDashboardLayout data={data} />;
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
