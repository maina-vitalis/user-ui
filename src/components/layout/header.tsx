"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Search, LogOut, User } from "lucide-react";

import { useAuthStore } from "@/lib/store/useAuthStore";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [wishlistCount] = useState(3);
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken(null);
      router.push("/");
    }
  };

  const handleProfileClick = () => {
    router.push("/my-account/profile");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl tracking-tight hidden sm:block"
        >
          ESHOP
        </Link>
        <Link href="/" className="font-bold text-xl tracking-tight sm:hidden">
          E
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto flex items-center relative">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pr-10 rounded-full"
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

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <div className="relative inline-flex items-center justify-center">
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
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
              >
                {wishlistCount}
              </Badge>
            )}
          </div>

          {accessToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      U
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
                  <span>Profile</span>
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
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                asChild
                className="hidden sm:inline-flex border-primary"
              >
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
