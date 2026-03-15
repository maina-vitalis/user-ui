import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "../shared/section-header";
import { categories, categoryIconMap } from "../../constants";

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Shop Across Every Category"
          subtitle="From everyday essentials to niche finds, your next favorite product is a click away."
        />
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {categories.map((category) => {
            const Icon = categoryIconMap[category.name];
            return (
              <Card
                key={category.name}
                className="group min-w-64 border border-border bg-linear-to-br shadow-lg transition-transform duration-200 hover:scale-105 lg:min-w-0 p-0"
              >
                <CardContent
                  className={`rounded-xl bg-linear-to-br p-6 ${category.gradientClass}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl">{category.emoji}</p>
                      <h3 className="mt-3 text-lg font-semibold tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <div className="rounded-md bg-background/70 p-2 backdrop-blur">
                      <Icon className="size-4 text-primary" />
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-5">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
