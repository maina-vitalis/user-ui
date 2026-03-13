"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarNavItems } from "./SidebarNavItems";
import { SidebarNavUser } from "./SidebarNavUser";
import { ShoppingCart, Sparkles } from "lucide-react";

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      {/* ─── Header / Brand ──────────────────────────────────────────────── */}
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/30">
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-base tracking-tight">
              ESHOP
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Customer Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className="mx-0" />

      {/* ─── Navigation ──────────────────────────────────────────────────── */}
      <SidebarContent className="px-2 py-3">
        <SidebarNavItems />
      </SidebarContent>

      <SidebarSeparator className="mx-0" />

      {/* ─── User Footer ─────────────────────────────────────────────────── */}
      <SidebarFooter className="px-3 py-3">
        <SidebarNavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
