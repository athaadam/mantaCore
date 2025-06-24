import Image from 'next/image'
import TopSales from '@/components/topsales'

export default function DashboardPage() {
  return (
    <>
      <div className="flex-1 px-6 py-8 bg-white overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="flex justify-center items-start gap-[210px] mb-8 w-full">
          {[
            {
              icon: '/sales.png',
              title: 'Total Sales',
              value: 'Rp400.000.000',
            },
            {
              icon: '/pnl.png',
              title: "Today's Profit & Loss",
              value: '+Rp2.000.000',
            },
            {
              icon: '/pnl.png',
              title: 'Lifetime Profit & Loss',
              value: '+Rp2.000.000',
            },
          ].map(({ icon, title, value }, idx) => (
            <div
              key={idx}
              className="bg-white flex items-center gap-4 p-6 w-[320px] min-h-[90px] shadow rounded"
            >
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#f3f0ff] rounded">
                <Image src={icon} alt={title} width={60} height={60} className="object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-lg text-gray-800 font-medium mb-1">{title}</div>
                <div className="text-xl font-bold text-gray-900">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Transaction */}
        <div className="flex gap-6 flex-wrap mb-6 drop-shadow-lg">
          {/* Sales Chart */}
          <TopSales />

          {/* Transaction Table */}
          <div className="bg-white p-6 rounded-xl shadow flex-[1.2] min-w-[320px] min-h-[280px] flex flex-col">
            <h3 className="text-xl text-gray-800 font-semibold mb-4">Transaction History</h3>
            <table className="w-full border-collapse mt-2 text-base">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 border-b">Date</th>
                  <th className="text-left py-2 px-3 border-b">Item</th>
                  <th className="text-left py-2 px-3 border-b">Author</th>
                  <th className="text-left py-2 px-3 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array(4).fill(null).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-3">April 1, 2025</td>
                    <td>{i === 0 ? 'Tumbler, Spoon' : 'Rice, Carrot, Spoon'}</td>
                    <td>ADM</td>
                    <td>Rp20.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Requests */}
        <div className="bg-white p-6 rounded-xl drop-shadow-lg mt-6 flex flex-col">
          <h3 className="text-xl text-gray-800 font-semibold mb-4">Purchase Request</h3>
          <table className="w-full border-collapse mt-2 text-base">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b">Date</th>
                <th className="text-left py-2 px-3 border-b">Title</th>
                <th className="text-left py-2 px-3 border-b">Author</th>
                <th className="text-left py-2 px-3 border-b">Amount</th>
                <th className="text-left py-2 px-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {['Declined', 'Pending', 'Approved'].map((status, i) => {
                const color =
                  status === 'Approved'
                    ? 'bg-green-500'
                    : status === 'Pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'

                return (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-3">April 1, 2025</td>
                    <td>Pembelian bahan baku duar</td>
                    <td>ADM</td>
                    <td>Rp4.000.000</td>
                    <td>
                      <span className={`${color} text-white text-sm font-semibold px-4 py-1 rounded-full`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}