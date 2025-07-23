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

// Menu dikelompokkan berdasarkan kategori
const NAV_GROUPS = [
  {
    title: "Dashboard",
    icon: "space_dashboard",
    items: [
      { name: 'Dashboard', path: 'dashboard', roles: ['admin', 'management', 'cashier'] },
    ]
  },
  {
    title: "Sales & Customers",
    icon: "storefront",
    items: [
      { name: 'Sales Report', path: 'sales-report', roles: ['admin', 'management'] },
      { name: 'Invoices', path: 'invoices', roles: ['admin', 'cashier'] },
      { name: 'Customer', path: 'customer', roles: ['admin', 'cashier'] },
    ]
  },
  {
    title: "Inventory & Purchase",
    icon: "inventory",
    items: [
      { name: 'Purchase Approval', path: 'purchase-approval', roles: ['admin'] },
      { name: 'Purchase Request', path: 'purchase-request', roles: ['admin', 'management'] },
      { name: 'Inventory', path: 'inventory', roles: ['admin', 'management'] },
    ]
  },
  {
    title: "User Management",
    icon: "manage_accounts",
    items: [
      { name: 'Account Management', path: 'account-management', roles: ['admin', 'management'] },
      { name: 'Profile', path: 'profile', roles: ['admin', 'management', 'cashier'] },
    ]
  },
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
    isTablet,
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

  const [time, setTime] = useState(null);

  const getProfile = async () => {
    try {
      const res = await apiHit('user', Cookies.get('auth'));
      setUsername(res.user.username);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUsername('User');
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    getProfile();
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

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
      {/* Clean Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full h-16 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-800 shadow-lg border-b border-white/10 transition-all duration-300 flex items-center">
          <div className="flex items-center justify-start px-4">
            <button
              id="sidebar-toggle"
              onClick={isMobile ? toggleSidebar : toggleCollapse}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all duration-200 hover:shadow-md mr-2 flex items-center justify-center"
              aria-label="Toggle sidebar"
              title={isMobile ? "Toggle sidebar" : (isCollapsed ? "Expand sidebar" : "Collapse sidebar")}
            >
              <span className="material-icons-outlined text-lg">
                menu
              </span>
            </button>

            {/* Logo in top bar */}
            <div className="ml-2 flex items-center">
              <UserPen className="w-6 h-6 text-white" />
              <span className="ml-2 text-white font-medium text-sm hidden sm:block">{username || 'User'}</span>
            </div>
          </div>

          {/* Right side content in top bar */}
          <div className="flex-1 flex items-center justify-end px-4 gap-2">
            {/* Time Display */}
            <div className="hidden sm:flex items-center text-white/90">
              <div className="px-3 py-1.5 text-xs">
                {time}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-md text-white transition-all duration-200 hover:shadow-md flex items-center gap-2"
              aria-label="Logout"
            >
              <span className="material-icons-outlined text-lg">logout</span>
              <span className="text-xs font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Left Minimal Bar - Only show when sidebar is closed on desktop/tablet */}
      {!isOpen && !isMobile && (
        <div className="fixed top-16 left-0 w-16 bg-purple-900 border-r border-white/10 z-40"
          style={{ height: 'calc(100vh - 64px)' }}>
          {/* Minimal indicators when closed */}
          <div className="p-4 flex flex-col items-center gap-4 mt-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-8 bg-purple-700 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">MC</span>
            </div>
          </div>
        </div>
      )}

      {/* Clean, Modern Sidebar with Collapsible Feature */}
      <aside
        id="sidebar"
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-purple-900 border-r border-white/10 text-white flex flex-col shadow-lg z-40 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isCollapsed && !isMobile ? 'w-[70px]' : (isTablet ? 'w-[240px]' : 'w-[280px]')
          }`}
      >
        {/* Simple, subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 opacity-90"></div>

        {/* Subtle pattern for depth */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        {/* Clean Logo Section - Only Show When Not Collapsed */}
        {!isCollapsed && (
          <div className="relative z-10 px-4 py-4">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 transition-all duration-200">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/common/logo.png"
                  alt="MantaCore"
                  width={isTablet ? 120 : 160}
                  height={isTablet ? 32 : 42}
                  priority
                  className="rounded-md transition-all duration-200"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>

              {/* Simple Status Indicator */}
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-white/80">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="font-medium">System Online</span>
              </div>
            </div>
          </div>
        )}

        {/* Clean Navigation Section */}
        <nav className={`relative z-10 flex-1 ${isCollapsed ? 'px-2 mt-3' : 'px-3 mt-2'} overflow-y-auto overflow-x-hidden`}>
          <style jsx>{`
            nav::-webkit-scrollbar {
              width: 3px;
            }
            nav::-webkit-scrollbar-track {
              background: transparent;
            }
            nav::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            nav::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }
            .animate-fadeIn {
              animation: fadeIn 0.2s ease-in-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="space-y-2 pb-4 min-h-full">
            {/* Simple brand icon when collapsed */}
            {isCollapsed && (
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8 bg-purple-700 rounded-md flex items-center justify-center">
                  <Slack className="w-5 h-5 text-white" />
                </div>
              </div>
            )}

            {/* Menu groups */}
            {NAV_GROUPS.map((group, groupIndex) => {
              // Filter items based on user role
              const groupItems = group.items.filter(item => item.roles.includes(role));

              // Skip groups with no accessible items
              if (groupItems.length === 0) return null;

              return (
                <div key={`group-${groupIndex}`} className="animate-fadeIn mb-2">
                  {/* Group Header - Only shown when not collapsed */}
                  {!isCollapsed && (
                    <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2 border-b border-white/5 mb-1">
                      <span className="material-icons-outlined text-xs">{group.icon}</span>
                      <span>{group.title}</span>
                    </div>
                  )}

                  {/* Group Divider when collapsed */}
                  {isCollapsed && groupIndex > 0 && (
                    <div className="mx-2 my-3 border-t border-white/10"></div>
                  )}

                  {/* Group items */}
                  <div className="space-y-1 pl-1">
                    {groupItems.map(({ name, path }, index) => {
                      const href = `/${role}/${path}`;
                      const isActive = pathname.startsWith(href);

                      // Classes setup
                      const baseClasses = `group relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`;

                      const activeClasses = isActive
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-purple-800/50";

                      const itemClasses = `${baseClasses} ${activeClasses}`;

                      return (
                        <div key={name} className="animate-fadeIn" style={{ animationDelay: `${index * 0.03}s` }}>
                          <Link
                            href={href}
                            className={itemClasses}
                            onMouseEnter={() => setHoveredItem(name)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {/* Icon Container - Simpler design */}
                            <div className={`flex items-center justify-center text-lg ${isCollapsed ? 'mx-auto' : ''}`}>
                              <span className="material-icons-outlined text-sm">{iconMap[name]}</span>
                            </div>

                            {/* Text with Tooltip for Collapsed */}
                            {!isCollapsed ? (
                              <span className="font-medium truncate">{name}</span>
                            ) : (
                              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                                {name}
                                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-700 rotate-45"></div>
                              </div>
                            )}

                            {/* Active Indicator - only show when not active and hovered */}
                            {!isActive && !isCollapsed && (
                              <span className="absolute right-2 flex h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                              </span>
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Simplified Footer Section */}
        <div className="relative z-10 px-3 py-2 mt-auto">
          <div className="border-t border-white/10 pt-2">
            <div className="text-center">
              {!isCollapsed ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="text-xs text-white/60">
                    &copy; {new Date().getFullYear()} MantaCore
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                      <span>v2.0.1</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
