import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        )

        // Clear the httpOnly auth cookie
        response.cookies.set('auth', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 0,
            path: '/',
        })

        return response
    } catch (error) {
        console.error('[Logout] Error:', error)
        return NextResponse.json(
            { message: error.message || 'Logout failed' },
            { status: 500 }
        )
    }
}
