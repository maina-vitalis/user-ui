'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { refreshToken } from '../api/auth-api';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function RefreshToken({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const setIsInitialized = useAuthStore((state) => state.setIsInitialized);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const restoreToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log(
          'Token restore failed - user not authenticated / session expired',
          error
        );
        // Only redirect to login if user is in a protected route like /my-account
        if (pathname?.startsWith('/my-account')) {
          router.push('/auth/sign-in');
        }
      } finally {
        setIsInitialized(true);
      }
    };

    restoreToken();
  }, [setIsInitialized, router, pathname]);

  return <>{children}</>;
}
