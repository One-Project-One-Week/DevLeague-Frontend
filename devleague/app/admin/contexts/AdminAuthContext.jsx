'use client';

import { adminApi } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = function ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await adminApi.get('admin/me', {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        router.push('/admin/dashboard/hackathon');
      } else {
        router.push('/admin');
      }
    })();
  }, []);
  const logout = async function () {
    try {
      const response = await adminApi.post('admin/logout');
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsAuthenticated(false);
    router.push('/admin');
  };
  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
