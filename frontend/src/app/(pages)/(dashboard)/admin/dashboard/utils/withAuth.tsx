// src/app/(pages)/(dashboard)/admin/dashboard/utils/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { api } from './api';
import { ComponentType } from 'react';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
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
          const isAuthenticated = await api.checkAuth();
          
          if (!isAuthenticated) {
            Cookies.remove('jwt');
            router.replace('/admin/login');
          }
        } catch (error) {
          Cookies.remove('jwt');
          router.replace('/admin/login');
        }
      };

      checkAuthentication();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}