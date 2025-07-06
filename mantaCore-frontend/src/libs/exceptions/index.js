export function extractErrorMessage(error, fallback = 'Something went wrong') {
    if (!error || typeof error.message !== 'string') return fallback;

    const lines = error.message.split('\n').map(line => line.trim()).filter(Boolean);
    return lines.length > 0 ? lines[0] : fallback;
}
