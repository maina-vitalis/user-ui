"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  ShoppingBag, 
  Compass,
  Sparkles 
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-primary) 15%, transparent) 0%, transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--color-accent) 20%, transparent) 0%, transparent 45%)",
        }}
      >
        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        
        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 animate-bounce delay-1000">
            <div className="rounded-full bg-primary/10 p-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="absolute top-32 right-20 animate-bounce delay-2000">
            <div className="rounded-full bg-accent/10 p-3">
              <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-bounce delay-500">
            <div className="rounded-full bg-secondary/20 p-3">
              <Compass className="h-6 w-6 text-secondary-foreground" />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl text-center">
          {/* 404 Badge */}
          <Badge variant="secondary" className="mb-6 text-sm animate-in fade-in slide-in-from-top-4 duration-1000">
            🔍 Page Not Found
          </Badge>

          {/* Main 404 Display */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <h1 className="text-8xl font-bold tracking-tight text-primary/80 md:text-9xl">
              404
            </h1>
            <div className="mt-4 space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Oops! Page Not Found
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, even the best explorers sometimes take a wrong turn.
              </p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Card className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Go Home</h3>
                <p className="text-sm text-muted-foreground">Return to our homepage</p>
              </CardContent>
            </Card>

            <Card className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20">
                  <Search className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold">Search Products</h3>
                <p className="text-sm text-muted-foreground">Find what you're looking for</p>
              </CardContent>
            </Card>

            <Card className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex rounded-lg bg-secondary/10 p-3 transition-all duration-300 group-hover:bg-secondary/20">
                  <ShoppingBag className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold">Browse Categories</h3>
                <p className="text-sm text-muted-foreground">Explore our marketplace</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="javascript:history.back()">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <p className="text-sm text-muted-foreground">
              Still having trouble? {" "}
              <Link 
                href="/contact" 
                className="font-medium text-primary hover:underline transition-colors"
              >
                Contact our support team
              </Link>
              {" "} for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}