'use client';

import { useSidebar } from '@/hooks/context/SidebarContext';

export default function MainContent({ children }) {
  const { getSidebarWidth, getTopBarHeight, isMobile, isOpen, setIsOpen } = useSidebar();

  const sidebarWidth = getSidebarWidth();
  const topBarHeight = getTopBarHeight();

  return (
    <div 
      className="transition-all duration-300 ease-in-out"
      style={{
        marginLeft: isMobile ? 0 : (isOpen ? `${sidebarWidth}px` : '64px'), // 64px for left bar when closed
        marginTop: `${topBarHeight}px`,
        width: isMobile ? '100%' : `calc(100% - ${isOpen ? sidebarWidth : 64}px)`,
        minHeight: `calc(100vh - ${topBarHeight}px)`
      }}
    >
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          style={{ top: `${topBarHeight}px` }}
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="w-full h-full overflow-y-auto p-4 md:p-6">
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
