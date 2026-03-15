import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_0%,white,transparent_30%)]" />
      <div className="container relative mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Ready to Build Your Empire?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90 md:text-lg">
          Join thousands of entrepreneurs and shoppers growing with confidence on one powerful marketplace.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild aria-label="Start selling today">
            <Link href="/auth/sign-up">Start Selling Today</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            aria-label="Browse products"
            asChild
          >
            <Link href="#categories">Browse Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}