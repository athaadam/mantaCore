'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Sales Report', href: '/admin/sales' },
  { name: 'Purchase Approval', href: '/admin/purchase-approval' },
  { name: 'Inventory', href: '/admin/inventory' },
  { name: 'Account Management', href: '/admin/account-management' },
  { name: 'Profile', href: '/admin/profile' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Toggle Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-white bg-[#5f45c3] fixed top-4 left-4 z-50 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-[#5f45c3] text-white flex-col py-6 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:flex
        `}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex items-center justify-between px-5 mb-6 md:justify-center">
          <Image src="/logo.png" alt="MantaCore" width={160} height={40} />
          <button onClick={toggleSidebar} className="md:hidden text-white text-2xl">
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2 px-4">
            {NAV_LINKS.map(({ name, href }) => {
              const isActive = pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-r-full text-base transition-colors ${isActive
                        ? 'bg-[#443194] font-semibold'
                        : 'hover:bg-white/20'
                      }`}
                    onClick={() => setIsOpen(false)} // auto-close on mobile
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
