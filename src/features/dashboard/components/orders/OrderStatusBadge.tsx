"use client";

import { OrderStatus } from "@/features/dashboard/types/dashboard.types";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400",
  },
  processing: {
    label: "Processing",
    className:
      "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
  },
  shipped: {
    label: "Shipped",
    className:
      "bg-indigo-500/10 text-indigo-700 border-indigo-500/20 dark:text-indigo-400",
  },
  delivered: {
    label: "Delivered",
    className:
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-rose-500/10 text-rose-700 border-rose-500/20 dark:text-rose-400",
  },
  refunded: {
    label: "Refunded",
    className:
      "bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-400",
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={`text-[11px] font-medium px-2 py-0.5 ${config.className} ${className ?? ""}`}
    >
      {config.label}
    </Badge>
  );
}
