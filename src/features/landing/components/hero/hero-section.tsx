"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAppSelector } from "@/store/hooks";

export function HeroSection() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-primary) 20%, transparent) 0%, transparent 45%), radial-gradient(circle at 80% 5%, color-mix(in oklab, var(--color-primary) 18%, transparent) 0%, transparent 35%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      <div className="container mx-auto py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            The Future of Online Selling
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <p>One Platform. Thousands of Vendors.</p>
            <span className="block bg-linear-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Infinite Possibilities.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Discover curated products from trusted sellers while giving
            entrepreneurs the tools to launch, scale, and thrive in one premium
            multivendor ecosystem.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {user ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                asChild
                aria-label="Go to dashboard"
              >
                <Link href="/my-account/profile">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                asChild
                aria-label="Start your store"
              >
                <Link href="/auth/sign-up">Start Your Store</Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              aria-label="Explore products"
              asChild
            >
              <Link href="#categories">Explore Products</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AvatarGroup>
              {[
                { initials: "AN" },
                { initials: "PK" },
                { initials: "LT" },
                { initials: "MS" },
                { initials: "RT" },
              ].map((person) => (
                <Avatar key={person.initials}>
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="cursor-default text-sm text-muted-foreground">
                  Join{" "}
                  <span className="font-semibold text-foreground">12,000+</span>{" "}
                  vendors already selling
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Average new vendor breaks even in under 45 days with our
                onboarding and traffic tools.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
}
