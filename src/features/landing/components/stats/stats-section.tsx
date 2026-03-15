import { Separator } from "@/components/ui/separator";
import { stats } from "../../constants";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-4 md:gap-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center justify-center gap-4 px-4 py-2">
              <div className="text-center">
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              {index < stats.length - 1 && <Separator orientation="vertical" className="hidden h-10 md:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}