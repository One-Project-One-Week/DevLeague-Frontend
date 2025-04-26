'use client';

import { adminApi, userApi } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await userApi.get('auth/me', {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        setUser(res.data.data);
        router.push('/hackathon');
      } else {
        router.push('/user/auth/login');
      }
    })();
  }, []);
  const logout = async function () {
    try {
      const response = await adminApi.post('auth/logout');
      if (response.status !== 200) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsAuthenticated(false);
    router.push('/');
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
