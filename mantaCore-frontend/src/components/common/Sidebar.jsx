'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/context/RoleContext';
import { useSidebar } from '@/hooks/context/SidebarContext';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { apiHit } from '@/libs/api/fetch';
import { Slack, UserPen } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: 'dashboard', roles: ['admin', 'management', 'cashier'] },
  { name: 'Sales Report', path: 'sales-report', roles: ['admin', 'management'] },
  { name: 'Purchase Approval', path: 'purchase-approval', roles: ['admin'] },
  { name: 'Invoices', path: 'invoices', roles: ['admin', 'cashier'] },
  { name: 'Purchase Request', path: 'purchase-request', roles: ['admin', 'management'] },
  { name: 'Inventory', path: 'inventory', roles: ['admin', 'management'] },
  { name: 'Customer', path: 'customer', roles: ['admin', 'cashier'] },
  { name: 'Account Management', path: 'account-management', roles: ['admin', 'management'] },
  { name: 'Profile', path: 'profile', roles: ['admin', 'management', 'cashier'] },
];

const iconMap = {
  'Dashboard': 'dashboard',
  'Sales Report': 'bar_chart',
  'Invoices': 'receipt',
  'Purchase Approval': 'assignment_turned_in',
  'Purchase Request': 'request_quote',
  'Inventory': 'inventory_2',
  'Account Management': 'supervisor_account',
  'Profile': 'person',
  'Customer': 'people',
};


