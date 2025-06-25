import Image from 'next/image'
import TopSales from '@/components/dashboard/topsales'
import SummaryCards from '@/components/dashboard/summarycards';
import TransactionTable from '@/components/dashboard/transactiontable.';
import PurchaseRequestTable from '@/components/dashboard/purchaserequesttable';


export default function DashboardPage() {
  
  const summaryData = {
    totalSales: 400000000,
    todayPnL: 2000000,
    lifetimePnL: 2000000,
  };

  const transactions = [
    {
      date: 'April 1, 2025',
      item: 'Tumbler, Spoon',
      author: 'AHMD',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'RFF',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'SSS',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
    {
      date: 'April 1, 2025',
      item: 'Rice, Carrot, Spoon',
      author: 'EAR',
      amount: 'Rp20.000',
    },
  ];

  const purchaseRequests = [
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Pangan',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Declined',
    },
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Ular',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Pending',
    },
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Pingin',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Approved',
    },
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Pingin',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Approved',
    },
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Pingin',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Approved',
    },
    {
      date: 'April 1, 2025',
      title: 'Pembelian bahan baku Pingin',
      author: 'ADM',
      amount: 'Rp4.000.000',
      status: 'Approved',
    },
  ];


  return (
    <div className="flex-1 px-6 py-8 bg-white overflow-y-auto max-w-[1440px] mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="flex flex-wrap justify-center gap-12 mb-8 w-full">
        <SummaryCards data={summaryData} />
      </div>

      {/* Charts & Transactions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6 drop-shadow-lg items-stretch">
        <div className="min-h-[280px]">
          <TopSales />
        </div>
        <div className="min-h-[280px]">
          <TransactionTable transactions={transactions} itemsPerPage={8} />
        </div>
      </div>


      {/* Purchase Requests */}
      <div className="bg-white p-6 rounded-xl drop-shadow-lg mt-6 flex flex-col">
        <PurchaseRequestTable
          requests={purchaseRequests}
          itemsPerPage={3}
        />
      </div>
    </div>

  )
}