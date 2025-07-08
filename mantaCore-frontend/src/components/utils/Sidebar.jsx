'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/context/RoleContext';
import Cookies from 'js-cookie';
import { logout } from '@/libs/api/auth';

const NAV_ITEMS = [
  { name: 'Dashboard', path: 'dashboard', roles: ['admin', 'manager', 'cashier'] },
  { name: 'Invoice', path: 'invoice', roles: ['admin', 'manager', 'cashier'] },
  { name: 'Sales Report', path: 'sales-report', roles: ['admin', 'manager'] },
  { name: 'Purchase Request', path: 'purchase-request' },
  { name: 'Purchase Approval', path: 'purchase-approval' },
  { name: 'Inventory', path: 'inventory' },
  { name: 'Customer', path: 'customer' },
  { name: 'Account Management', path: 'account-management' },
  { name: 'Profile', path: 'profile' },
  { name: 'Logout', path: null },
];

const iconMap = {
  'Dashboard': 'dashboard',
  'Sales Report': 'bar_chart',
  'Invoice': 'receipt',
  'Purchase Approval': 'assignment_turned_in',
  'Purchase Request': 'request_quote',
  'Inventory': 'inventory_2',
  'Account Management': 'supervisor_account',
  'Profile': 'person',
  'Logout': 'logout',
  'Customer': 'people',
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
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-[280px] bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/10 text-white flex-col shadow-2xl z-40 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-purple-500 to-blue-600 blur-3xl transform -rotate-12"></div>
        <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-tl from-indigo-500 to-purple-600 blur-3xl transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-6 py-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur-lg opacity-50"></div>
              <Image
                src="/assets/common/logo.png"
                alt="MantaCore"
                width={160}
                height={42}
                priority
                className="relative z-10 rounded-xl shadow-2xl"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/80">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="relative z-10 flex-1 px-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 scroll-smooth">
        <style jsx>{`
          nav::-webkit-scrollbar {
            width: 6px;
          }
          nav::-webkit-scrollbar-track {
            background: transparent;
          }
          nav::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          nav::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}</style>
        <div className="space-y-2 pb-4 min-h-full">
          <div className="px-4 py-2 text-xs font-bold text-white/60 uppercase tracking-wider">
            Navigation
          </div>

          {NAV_ITEMS.map(({ name, path }) => {
            const href = path ? `/${role}/${path}` : null;
            const isActive = href && pathname.startsWith(href);

            const baseClasses = "group relative flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 overflow-hidden";

            const activeClasses = isActive
              ? "bg-gradient-to-r from-white/20 to-white/10 border border-white/20 shadow-xl backdrop-blur-lg text-white transform scale-105"
              : "hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:backdrop-blur-lg hover:transform hover:scale-102 text-white/80 hover:text-white border border-transparent";

            const itemClasses = `${baseClasses} ${activeClasses}`;

            if (!path) {
              return (
                <div key={name}>
                  <button
                    onClick={handleLogout}
                    className={`${itemClasses} w-full text-left cursor-pointer hover:bg-red-500/20 hover:border-red-500/30`}
                  >
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon Container */}
                    <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg'
                        : 'bg-white/10 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-red-600 group-hover:shadow-lg'
                      }`}>
                      <span className="material-icons-outlined text-lg">{iconMap[name]}</span>
                    </div>

                    {/* Text */}
                    <span className="relative z-10 font-semibold">{name}</span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    )}
                  </button>
                </div>
              );
            }

            return (
              <div key={name}>
                <Link href={href} className={itemClasses}>
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon Container */}
                  <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg'
                      : 'bg-white/10 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-600 group-hover:shadow-lg'
                    }`}>
                    <span className="material-icons-outlined text-lg">{iconMap[name]}</span>
                  </div>

                  {/* Text */}
                  <span className="relative z-10 font-semibold">{name}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="relative z-10 px-6 py-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-3 border border-white/10">
          <div className="text-center">
            <div className="text-xs text-white/60 font-medium mb-1">
              &copy; {new Date().getFullYear()} MantaCore
            </div>
            <div className="text-xs text-white/40 mb-2">
              All rights reserved
            </div>

            {/* Version Badge */}
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/70 font-medium">v2.0.1</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
