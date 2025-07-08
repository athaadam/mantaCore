import Sidebar from "@/components/utils/Sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 ml-[280px] min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
