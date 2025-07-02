import Cookies from 'js-cookie'

export async function login(username, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    const text = await res.text()
    let data

    try {
        data = JSON.parse(text)
    } catch {
        throw new Error('Response is not valid JSON')
    }

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    Cookies.set('auth', data.token)
    return data.token
}

export async function register(form) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: form.username,
            password: form.password,
            password_confirmation: form.confirmPassword,
            email: form.email,
            company: form.company,
            phone_number: form.phone,
        }),
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
            throw new Error(data.message || 'Registration failed')
        }
    }

    return data
}

export async function logout(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || 'Logout failed')
    }

    return data
}

export async function getProfile(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return await res.json()
}
