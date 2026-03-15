"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Search, User } from "lucide-react";

import api from "@/lib/api";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { navLinks } from "@/features/landing/constants";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import type { NavbarLink } from "./types";

const navbarLinks: NavbarLink[] = navLinks.map((label) => ({
  label,
  href: label === "Home" ? "/#home" : `/#${label.toLowerCase()}`,
}));

export function Navbar() {
  const [wishlistCount] = useState(3);
  const router = useRouter();
  const { user, authStatus, setUser, setAuthStatus } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setAuthStatus("guest");
      router.push("/");
    }
  };

  const handleProfileClick = () => {
    router.push("/dashboard");
  };

  let authActions: ReactNode;

  if (authStatus === "authenticated" && user) {
    authActions = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9 border">
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.email.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem
            onClick={handleProfileClick}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (authStatus === "guest") {
    authActions = (
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/sign-up">Become a Seller</Link>
        </Button>
      </div>
    );
  } else {
    authActions = (
      <div className="h-9 w-20 animate-pulse rounded-full bg-muted" />
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="font-bold tracking-tight text-xl hidden sm:block"
        >
          ESHOP
        </Link>
        <Link href="/" className="font-bold tracking-tight text-xl sm:hidden">
          E
        </Link>

        <DesktopMenu links={navbarLinks} />

        <div className="relative hidden max-w-xl flex-1 items-center md:flex">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 rounded-r-full hover:bg-transparent"
          >
            <Search className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full md:hidden"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeSwitcher />
          <div className="relative hidden items-center justify-center sm:inline-flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            {wishlistCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {wishlistCount}
              </Badge>
            )}
          </div>

          <div className="hidden lg:flex">{authActions}</div>
          <MobileMenu
            links={navbarLinks}
            wishlistCount={wishlistCount}
            user={user}
            authStatus={authStatus}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
