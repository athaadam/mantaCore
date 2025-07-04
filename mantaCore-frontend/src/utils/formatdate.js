export function formatDate(dateStr) {
    const date = new Date(dateStr);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return date.toLocaleDateString('en-GB', options).replace(',', ' •');
}
