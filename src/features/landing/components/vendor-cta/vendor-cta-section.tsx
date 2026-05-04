"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, LayoutDashboard } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { VendorOnboardingForm } from "@/features/landing/components/vendor-onboarding-form";
import type { VendorFormValues } from "@/features/landing/types/vendor-form.types";

export function VendorCtaSection() {
  const router = useRouter();
  const { authStatus } = useAppSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBecomeVendor = () => {
    if (authStatus === "authenticated") {
      setIsDialogOpen(true);
    } else {
      router.push("/auth/sign-up");
    }
  };

  const handleVendorFormSubmit = async (values: VendorFormValues) => {
    console.log("Vendor form submitted:", values);
    // TODO: Send to API to save vendor data
    setIsDialogOpen(false);
  };
  return (
    <section className="border-y border-border bg-muted/40 py-24 md:py-32">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge variant="secondary" className="mb-4">
            Vendor Growth
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Turn Your Passion Into Profit
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Launch your storefront, reach verified buyers, and scale with
            built-in tools for marketing, fulfillment, and payouts.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "No upfront setup cost",
              "Fast onboarding and store customization",
              "Secure escrow and global payouts",
              "Insights that help you grow revenue",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-5 text-primary" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
          {authStatus === "authenticated" && (
            <Button
              size="lg"
              className="mt-8"
              onClick={handleBecomeVendor}
              aria-label="Open your store for free"
            >
              Open Your Store Free hello
            </Button>
          )}

          <p className="mt-3 text-sm text-muted-foreground">
            No monthly fees. Commission only when you sell.
          </p>
        </div>

        <Card className="border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="size-5 text-primary" /> Vendor
              Dashboard
            </CardTitle>
            <CardDescription>
              Live overview of your marketplace performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Card className="border border-border bg-muted/30 py-4">
              <CardHeader className="px-4">
                <CardDescription>Monthly Revenue</CardDescription>
                <CardTitle className="text-xl">$18,420</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border border-border bg-muted/30 py-4">
              <CardHeader className="px-4">
                <CardDescription>Orders Today</CardDescription>
                <CardTitle className="text-xl">126</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border border-border bg-muted/30 py-4">
              <CardHeader className="px-4">
                <CardDescription>Store Visits</CardDescription>
                <CardTitle className="text-xl">4,982</CardTitle>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Your Journey as a Seller</DialogTitle>
            <DialogDescription>
              Tell us a bit about your store to get started. You can update
              these details later.
            </DialogDescription>
          </DialogHeader>
          <VendorOnboardingForm onSubmit={handleVendorFormSubmit} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
