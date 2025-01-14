// src/app/(pages)/(dashboard)/admin/dashboard/utils/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { api } from './api';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function AuthGuardedComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuthentication = async () => {
        // Check if token exists
        const token = Cookies.get('jwt');
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        // Validate token
        try {
          // Use existing API method to check authentication
          const isAuthenticated = await api.checkAuth();
          
          if (!isAuthenticated) {
            // Clear invalid token
            Cookies.remove('jwt');
            router.replace('/admin/login');
          }
        } catch (error) {
          // If token validation fails
          Cookies.remove('jwt');
          router.replace('/admin/login');
        }
      };

      checkAuthentication();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}