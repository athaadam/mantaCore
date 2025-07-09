import Sidebar from "@/components/common/Sidebar";
import { SidebarProvider } from "@/hooks/context/SidebarContext";
import MainContent from "@/components/layout/MainContent";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </main>
    </SidebarProvider>
  );
}
