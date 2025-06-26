import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
    const roleMatch = path.match(/^\/([^\/]+)/)
    const role = roleMatch ? roleMatch[1] : null

    const allowedRoles = ['admin', 'cashier', 'inventory-manager']
    const auth = request.cookies.get('auth')?.value

    const isProtected = allowedRoles.some((r) => path.startsWith(`/${r}`))

    // // ⛔ Blokir role yang tidak valid
    // if (role && !allowedRoles.includes(role) && path.startsWith(`/${role}/`)) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // // 🔐 Cek login: jika halaman butuh auth tapi user belum login
    // if (!auth && isProtected) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // // 🔁 Kalau user sudah login dan buka /login, redirect ke dashboard
    // if (auth && path === '/') {
    //     return NextResponse.redirect(new URL(`/${auth}/dashboard`, request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
}
