export default function PageBreadcrumb({ items = [] }) {
    return (
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index !== 0 && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                    <span className={index === items.length - 1 ? 'text-slate-900 font-medium' : ''}>
                        {item}
                    </span>
                </div>
            ))}
        </nav>
    );
}
