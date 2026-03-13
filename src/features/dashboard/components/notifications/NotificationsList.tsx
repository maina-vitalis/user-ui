"use client";

import { useState } from "react";
import {
  Bell,
  Package,
  Truck,
  Tag,
  RefreshCcw,
  Star,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Notification,
  NotificationType,
  MOCK_NOTIFICATIONS,
} from "@/features/dashboard/types/dashboard.types";

const typeConfig: Record<
  NotificationType,
  { icon: React.ElementType; color: string; bg: string }
> = {
  order: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  delivery: { icon: Truck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  promo: { icon: Tag, color: "text-purple-500", bg: "bg-purple-500/10" },
  refund: { icon: RefreshCcw, color: "text-slate-500", bg: "bg-slate-500/10" },
  review: { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  system: { icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10" },
};

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NotificationsList() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5 text-[10px] font-bold">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Stay updated on your orders and account activity
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 gap-1.5 rounded-xl text-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-2">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`group flex items-start gap-4 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                  notification.read
                    ? "bg-transparent hover:bg-muted/50 border border-transparent"
                    : "bg-primary/5 hover:bg-primary/10 border border-primary/10 shadow-sm"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                    notification.read ? "bg-muted text-muted-foreground" : config.bg
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${notification.read ? "" : config.color}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-semibold mb-1 ${
                        notification.read ? "text-foreground/80" : "text-foreground"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5 font-medium">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-snug ${
                      notification.read
                        ? "text-muted-foreground"
                        : "text-muted-foreground/90 font-medium"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
