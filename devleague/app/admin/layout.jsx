import { AdminAuthProvider } from '@/app/admin/contexts/AdminAuthContext';

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <main className="">
        {/* <Navbar /> */}
        {children}
      </main>
    </AdminAuthProvider>
  );
}
