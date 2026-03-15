"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Mail, MapPin, ShieldCheck, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/lib/store/useAuthStore";

const DEMO_PROFILE = {
  name: "Shop User",
  email: "user@eshop.app",
  country: "Not set",
  memberSince: "March 2026",
};

export function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Profile
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Manage your account details and security preferences.
          </p>
        </div>
        <Button variant="outline">Edit profile</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="items-center text-center">
            <Avatar className="h-20 w-20 border">
              <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                SU
              </AvatarFallback>
            </Avatar>
            <CardTitle>{DEMO_PROFILE.name}</CardTitle>
            <CardDescription>{DEMO_PROFILE.email}</CardDescription>
            <Badge variant="secondary" className="mt-1">
              Verified account
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Member since {DEMO_PROFILE.memberSince}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {DEMO_PROFILE.country}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>
              Your personal information and account status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Full name
                </p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {DEMO_PROFILE.name}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Email address
                </p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {DEMO_PROFILE.email}
                </p>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg border p-4">
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                Security
              </p>
              <p className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Two-factor verification status: enabled
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
