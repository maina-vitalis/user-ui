import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "../shared/section-header";
import { features } from "../../constants";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Everything You Need to Run a Thriving Marketplace"
          subtitle="From first product upload to repeat buyers, every workflow is optimized for speed, trust, and scale."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group border border-border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary"
              >
                <CardHeader>
                  <div className="mb-3 w-fit rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}