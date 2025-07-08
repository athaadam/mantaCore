'use client';

export default function StatsCard({ 
    icon, 
    title, 
    value, 
    bgColor = 'bg-blue-100', 
    iconColor = 'text-blue-600' 
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                    </svg>
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="text-sm text-slate-600">{title}</p>
                </div>
            </div>
        </div>
    );
}
