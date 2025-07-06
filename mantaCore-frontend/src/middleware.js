import { NextResponse } from 'next/server'
import { getProfile } from './libs/api/auth'

export async function middleware(request) {
    const token = request.cookies.get('auth')?.value
    const path = request.nextUrl.pathname

    const isRoot = path === '/'
    const isAPI = path.startsWith('/api')
    const roleInPath = path.split('/')[1]

    // Tidak punya token & bukan root atau API → redirect ke login
    if (!token && !isRoot && !isAPI) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Punya token & berada di halaman root → redirect ke dashboard
    if (token && isRoot) {
        const redirect = await redirectToRoleDashboard(token, request)
        if (redirect) return redirect
    }

    // Punya token & role di path → validasi akses role
    if (token && !isAPI && roleInPath) {
        const redirect = await validateRoleAccess(token, roleInPath, request)
        if (redirect) return redirect
    }

    return NextResponse.next()
}

async function redirectToRoleDashboard(token, request) {
    try {
        const data = await getProfile(token)
        if (!data || !data.user) throw new Error()
        const role = data.user?.role

        if (!role) throw new Error()
        return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    } catch {
        const res = NextResponse.redirect(new URL('/', request.url))
        res.cookies.delete('auth')
        return res
    }
}

async function validateRoleAccess(token, roleInPath, request) {
    try {
        const data = await getProfile(token)
        const role = data.user?.role
        if (!data || !data.user || !role) throw new Error()
        if (!role || role !== roleInPath) {
            return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
        }
    } catch {
        const res = NextResponse.redirect(new URL('/', request.url))
        res.cookies.delete('auth')
        return res
    }
}

export const config = {
    matcher: [
        '/((?!_next/|.*\\.(?:js|json|ico|png|jpg|jpeg|svg|webmanifest|txt|gif|html|css|js)$).*)',
    ],
}
