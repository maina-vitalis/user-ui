import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Package, Sparkles, ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-primary) 12%, transparent) 0%, transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--color-accent) 15%, transparent) 0%, transparent 45%)",
        }}
      >
        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        
        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 animate-bounce delay-1000">
            <div className="rounded-full bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="absolute top-32 right-20 animate-bounce delay-2000">
            <div className="rounded-full bg-accent/10 p-3">
              <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-bounce delay-500">
            <div className="rounded-full bg-secondary/20 p-3">
              <ShoppingBag className="h-6 w-6 text-secondary-foreground" />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl text-center">
          {/* Loading Badge */}
          <Badge variant="secondary" className="mb-6 text-sm animate-pulse">
            ⚡ Loading
          </Badge>

          {/* Main Loading Display */}
          <div className="mb-8">
            <div className="mb-6 inline-flex rounded-full bg-primary/10 p-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Getting Things Ready
              </h1>
              <p className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg">
                We're preparing your experience. This will just take a moment.
              </p>
            </div>
          </div>

          {/* Loading Steps */}
          <Card className="border border-border shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Loading content...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-muted animate-pulse delay-300"></div>
                  <span className="text-sm text-muted-foreground">Preparing interface...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-muted animate-pulse delay-700"></div>
                  <span className="text-sm text-muted-foreground">Almost ready...</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}