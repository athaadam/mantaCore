export const getStatusColor = (status) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-500';
        case 'Pending':
            return 'bg-yellow-500';
        case 'Declined':
            return 'bg-red-500';
        default:
            return 'bg-gray-300';
    }
};
