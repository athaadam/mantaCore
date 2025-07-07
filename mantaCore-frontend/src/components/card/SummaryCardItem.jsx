'use client';

import Image from 'next/image';
import { formatRupiah } from '../utils/formatRupiah';

export default function SummaryCardItem({ title, icon, value, isCurrency }) {
    const displayValue = isCurrency
        ? formatRupiah(value ?? 0)
        : Number(value ?? 0).toLocaleString();

    return (
        <div className="bg-white flex items-center gap-4 p-6 h-[120px] shadow rounded-xl">
            <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#f3f0ff] rounded">
                <Image src={icon} alt={title} width={40} height={40} className="object-contain" />
            </div>
            <div className="flex flex-col justify-center">
                <div className="text-sm text-gray-500 mb-1">{title}</div>
                <div className="text-xl font-bold text-gray-900">{displayValue}</div>
            </div>
        </div>
    );
}
