"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  RefreshCw, 
  AlertTriangle, 
  Bug,
  Zap,
  Shield
} from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-destructive) 10%, transparent) 0%, transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--color-primary) 15%, transparent) 0%, transparent 45%)",
        }}
      >
        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        
        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 animate-pulse delay-1000">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <div className="absolute top-32 right-20 animate-pulse delay-2000">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-pulse delay-500">
            <div className="rounded-full bg-secondary/20 p-3">
              <Shield className="h-6 w-6 text-secondary-foreground" />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl text-center">
          {/* Error Badge */}
          <Badge variant="destructive" className="mb-6 text-sm animate-in fade-in slide-in-from-top-4 duration-1000">
            ⚠️ Something Went Wrong
          </Badge>

          {/* Main Error Display */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <div className="mb-6 inline-flex rounded-full bg-destructive/10 p-6">
              <Bug className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Oops! Something Went Wrong
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                We encountered an unexpected error. Our team has been notified and is working to fix this issue.
              </p>
            </div>
          </div>

          {/* Error Details Card */}
          {process.env.NODE_ENV === "development" && (
            <Card className="mb-8 border-destructive/20 bg-destructive/5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <CardContent className="p-6 text-left">
                <h3 className="mb-2 font-semibold text-destructive">Error Details (Development Mode)</h3>
                <pre className="overflow-auto rounded bg-muted p-3 text-sm text-muted-foreground">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Error ID: {error.digest}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Card className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Try Again</h3>
                <p className="text-sm text-muted-foreground">Reload the page and try again</p>
              </CardContent>
            </Card>

            <Card className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-3 transition-all duration-300 group-hover:bg-accent/20">
                  <Home className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold">Go Home</h3>
                <p className="text-sm text-muted-foreground">Return to our homepage</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button size="lg" onClick={reset} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please {" "}
              <Link 
                href="/contact" 
                className="font-medium text-primary hover:underline transition-colors"
              >
                contact our support team
              </Link>
              {" "} with the error details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}