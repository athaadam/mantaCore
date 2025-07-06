export async function apiRequest({ endpoint, method = 'GET', body = null, token = null }) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        cache: 'no-store',
    })

    const text = await res.text()
    let data

    try {
        data = JSON.parse(text)
    } catch {
        throw new Error('Response is not valid JSON')
    }

    if (!res.ok) {
        const errors = data?.errors
        if (errors) {
            const errorList = Object.values(errors).flat().join('\n')
            throw new Error(errorList)
        } else {
            throw new Error(data.message || 'Request failed')
        }
    }

    return data
}
