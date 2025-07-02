export const getStatusColor = (status) => {
    const map = {
        Approved: 'bg-green-500 text-white',
        Pending: 'bg-yellow-500 text-black',
        Declined: 'bg-red-500 text-white',
    };
    return map[status] || 'bg-gray-300 text-black';
};
