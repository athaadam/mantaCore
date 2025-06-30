'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useRole } from '@/context/rolecontext'
import Cookies from 'js-cookie' 

const NAV_ITEMS = [
  { name: 'Dashboard', path: 'dashboard' },
  { name: 'Sales Report', path: 'sales' },
  { name: 'Purchase Approval', path: 'purchase-approval' },
  { name: 'Inventory', path: 'inventory' },
  { name: 'Account Management', path: 'account-management' },
  { name: 'Profile', path: 'profile' },
  { name: 'Logout', path: null },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { role } = useParams()
  const router = useRouter()
  const { setRole } = useRole() // ✅ ambil context role

  const handleLogout = async () => {
    const token = Cookies.get('auth')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.remove('auth')
        setRole('')

        router.push('/')
      } else {
        alert(data.message || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('Logout failed due to network/server error.')
    }
  }

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-[240px] bg-[#5f45c3] text-white flex-col py-6 z-40">
      <div className="flex items-center justify-center px-5 mb-6">
        <Image src="/logo.png" alt="MantaCore" width={160} height={40} />
      </div>

      <nav>
        <ul className="space-y-2 px-4">
          {NAV_ITEMS.map(({ name, path }) => {
            const href = path ? `/${role}/${path}` : null
            const isActive = href && pathname === href

            if (name === 'Logout') {
              return (
                <li key={name}>
                  <button
                    onClick={handleLogout}
                    className={`block w-full px-4 py-3 rounded-r-full text-base text-left transition-colors ${isActive ? 'bg-[#443194] font-semibold' : 'hover:bg-white/20'
                      } cursor-pointer`}
                  >
                    {name}
                  </button>
                </li>
              )
            }

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-3 rounded-r-full text-base transition-colors ${isActive ? 'bg-[#443194] font-semibold' : 'hover:bg-white/20'
                    }`}
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
