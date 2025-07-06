import TopSales from '@/components/chart/TopSales'
import SummaryCards from '@/components/table/SummaryCards';
import TransactionTable from '@/components/table/TransactionTable';
import PurchaseTable from '@/components/table/PurchaseTable';


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
      date: '2025-07-05',
      title: 'Permintaan Laptop',
      author: 'Admin B',
      amount: 5500000,
      status: 'Approved',
    },
    {
      date: '2025-07-06',
      title: 'Permintaan Printer',
      author: 'Admin C',
      amount: 2500000,
      status: 'Pending',
    },
    {
      date: '2025-07-07',
      title: 'Permintaan Meja',
      author: 'Admin D',
      amount: 1200000,
      status: 'Rejected',
    },
    {
      date: '2025-07-08',
      title: 'Permintaan Kursi',
      author: 'Admin E',
      amount: 800000,
      status: 'Approved',
    },
    {
      date: '2025-07-09',
      title: 'Permintaan Proyektor',
      author: 'Admin F',
      amount: 3500000,
      status: 'Pending',
    },
    {
      date: '2025-07-10',
      title: 'Permintaan AC',
      author: 'Admin G',
      amount: 4500000,
      status: 'Approved',
    },
    {
      date: '2025-07-11',
      title: 'Permintaan Kamera',
      author: 'Admin H',
      amount: 3000000,
      status: 'Rejected',
    },
    {
      date: '2025-07-12',
      title: 'Permintaan Monitor',
      author: 'Admin I',
      amount: 2000000,
      status: 'Approved',
    },
    {
      date: '2025-07-13',
      title: 'Permintaan Keyboard',
      author: 'Admin J',
      amount: 400000,
      status: 'Pending',
    },
    {
      date: '2025-07-14',
      title: 'Permintaan Mouse',
      author: 'Admin K',
      amount: 250000,
      status: 'Approved',
    },
    {
      date: '2025-07-15',
      title: 'Permintaan Scanner',
      author: 'Admin L',
      amount: 1800000,
      status: 'Rejected',
    },
    {
      date: '2025-07-16',
      title: 'Permintaan Speaker',
      author: 'Admin M',
      amount: 600000,
      status: 'Approved',
    },
    {
      date: '2025-07-17',
      title: 'Permintaan Harddisk',
      author: 'Admin N',
      amount: 950000,
      status: 'Pending',
    },
    {
      date: '2025-07-18',
      title: 'Permintaan UPS',
      author: 'Admin O',
      amount: 1200000,
      status: 'Approved',
    },
    {
      date: '2025-07-19',
      title: 'Permintaan Kabel LAN',
      author: 'Admin P',
      amount: 150000,
      status: 'Approved',
    },
  ];


  return (
    <div className="flex-1 px-6 py-8 bg-white overflow-y-auto mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 drop-shadow-lg mb-8 w-full">
        <SummaryCards
          data={summaryData}
          only={['totalSales', 'todayPnL', 'lifetimePnL']}
        />
      </div>

      {/* Charts & Transactions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6 drop-shadow-lg items-stretch">
        <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
          <TopSales />
        </div>
        <div className="rounded-xl flex-[1.2] min-w-[400px] min-h-[280px] flex flex-col flex-shrink-0">
          <TransactionTable transactions={transactions} itemsPerPage={5} />
        </div>
      </div>

      {/* Purchase Requests */}
      <PurchaseTable data={purchaseRequests} itemsPerPage={5} mode="request" />
    </div>
  )
}