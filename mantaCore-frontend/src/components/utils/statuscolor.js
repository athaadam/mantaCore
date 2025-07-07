export const getStatusColor = (status) => {
    const map = {
        accepted: 'bg-green-500 text-white',
        approved: 'bg-green-400 text-white',
        pending: 'bg-yellow-500 text-black',
        declined: 'bg-red-500 text-white',
        rejected: 'bg-red-600 text-white',
        admin: 'bg-blue-500 text-white',
        cashier: 'bg-purple-500 text-white',
        management: 'bg-teal-500 text-white',
        active: 'bg-green-600 text-white',
        inactive: 'bg-gray-500 text-white',
    };

    if (!status || typeof status !== 'string') return 'bg-gray-300 text-black';

    return map[status.toLowerCase()] || 'bg-gray-300 text-black';
};
