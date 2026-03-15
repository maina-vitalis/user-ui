"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: Readonly<AppShellProps>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/" || pathname.startsWith("/dashboard");

  return (
    <div className="relative flex min-h-screen flex-col">
      {!hideHeader && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
