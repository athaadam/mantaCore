'use client';

const Header2 = ({
    icon,
    title,
    description,
    companyName,
    onAdd,
    colorScheme = 'purple' // Default to purple, but allow customization
}) => {
    // Define color schemes
    const colorSchemes = {
        purple: {
            gradient: 'from-purple-600 via-purple-500 to-indigo-600',
            border: 'border-purple-100',
            buttonText: 'text-purple-600',
            buttonHover: 'hover:bg-purple-50',
            descriptionText: 'text-purple-100'
        },
        orange: {
            gradient: 'from-orange-600 via-orange-500 to-amber-600',
            border: 'border-orange-100',
            buttonText: 'text-orange-600',
            buttonHover: 'hover:bg-orange-50',
            descriptionText: 'text-orange-100'
        },
        blue: {
            gradient: 'from-blue-600 via-blue-500 to-indigo-600',
            border: 'border-blue-100',
            buttonText: 'text-blue-600',
            buttonHover: 'hover:bg-blue-50',
            descriptionText: 'text-blue-100'
        }
    };

    const colors = colorSchemes[colorScheme] || colorSchemes.purple;

    return (
        <div className={`bg-white rounded-2xl shadow-lg border ${colors.border} mb-8 overflow-hidden`}>
            <div className={`bg-gradient-to-r ${colors.gradient} px-8 py-6`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            {icon ? (
                                icon
                            ) : (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v6m0 0h-6m6 0l-6-6" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white drop-shadow-sm">{title}</h1>
                            <p className={`${colors.descriptionText} text-sm mt-1`}>
                                {description} <span className="font-semibold text-white">{companyName}</span>
                            </p>
                        </div>
                    </div>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className={`flex items-center gap-2 px-6 py-3 bg-white ${colors.buttonText} font-semibold rounded-xl shadow-lg ${colors.buttonHover} hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 group`}
                        >
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header2;
