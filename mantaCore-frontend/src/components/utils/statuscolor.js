export const getStatusColor = (status) => {
    const map = {
        accepted: 'bg-green-500 text-white',
        Pending: 'bg-yellow-500 text-black',
        Declined: 'bg-red-500 text-white',
        Rejected: 'bg-red-600 text-white',
        admin: 'bg-blue-500 text-white',
        cashier: 'bg-purple-500 text-white',
        management: 'bg-teal-500 text-white',
        active: 'bg-green-600 text-white',
        inactive: 'bg-gray-500 text-white',
    };
    return map[status] || 'bg-gray-300 text-black';
};
