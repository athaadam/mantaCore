export default function QuickActions({ actions = [] }) {
    return (
        <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-3">
                {actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className={`w-4 h-4 text-${action.color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.path} />
                        </svg>
                        <span>{action.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
