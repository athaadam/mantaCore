'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/context/RoleContext';
import Cookies from 'js-cookie';
import { logout } from '@/libs/api/auth';

const NAV_ITEMS = [
  { name: 'Dashboard', path: 'dashboard' },
  { name: 'Sales Report', path: 'sales-report' },
  { name: 'Purchase Approval', path: 'purchase-approval' },
  { name: 'Inventory', path: 'inventory' },
  { name: 'Account Management', path: 'account-management' },
  { name: 'Profile', path: 'profile' },
  { name: 'Logout', path: null },
];

const iconMap = {
  'Dashboard': 'dashboard',
  'Sales Report': 'bar_chart',
  'Purchase Approval': 'assignment_turned_in',
  'Inventory': 'inventory_2',
  'Account Management': 'supervisor_account',
  'Profile': 'person',
  'Logout': 'logout',
};


export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useParams();
  const router = useRouter();
  const { setRole } = useRole();

  const handleLogout = async () => {
    const token = Cookies.get('auth');
    try {
      await logout(token);
      Cookies.remove('auth');
      setRole('');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-[260px] bg-gradient-to-b from-[#6a4cff] to-[#443194] text-white flex-col py-8 px-2 shadow-xl z-40">
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/logo.png"
          alt="MantaCore"
          width={170}
          height={44}
          priority
          className="rounded-lg shadow-md"
          style={{ width: 'auto', height: 'auto' }} // ✅ tambahkan width juga
        />
      </div>
      <nav>
        <ul className="space-y-2">
          {NAV_ITEMS.map(({ name, path }) => {
            const href = path ? `/${role}/${path}` : null;
            const isActive = href && pathname.startsWith(href);

            const itemClasses = `flex items-center gap-3 px-5 py-3 rounded-lg text-base transition-all duration-150 ${isActive ? 'bg-white/20 font-bold shadow-inner' : 'hover:bg-white/10 hover:pl-7'
              }`;

            if (!path) {
              return (
                <li key={name}>
                  <button
                    onClick={handleLogout}
                    className={`${itemClasses} w-full text-left cursor-pointer`}
                  >
                    <span className="material-icons-outlined text-lg">{iconMap[name]}</span>
                    {name}
                  </button>
                </li>
              );
            }

            return (
              <li key={name}>
                <Link href={href} className={itemClasses}>
                  <span className="material-icons-outlined text-lg">{iconMap[name]}</span>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex-1" />
      <div className="px-6 py-4 text-xs text-white/60 text-center">
        &copy; {new Date().getFullYear()} MantaCore. All rights reserved.
      </div>
    </aside>
  );
}
