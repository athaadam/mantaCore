'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check device size and set responsive states
  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint
      setIsTablet(width >= 640 && width < 1024); // md to lg breakpoint
      
      // Auto-collapse on tablet
      if (width >= 640 && width < 1024) {
        setIsCollapsed(true);
        setIsOpen(true);
      } 
      // Full open on desktop
      else if (width >= 1024) {
        setIsOpen(true);
        setIsCollapsed(false);
      }
      // Closed by default on mobile
      else {
        setIsOpen(false);
      }
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Fungsi untuk mobile: membuka/menutup sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Fungsi untuk tablet & desktop: mengubah ukuran sidebar (collapse/expand)
  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const getSidebarWidth = () => {
    if (!isOpen) return 0;
    if (isMobile) return 280; // Full width on mobile
    if (isTablet) return isCollapsed ? 70 : 240; // Smaller on tablet
    return isCollapsed ? 80 : 280; // Default for desktop
  };

  const getTopBarHeight = () => {
    return 64; // 16 * 4 = 64px
  };

  const value = {
    isOpen,
    isCollapsed,
    isMobile,
    isTablet,
    toggleSidebar,
    toggleCollapse,
    getSidebarWidth,
    getTopBarHeight,
    setIsOpen,
    setIsCollapsed
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
