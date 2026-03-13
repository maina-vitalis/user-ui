"use client";

import {
  ShoppingBag,
  DollarSign,
  Zap,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_STATS } from "@/features/dashboard/types/dashboard.types";

const iconMap = {
  ShoppingBag,
  DollarSign,
  Zap,
  Star,
};

const colorConfig = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    icon: "text-blue-500",
    gradient: "from-blue-500/5 to-transparent",
    border: "border-blue-500/10",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    icon: "text-emerald-500",
    gradient: "from-emerald-500/5 to-transparent",
    border: "border-emerald-500/10",
  },
  purple: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    icon: "text-violet-500",
    gradient: "from-violet-500/5 to-transparent",
    border: "border-violet-500/10",
  },
  orange: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    icon: "text-orange-500",
    gradient: "from-orange-500/5 to-transparent",
    border: "border-orange-500/10",
  },
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {MOCK_STATS.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        const colors = colorConfig[stat.color];
        const isPositive = stat.change >= 0;

        return (
          <Card
            key={stat.label}
            className={`relative overflow-hidden border ${colors.border} transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
          >
            {/* Gradient accent */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} pointer-events-none`}
            />

            <CardContent className="relative p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground truncate">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <div
                    className={`mt-2 flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span>
                      {isPositive ? "+" : ""}
                      {stat.change}% {stat.changeLabel}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors.bg} ml-3`}
                >
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
