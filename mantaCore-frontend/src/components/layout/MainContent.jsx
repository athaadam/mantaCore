'use client';

import { useSidebar } from '@/hooks/context/SidebarContext';

export default function MainContent({ children }) {
  const { getSidebarWidth, getTopBarHeight, isMobile, isTablet, isOpen, setIsOpen } = useSidebar();

  const sidebarWidth = getSidebarWidth();
  const topBarHeight = getTopBarHeight();
  
  // Calculate left margin and width based on device and sidebar state
  const getLeftMargin = () => {
    if (isMobile) return 0;
    return isOpen ? `${sidebarWidth}px` : '0';
  };
  
  const getContentWidth = () => {
    if (isMobile) return '100%';
    return isOpen ? `calc(100% - ${sidebarWidth}px)` : '100%';
  };

  return (
    <div 
      className="transition-all duration-300 ease-in-out"
      style={{
        marginLeft: getLeftMargin(),
        marginTop: `${topBarHeight}px`,
        width: getContentWidth(),
        minHeight: `calc(100vh - ${topBarHeight}px)`
      }}
    >
      {/* Overlay hanya untuk mobile ketika sidebar terbuka */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-purple-950/50 backdrop-blur-sm z-30"
          style={{ top: `${topBarHeight}px` }}
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="w-full h-full overflow-y-auto p-3 sm:p-4 md:p-6">
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
