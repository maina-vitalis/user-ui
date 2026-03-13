"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Package,
  Search,
  Eye,
  RotateCcw,
  Truck,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "./OrderStatusBadge";
import {
  MOCK_ORDERS,
  Order,
  OrderStatus,
} from "@/features/dashboard/types/dashboard.types";

const tabs: { label: string; value: string }[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrdersTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_ORDERS.filter((order) => {
    const matchesTab =
      activeTab === "all" || order.status === (activeTab as OrderStatus);
    const matchesSearch =
      search === "" ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((i) =>
        i.productName.toLowerCase().includes(search.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold">My Orders</CardTitle>
            <CardDescription className="mt-0.5">
              {MOCK_ORDERS.length} total orders
            </CardDescription>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9 h-9 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="h-9 bg-muted/50 rounded-xl p-1 flex-wrap gap-1 w-fit">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs rounded-lg data-[state=active]:shadow-sm h-7 px-3"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="px-4 pb-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-semibold text-base">No orders found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search ? "Try a different search term." : "You have no orders in this category yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const firstItem = order.items[0];

  return (
    <div className="rounded-xl border border-border/60 overflow-hidden transition-all duration-200 hover:border-border hover:shadow-sm">
      {/* Main Row */}
      <div className="flex items-center gap-3 p-4">
        {/* Image */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/40">
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
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold truncate">
              {firstItem.productName}
            </p>
            {order.items.length > 1 && (
              <Badge variant="secondary" className="text-[10px] h-4 px-1 shrink-0">
                +{order.items.length - 1}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-muted-foreground font-mono">
              {order.orderNumber}
            </span>
            <span className="text-muted-foreground/40 text-xs">•</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(order.date)}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
          <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/30 border-t border-border/40">
        {order.trackingNumber && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs rounded-lg hover:bg-primary/10 hover:text-primary"
          >
            <Truck className="h-3.5 w-3.5" />
            Track
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs rounded-lg"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
        {order.status === "delivered" && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs rounded-lg"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reorder
          </Button>
        )}
        {order.items.length > 1 && (
          <>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs rounded-lg text-muted-foreground"
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? "Less" : `All ${order.items.length} items`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </Button>
          </>
        )}
      </div>

      {/* Expanded items */}
      {expanded && order.items.length > 1 && (
        <div className="px-4 py-2 space-y-1 bg-muted/10">
          <Separator className="mb-2" />
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-xs text-muted-foreground py-1"
            >
              <span className="truncate flex-1">{item.productName}</span>
              <span>×{item.quantity}</span>
              <span className="font-medium text-foreground">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
