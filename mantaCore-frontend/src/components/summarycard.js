import Image from 'next/image';

export default function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white flex items-center gap-4 p-6 w-full h-[120px] shadow rounded-xl">
      <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#f3f0ff] rounded">
        <Image src={icon} alt={title} width={60} height={60} className="object-contain" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-lg text-gray-800 font-medium mb-1">{title}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
