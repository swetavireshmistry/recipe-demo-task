"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const verifyToken = async () => {
      // Check if we have a token
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('User verification failed');
          }
          setIsAuthenticated(true);

          // If the user is on the login page and authenticated, redirect to the previous route
          if (pathname === '/login') {
            router.push('/');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // If the token verification fails, force redirect to login
          router.push("/login");
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/login');
        setLoading(false);
      }
    };

    verifyToken();
  }, [pathname, router]);

  return { isAuthenticated, loading };
};

export default useAuth;
