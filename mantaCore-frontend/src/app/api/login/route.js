import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json(
                { message: 'Username and password are required' },
                { status: 400 }
            )
        }

        const backendUrl = `${process.env.BASE_URL_BACKEND}/login`
        console.log(`[Login] Calling backend at: ${backendUrl}`)

        const res = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json()
        console.log(`[Login] Backend response:`, { status: res.status, data })

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status })
        }

        // Validate user data
        if (!data.user || !data.token) {
            console.error('[Login] Invalid response structure:', data)
            return NextResponse.json(
                { message: 'Invalid response from backend' },
                { status: 500 }
            )
        }

        // Ensure user has required fields
        if (!data.user.role) {
            console.warn('[Login] User missing role, defaulting to cashier')
            data.user.role = 'cashier'
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
    } catch (error) {
        console.error('[Login] Error:', error)
        return NextResponse.json(
            { message: error.message || 'Login failed' },
            { status: 500 }
        )
    }
}
