'use client';

export function Action({ role }) {
    return (
        <>
            <button
                type="button"
                className="w-1/2 bg-gradient-to-r text-black py-3 font-semibold rounded-2xl shadow-lg transition-all duration-200 cursor-pointer bg-gray-300 hover:bg-gray-400"
                onClick={() => window.history.back()}
            >
                Back
            </button>
            <button
                type="button"
                className="w-1/2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 font-semibold rounded-2xl shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200 cursor-pointer"
                onClick={() => window.location.href = `/${role}/profile/edit-account`}
            >
                Edit Account
            </button>
        </>
    );
}