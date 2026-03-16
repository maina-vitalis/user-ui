"use client";

import React, { useEffect, useRef } from "react";
import { getMe } from "../api/auth-api";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth, setAuthenticated } from "@/store/slices/auth-slice";

export default function RefreshToken({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const bootstrapAuth = async () => {
      try {
        const me = await getMe();
        dispatch(setAuthenticated(me));
      } catch {
        dispatch(clearAuth());
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return <>{children}</>;
}
