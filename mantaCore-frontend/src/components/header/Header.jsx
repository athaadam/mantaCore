'use client';

import { useEffect, useState } from 'react';

export default function Header({ mode = "dashboard", data = null, icon, title, subtitle, badgeText }) {
    const [clientTime, setClientTime] = useState('');

    useEffect(() => {
        const now = new Date();
        setClientTime(now.toLocaleTimeString());
    }, []);

    return (
        <div className="relative w-full px-8 py-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 overflow-hidden mb-8">
            {/* Backgrounds ... */}

            <div className="relative z-10 w-full px-4">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl">
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-5xl font-extrabold text-white mb-3">{title}</h1>
                            <p className="text-blue-100 text-xl font-medium">{subtitle}</p>
                        </div>
                    </div>
                    
                </div>

                {badgeText && (
                    <div className="flex items-center gap-3 text-white/90">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            <span className="text-sm font-semibold">{badgeText}</span>
                        </div>
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        <span className="text-sm">{clientTime && `Last updated: ${clientTime}`}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
