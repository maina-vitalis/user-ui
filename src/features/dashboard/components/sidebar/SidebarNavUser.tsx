"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  LogOut,
  User,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

interface SidebarNavUserProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    tier?: "silver" | "gold" | "platinum";
  };
}

const tierConfig = {
  silver: {
    label: "Silver",
    className: "bg-slate-400/20 text-slate-400 border-slate-400/30",
  },
  gold: {
    label: "Gold",
    className: "bg-amber-400/20 text-amber-500 border-amber-400/30",
  },
  platinum: {
    label: "Platinum",
    className: "bg-indigo-400/20 text-indigo-400 border-indigo-400/30",
  },
};

export function SidebarNavUser({ user }: Readonly<SidebarNavUserProps>) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setUser, setAuthStatus } = useAuthStore();

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setAuthStatus("guest");
      setIsLoggingOut(false);
      router.push("/");
    }
  };

  const displayUser = user ?? {
    name: "Vitalis Maina",
    email: "vitalis@example.com",
    tier: "gold" as const,
  };

  const initials = displayUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tier = displayUser.tier ?? "silver";
  const tierInfo = tierConfig[tier];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl hover:bg-sidebar-accent/60 transition-all duration-200"
            >
              <Avatar className="h-9 w-9 rounded-lg ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-semibold">
                    {displayUser.name}
                  </span>
                  <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>
                <span className="truncate text-xs text-muted-foreground">
                  {displayUser.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="h-10 w-10 rounded-lg ring-2 ring-primary/20">
                  <AvatarImage
                    src={displayUser.avatar}
                    alt={displayUser.name}
                  />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold">
                      {displayUser.name}
                    </span>
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    {displayUser.email}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] h-5 px-1.5 ${tierInfo.className}`}
                >
                  {tierInfo.label}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
