'use client';

export default function SectionWrapper({ 
    id,
    title, 
    description, 
    icon, 
    children, 
    headerGradient = "from-violet-50 to-purple-50",
    iconGradient = "from-violet-600 to-purple-600",
    badge = null 
}) {
    return (
        <div id={id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className={`bg-gradient-to-r ${headerGradient} px-6 py-4 border-b border-slate-200`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${iconGradient} rounded-lg flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                        <p className="text-sm text-slate-600">{description}</p>
                    </div>
                    {badge && (
                        <div className="ml-auto">
                            {badge}
                        </div>
                    )}
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
