import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "../shared/section-header";
import { PricingGrid } from "./pricing-grid";
import { monthlyPlans, annualPlans } from "../../constants";

export function PricingSection() {
  return (
    <section id="pricing" className="border-y border-border bg-muted/40 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Simple, Transparent Pricing for Vendors"
          subtitle="Choose a plan that fits your growth stage. Upgrade anytime as your business scales."
        />
        <Tabs defaultValue="monthly" className="mx-auto max-w-6xl">
          <TabsList className="mx-auto mb-8">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <PricingGrid plans={monthlyPlans} />
          </TabsContent>
          <TabsContent value="annual">
            <PricingGrid plans={annualPlans} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}