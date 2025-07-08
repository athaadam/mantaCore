'use client';

import Image from 'next/image';
import { formatRupiah } from '../utils/formatRupiah';

export default function SummaryCardItem({ title, icon, value, isCurrency, index = 0 }) {
    const displayValue = isCurrency
        ? formatRupiah(value ?? 0)
        : Number(value ?? 0).toLocaleString('id-ID');

    // Premium gradient colors for each card
    const gradients = [
        'from-violet-500 to-purple-600',
        'from-blue-500 to-indigo-600', 
        'from-emerald-500 to-teal-600',
        'from-amber-500 to-orange-600',
        'from-rose-500 to-pink-600',
        'from-cyan-500 to-blue-600'
    ];

    const cardGradient = gradients[index % gradients.length];

    // Background gradients for glassmorphism effect
    const bgGradients = [
        'from-violet-50/90 via-purple-50/90 to-indigo-50/90',
        'from-blue-50/90 via-indigo-50/90 to-cyan-50/90',
        'from-emerald-50/90 via-teal-50/90 to-cyan-50/90',
        'from-amber-50/90 via-orange-50/90 to-red-50/90',
        'from-rose-50/90 via-pink-50/90 to-purple-50/90',
        'from-cyan-50/90 via-blue-50/90 to-indigo-50/90'
    ];

    const bgGradient = bgGradients[index % bgGradients.length];

    return (
        <div className={`group relative bg-gradient-to-br ${bgGradient} backdrop-blur-lg border border-white/30 flex items-center gap-6 p-6 min-h-[140px] shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-[1.02] cursor-pointer overflow-hidden`}>
            {/* Ultra Premium Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 group-hover:animate-pulse" style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, currentColor 1px, transparent 1px),
                                     radial-gradient(circle at 70% 70%, currentColor 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500"></div>

            {/* Premium Icon Container */}
            <div className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-br ${cardGradient} rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 flex-shrink-0`}>
                {/* Icon Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cardGradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {icon ? (
                    <Image 
                        src={icon} 
                        alt={title} 
                        width={28} 
                        height={28} 
                        className="relative z-10 w-7 h-7 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'block';
                        }}
                    />
                ) : null}
                
                {/* Enhanced Fallback SVG icon */}
                <svg 
                    className="relative z-10 w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ display: icon ? 'none' : 'block' }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>

            {/* Premium Content */}
            <div className="relative z-10 flex flex-col justify-center min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-600 mb-2 tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {title}
                </div>
                <div className="text-3xl font-bold text-slate-900 truncate group-hover:text-slate-800 transition-colors duration-300">
                    {displayValue}
                </div>
                
                {/* Premium Status Indicator */}
                <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                    <span className="text-xs font-medium text-slate-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        Live Data
                    </span>
                </div>
            </div>

            {/* Premium Hover Effect Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
