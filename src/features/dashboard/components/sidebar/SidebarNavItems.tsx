"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "My Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
    badge: "3",
  },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart, badge: "6" },
  { label: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { label: "My Reviews", href: "/dashboard/reviews", icon: Star },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: "2",
    badgeVariant: "destructive" as const,
  },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNavItems() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">
        My Account
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={`
                    group relative h-10 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary shadow-sm font-medium"
                        : "hover:bg-accent/60 hover:text-accent-foreground"
                    }
                  `}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                    <span
                      className={`flex-1 font-medium ${isActive ? "text-primary" : "text-foreground"}`}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant ?? "secondary"}
                        className={`text-[10px] h-5 min-w-5 px-1.5 ${isActive ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30" : ""}`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {!item.badge && (
                      <ChevronRight
                        className={`h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-40 group-hover:translate-x-0 ${isActive ? "text-primary-foreground" : ""}`}
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
