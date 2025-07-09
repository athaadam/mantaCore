import { NextResponse } from 'next/server'

export async function POST(req) {
    const { username, password } = await req.json()

    const res = await fetch(`${process.env.BASE_URL_BACKEND}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(data, { status: res.status })
    }

    const response = NextResponse.json({ user: data.user }, { status: 200 })

    response.cookies.set('auth', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24, 
        path: '/',
    })

    return response
}
