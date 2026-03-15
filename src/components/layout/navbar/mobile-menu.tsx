"use client";

import Link from "next/link";
import { Heart, LogOut, Menu, Search, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { AuthStatus, NavbarLink, NavbarUser } from "./types";

interface MobileMenuProps {
  links: NavbarLink[];
  wishlistCount: number;
  user: NavbarUser | null;
  authStatus: AuthStatus;
  onProfileClick: () => void;
  onLogout: () => void;
}

export function MobileMenu({
  links,
  wishlistCount,
  user,
  authStatus,
  onProfileClick,
  onLogout,
}: Readonly<MobileMenuProps>) {
  let authContent;

  if (authStatus === "loading") {
    authContent = <div className="h-24 animate-pulse rounded-2xl bg-muted" />;
  } else if (authStatus === "authenticated" && user) {
    authContent = (
      <div className="space-y-3 rounded-2xl border bg-muted/40 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.email.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium">Signed in</p>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <SheetClose asChild>
          <Button
            variant="outline"
            className="w-full justify-start rounded-full"
            onClick={onProfileClick}
          >
            <User className="h-4 w-4" />
            Dashboard
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-full text-destructive hover:text-destructive"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </SheetClose>
      </div>
    );
  } else {
    authContent = (
      <div className="flex flex-col gap-2">
        <SheetClose asChild>
          <Link
            href="/auth/sign-in"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full rounded-full",
            )}
          >
            Sign In
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/auth/sign-up"
            className={cn(buttonVariants(), "w-full rounded-full")}
          >
            Become a Seller
          </Link>
        </SheetClose>
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Browse sections, account actions, and seller tools.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="rounded-full pr-10"
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <SheetClose key={link.label} asChild>
                <Link
                  href={link.href}
                  className="rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-border hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </div>

          <Separator />

          <Button
            variant="outline"
            className="w-full justify-start rounded-full"
          >
            <Heart className="h-4 w-4" />
            Wishlist
            {wishlistCount > 0 ? (
              <Badge
                variant="destructive"
                className="ml-auto rounded-full px-1.5"
              >
                {wishlistCount}
              </Badge>
            ) : null}
          </Button>

          {authContent}
        </div>
      </SheetContent>
    </Sheet>
  );
}
