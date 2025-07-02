import { getStatusColor } from '@/utils/statuscolor';

export default function PurchaseTable({ data }) {
    return (
        <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Invoice ID</th>
                        <th className="px-4 py-3">Suitor</th>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Customer ID</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="border-t text-sm">
                            <td className="px-4 py-3">{item.date}</td>
                            <td className="px-4 py-3">{item.invoiceId}</td>
                            <td className="px-4 py-3">{item.suitor}</td>
                            <td className="px-4 py-3">{item.item}</td>
                            <td className="px-4 py-3">{item.customerId}</td>
                            <td className="px-4 py-3">Rp {item.amount.toLocaleString('id-ID')}</td>
                            <td className="px-4 py-3">
                                <span className={`${getStatusColor(item.status)} text-white text-sm font-semibold px-4 py-1 rounded-full`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <a href="#" className="text-[#6A5ACD] hover:underline">
                                    View Detail
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
