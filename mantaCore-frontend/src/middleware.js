import { NextResponse } from 'next/server'

export async function middleware(request) {
    const token = request.cookies.get('auth')?.value
    const path = request.nextUrl.pathname

    const isRoot = path === '/'
    const isAPI = path.startsWith('/api')
    const roleInPath = path.split('/')[1]

    if (!token && !isRoot && !isAPI) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (token && isRoot) {
        const redirect = await redirectToRoleDashboard(token, request)
        if (redirect) return redirect
    }

    if (token && !isAPI && roleInPath) {
        const redirect = await validateRoleAccess(token, roleInPath, request)
        if (redirect) return redirect
    }

    return NextResponse.next()
}

async function redirectToRoleDashboard(token, request) {
    try {
        const res = await fetch(`${process.env.BASE_URL_BACKEND}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        const data = await res.json()
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
        const res = await fetch(`${process.env.BASE_URL_BACKEND}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        const data = await res.json()
        const role = data.user?.role
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
