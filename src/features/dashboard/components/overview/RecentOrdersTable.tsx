"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/features/dashboard/components/orders/OrderStatusBadge";
import { MOCK_ORDERS } from "@/features/dashboard/types/dashboard.types";

export function RecentOrdersTable() {
  const recentOrders = MOCK_ORDERS.slice(0, 4);

  return (
    <Card className="border-border/60 transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent Orders
            </CardTitle>
            <CardDescription className="text-sm mt-0.5">
              Your latest 4 purchases
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary h-8 gap-1">
            <Link href="/dashboard/orders">
              View all
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="space-y-1">
          {recentOrders.map((order) => {
            const firstItem = order.items[0];
            return (
              <div
                key={order.id}
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-accent/40"
              >
                {/* Product Image */}
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/50">
                  {firstItem.productImage ? (
                    <Image
                      src={firstItem.productImage}
                      alt={firstItem.productName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {firstItem.productName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {order.orderNumber}
                    </span>
                    {order.items.length > 1 && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1">
                        +{order.items.length - 1} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-sm font-semibold">
                    ${order.total.toFixed(2)}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
