import { handleApiError } from "../exceptions";

export async function apiRequest({ endpoint, token, method = 'GET', body = null, skipAuth = false }) {
    const baseUrl = typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL
        : '';

    const res = await fetch(`${baseUrl}/api/proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, method, body, skipAuth, token }),
        cache: 'no-store',
    });

    const data = await res.json().catch(() => {
        throw new Error('Response is not valid JSON');
    });

    if (!res.ok) {
        handleApiError(data);
    }

    return data;
}
