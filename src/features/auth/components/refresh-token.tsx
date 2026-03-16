"use client";

import React, { useEffect, useRef } from "react";
import { getMe } from "../api/auth-api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function RefreshToken({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { setAuthenticated, clearAuth } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const bootstrapAuth = async () => {
      try {
        const me = await getMe();
        setAuthenticated(me);
      } catch {
        clearAuth();
      }
    };

    bootstrapAuth();
  }, [setAuthenticated, clearAuth]);

  return <>{children}</>;
}
