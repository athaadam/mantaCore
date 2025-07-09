'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On desktop, sidebar should be open by default
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const getSidebarWidth = () => {
    if (!isOpen) return 0;
    if (isMobile) return 280;
    return isCollapsed ? 80 : 280;
  };

  const getTopBarHeight = () => {
    return 64; // 16 * 4 = 64px
  };

  const value = {
    isOpen,
    isCollapsed,
    isMobile,
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
