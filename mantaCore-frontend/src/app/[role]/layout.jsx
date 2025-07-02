import Sidebar from "@/components/global/Sidebar";

export default function MainLayout({ children }) {
  return (
    <main>
      <Sidebar />
      <div className="ml-[240px] flex-1 px-6 py-8 bg-white min-h-screen overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
