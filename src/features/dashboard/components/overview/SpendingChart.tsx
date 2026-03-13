"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_SPENDING_DATA } from "@/features/dashboard/types/dashboard.types";

export function SpendingChart() {
  return (
    <Card className="border-border/60 transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Spending Overview
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Monthly spending for the last 7 months
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70 inline-block" />
              Spending
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={MOCK_SPENDING_DATA}
            margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontSize: 12,
                color: "var(--foreground)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
              formatter={(value: number) => [`$${value}`, "Spending"]}
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#spendingGradient)"
              dot={{ fill: "var(--primary)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0, fill: "var(--primary)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
