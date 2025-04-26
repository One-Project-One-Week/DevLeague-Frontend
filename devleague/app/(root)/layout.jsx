'use client';
import Navbar from '@/components/navbar';
import { useAuth } from '../contexts/AuthContext';

export default function HomeLayout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <main className=" antialiased bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      {children}
    </main>
  );
}
