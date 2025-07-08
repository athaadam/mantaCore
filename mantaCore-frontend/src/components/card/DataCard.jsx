'use client';

export default function DataCard({ title, subtitle, icon, children, gradient }) {
    return (
        <div className={`group relative ${gradient} p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden hover:scale-[1.02]`}>
            {/* Card Header */}
            <div className="relative z-10 flex items-center gap-4 mb-6">
                {icon && (
                    <div className="p-3 bg-gradient-to-br from-slate-200 to-slate-100 rounded-xl shadow-lg">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm">{subtitle}</p>
                </div>
            </div>
            {/* Card Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
