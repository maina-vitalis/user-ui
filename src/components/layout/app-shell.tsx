"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: Readonly<AppShellProps>) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/dashboard");

  return (
    <div className="relative flex min-h-screen flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
