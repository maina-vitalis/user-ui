"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "./hero/hero-section";
import { StatsSection } from "./stats/stats-section";
import { FeaturesSection } from "./features/features-section";
import { HowItWorksSection } from "./how-it-works/how-it-works-section";
import { CategoriesSection } from "./categories/categories-section";
import { VendorCtaSection } from "./vendor-cta/vendor-cta-section";
import { TestimonialsSection } from "./testimonials/testimonials-section";
import { PricingSection } from "./pricing/pricing-section";
import { FaqSection } from "./faq/faq-section";
import { FinalCtaSection } from "./final-cta/final-cta-section";
import { FooterSection } from "./footer/footer-section";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CategoriesSection />
        <VendorCtaSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
