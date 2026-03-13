"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, isInitialized } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;

    if (!accessToken) {
      router.replace(`/auth/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      setIsReady(true);
    }
  }, [isInitialized, accessToken, router, pathname]);

  if (!isInitialized || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background/50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
