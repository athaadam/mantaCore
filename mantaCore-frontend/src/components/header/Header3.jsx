'use client';

const Header3 = ({
    icon,
    title,
    subtitle,
    colorScheme = 'purple' // Default to purple, but allow customization
}) => {
    // Define color schemes
    const colorSchemes = {
        purple: {
            iconGradient: 'from-purple-600 to-indigo-600',
            titleGradient: 'from-purple-600 via-purple-800 to-indigo-800'
        },
        orange: {
            iconGradient: 'from-orange-600 to-amber-600',
            titleGradient: 'from-orange-600 via-orange-800 to-amber-800'
        },
        blue: {
            iconGradient: 'from-blue-600 to-indigo-600',
            titleGradient: 'from-blue-600 via-blue-800 to-indigo-800'
        }
    };

    const colors = colorSchemes[colorScheme] || colorSchemes.purple;

    return (
        <div className="text-center mb-12">
            {/* Icon Container */}
            <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${colors.iconGradient} rounded-2xl shadow-lg mb-6`}>
                {icon ? (
                    icon
                ) : (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v6m0 0h-6m6 0l-6-6" />
                    </svg>
                )}
            </div>

            {/* Title */}
            <h1 className={`text-5xl font-extrabold bg-gradient-to-r ${colors.titleGradient} bg-clip-text text-transparent mb-4 tracking-tight`}>
                {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
            </p>

            {/* Line Decoration */}
            <div className="mt-6 flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
            </div>
        </div>
    );
};

export default Header3;
