import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "../shared/section-header";
import { StepsGrid } from "./steps-grid";
import { vendorSteps, shopperSteps } from "../../constants";

export function HowItWorksSection() {
  return (
    <section id="vendors" className="border-y border-border bg-muted/40 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Start Selling in 3 Simple Steps"
          subtitle="A guided flow for both merchants and shoppers, built to reduce friction and increase conversion."
        />

        <Tabs defaultValue="vendors" className="mx-auto max-w-6xl">
          <TabsList className="mx-auto mb-8">
            <TabsTrigger value="vendors">For Vendors</TabsTrigger>
            <TabsTrigger value="shoppers">For Shoppers</TabsTrigger>
          </TabsList>
          <TabsContent value="vendors">
            <StepsGrid steps={vendorSteps} />
          </TabsContent>
          <TabsContent value="shoppers">
            <StepsGrid steps={shopperSteps} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}