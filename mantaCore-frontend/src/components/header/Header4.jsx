export default function Header4({ icon, title, description, stats = [], statusText }) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
                    <p className="text-slate-600 max-w-2xl">{description}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                            {stat.icon}
                            <span className="font-medium text-slate-700">{stat.value}</span>
                            <span className="text-slate-500">{stat.label}</span>
                        </div>
                    </div>
                ))}
                {statusText && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">{statusText}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
