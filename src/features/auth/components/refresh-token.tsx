"use client";

import React, { useEffect, useRef } from "react";
import { refreshToken } from "../api/auth-api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function RefreshToken({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { setIsInitialized, setAccessToken } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    const restoreToken = async () => {
      hasRun.current = true;
      try {
        const data = await refreshToken();
        useAuthStore.getState().setAccessToken(data.accessToken);
        console.log(data, "refresh token");
      } catch (error) {
        console.log("Token refresh failed - clearing stored token", error);
        setAccessToken(null);
      }

      setIsInitialized(true);
    };

    restoreToken();
  }, []);

  return <>{children}</>;
}
