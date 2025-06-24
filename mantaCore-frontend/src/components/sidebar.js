'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Sales Report', href: '/admin/sales' },
    { name: 'Purchase Approval', href: '/admin/purchase' },
    { name: 'Inventory', href: '/admin/inventory' },
    { name: 'Account Management', href: '/admin/accounts' },
    { name: 'Profile', href: '/admin/profile' },
  ]

  return (
    <div className="w-[240px] bg-[#5f45c3] text-white flex flex-col py-5 px-0 min-h-screen flex-shrink-0 fixed">
      <div className="flex items-center gap-2 mb-8 px-5">
        <Image src="/logo.png" alt="MantaCore" width={200} height={60} />
      </div>
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-5 py-3 rounded-r-full text-lg transition-all ${
                  isActive
                    ? 'bg-[#443194] font-semibold'
                    : 'hover:bg-white/20'
                }`}
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
