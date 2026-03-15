import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { PricingPlan } from "../../types";

interface PricingGridProps {
  plans: PricingPlan[];
}

export function PricingGrid({ plans }: PricingGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`border shadow-lg ${
            plan.popular
              ? "border-primary ring-2 ring-primary/40"
              : "border-border"
          }`}
        >
          <CardHeader>
            <div className="mb-2 flex items-center justify-between">
              <CardTitle>{plan.name}</CardTitle>
              {plan.popular && <Badge>Most Popular</Badge>}
            </div>
            <p className="text-3xl font-bold tracking-tight">{plan.price}</p>
            <CardDescription>{plan.description}</CardDescription>
            <Badge variant="outline" className="w-fit">
              {plan.commission}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 text-primary" />
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}