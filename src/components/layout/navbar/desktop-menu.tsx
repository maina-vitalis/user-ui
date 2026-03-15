"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavbarLink } from "./types";

interface DesktopMenuProps {
  links: NavbarLink[];
}

export function DesktopMenu({ links }: Readonly<DesktopMenuProps>) {
  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {links.map((link) => (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
