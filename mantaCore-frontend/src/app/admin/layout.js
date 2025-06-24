import Sidebar from "@/components/sidebar";

export const metadata = {
  title: {
    default: 'Admin Panel',
    template: '%s | Admin Panel',
  },
  description: 'Panel admin untuk mengelola data.',
};

export default function AdminLayout({ children }) {
  return (
    <main className="admin-layout flex min-h-screen">
      <Sidebar />
      <div className="ml-[240px] flex-1 px-6 py-8 bg-white min-h-screen overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
