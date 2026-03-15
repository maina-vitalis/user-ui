import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Step } from "../../types";

interface StepsGridProps {
  steps: Step[];
}

export function StepsGrid({ steps }: StepsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.step} className="border border-border shadow-lg">
            <CardHeader>
              <p className="text-4xl font-bold tracking-tight text-primary/80">{item.step}</p>
              <div className="mt-2 w-fit rounded-lg bg-primary/10 p-3">
                <Icon className="size-5 text-primary" />
              </div>
              <CardTitle className="mt-2">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}