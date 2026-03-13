"use client";

import Link from "next/link";
import {
  Search,
  Package,
  Star,
  ArrowRight,
  Heart,
  Headphones,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    id: "browse",
    icon: Search,
    label: "Browse Products",
    description: "Discover new items",
    href: "/",
    color: "blue",
  },
  {
    id: "track",
    icon: Package,
    label: "Track My Order",
    description: "Live shipment status",
    href: "/dashboard/orders",
    color: "green",
  },
  {
    id: "wishlist",
    icon: Heart,
    label: "View Wishlist",
    description: "6 saved items",
    href: "/dashboard/wishlist",
    color: "pink",
  },
  {
    id: "review",
    icon: Star,
    label: "Write a Review",
    description: "Share your experience",
    href: "/dashboard/reviews",
    color: "amber",
  },
  {
    id: "support",
    icon: Headphones,
    label: "Get Support",
    description: "We're here to help",
    href: "#",
    color: "purple",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/15 group-hover:bg-blue-500/20",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/15 group-hover:bg-emerald-500/20",
  pink: "bg-rose-500/10 text-rose-600 dark:text-rose-400 dark:bg-rose-500/15 group-hover:bg-rose-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/15 group-hover:bg-amber-500/20",
  purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400 dark:bg-violet-500/15 group-hover:bg-violet-500/20",
};

export function QuickActions() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="space-y-1.5">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="ghost"
                asChild
                className="group w-full h-auto justify-start px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-all duration-200"
              >
                <Link href={action.href} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${colorMap[action.color]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium leading-none">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