export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useParams();
  const router = useRouter();
  const { setRole } = useRole();
  const {
    isOpen,
    isCollapsed,
    isMobile,
    toggleSidebar,
    toggleCollapse,
    setIsOpen
  } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [username, setUsername] = useState('');

  // Close sidebar when clicking outside on mobile only
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('#sidebar') && !event.target.closest('#sidebar-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, setIsOpen]);

  // Close sidebar when route changes on mobile only
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile, setIsOpen]);

  const [time, setTime] = useState(null)

  const getProfile = async () => {
    try {
      const res = await apiHit('user', Cookies.get('auth'));
      setUsername(res.user.username);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUsername('User');
    }
  }

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString())
    }
    getProfile();
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  const handleLogout = async () => {
    try {
      await apiHit('logout', Cookies.get('auth'), 'POST');
      Cookies.remove('auth');
      setRole('');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <>
      {/* Enhanced Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full h-16 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 flex items-center">
          <div className="flex items-center justify-start px-4">
            <button
              id="sidebar-toggle"
              onClick={toggleSidebar}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200 border border-white/20 mr-2"
              aria-label="Toggle sidebar"
            >
              <span className="material-icons-outlined text-xl">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Collapse Button (Desktop Only) - Only show when sidebar is open */}
            {!isMobile && isOpen && (
              <button
                onClick={toggleCollapse}
                className="p-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-white transition-all duration-200 border border-indigo-500/30"
                aria-label="Collapse sidebar"
              >
                <span className="material-icons-outlined text-xl">
                  {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}
                </span>
              </button>
            )}

            {/* Mini Logo in top bar */}
            <div className="ml-2 flex items-center">
              <UserPen className="w-8 h-8 text-white" />
              <span className="ml-2 text-white font-medium text-sm hidden sm:block">{username}</span>
            </div>
          </div>

          {/* Right side content in top bar */}
          <div className="flex-1 flex items-center justify-end px-4 gap-3">
            {/* Time Display */}
            <div className="flex items-center gap-2 text-white/90">
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs border border-white/10">
                {time}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white transition-all duration-200 border border-red-500/30 hover:border-red-500/50 flex items-center gap-2"
              aria-label="Logout"
            >
              <span className="material-icons-outlined text-lg">logout</span>
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Left Minimal Bar - Only show when sidebar is closed */}
      {!isOpen && (
        <div className="fixed top-16 left-0 w-16 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/10 z-40"
          style={{ height: 'calc(100vh - 64px)' }}>
          {/* Minimal indicators when closed */}
          <div className="p-4 flex flex-col items-center gap-4 mt-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Sidebar with Collapsible Feature */}
      <aside
        id="sidebar"
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/10 text-white flex flex-col shadow-2xl z-40 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isCollapsed && !isMobile ? 'w-[70px]' : 'w-[280px]'
          }`}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-purple-500 to-blue-600 blur-3xl transform -rotate-12 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-tl from-indigo-500 to-purple-600 blur-3xl transform rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 animate-ping"></div>
        </div>

        {/* Animated Particle System */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 20px 20px'
          }}></div>
        </div>

        {/* Logo Section - Only Show When Not Collapsed */}
        {!isCollapsed && (
          <div className="relative z-10 px-6 py-5">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                  <Image
                    src="/assets/common/logo.png"
                    alt="MantaCore"
                    width={160}
                    height={42}
                    priority
                    className="relative z-10 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              </div>

              {/* Enhanced Status Indicator */}
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/80">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="font-medium">System Online</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Navigation Section - Positioned higher when collapsed */}
        <nav className={`relative z-10 flex-1 ${isCollapsed ? 'px-2 mt-4' : 'px-4 mt-2'} overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 scroll-smooth`}>
          <style jsx>{`
            nav::-webkit-scrollbar {
              width: 4px;
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
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-in-out;
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>

          <div className="space-y-1.5 pb-4 min-h-full">
            {!isCollapsed && (
              <div className="px-4 py-2 text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <span className="material-icons-outlined text-sm">dashboard</span>
                Navigation
              </div>
            )}

            {/* Show MantaCore logo at top of navigation when collapsed */}
            {isCollapsed && (
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-2xl flex items-center justify-center mb-2">
                  {/* <span className="text-white font-bold text-xl">L</span> */}
                  <Slack className="absolute w-6 h-6 text-white" />
                </div>
              </div>
            )}

            {NAV_ITEMS.filter(item => item.roles.includes(role)).map(({ name, path }, index) => {
              const href = `/${role}/${path}`;
              const isActive = pathname.startsWith(href);

              const baseClasses = `group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`;

              const activeClasses = isActive
                ? "bg-gradient-to-r from-white/25 to-white/15 border border-white/30 shadow-xl backdrop-blur-lg text-white"
                : "hover:bg-white/15 hover:border-white/20 hover:shadow-lg hover:backdrop-blur-lg text-white/80 hover:text-white border border-transparent";

              const itemClasses = `${baseClasses} ${activeClasses}`;

              return (
                <div key={name} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                  <Link
                    href={href}
                    className={itemClasses}
                    onMouseEnter={() => setHoveredItem(name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Subtle Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>

                    {/* Icon Container */}
                    <div className={`relative z-10 p-1.5 rounded-lg transition-all duration-200 ${isCollapsed ? 'mx-auto' : ''
                      } ${isActive
                        ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-md shadow-purple-500/20'
                        : 'bg-white/10 group-hover:bg-gradient-to-br group-hover:from-purple-500/80 group-hover:to-blue-600/80'
                      }`}>
                      <span className="material-icons-outlined">{iconMap[name]}</span>
                    </div>

                    {/* Text with Tooltip for Collapsed */}
                    {!isCollapsed ? (
                      <span className="relative z-10 font-medium">{name}</span>
                    ) : (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800/90 text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                        {name}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45"></div>
                      </div>
                    )}

                    {/* Active Indicator */}
                    {isActive && !isCollapsed && (
                      <div className="absolute right-3 flex items-center">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Enhanced Footer Section */}
        <div className="relative z-10 px-4 py-3">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-center">
              {!isCollapsed ? (
                <>
                  <div className="text-xs text-white/60 font-medium">
                    &copy; {new Date().getFullYear()} MantaCore
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/10">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                      <span className="text-2xs">v2.0.1</span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
