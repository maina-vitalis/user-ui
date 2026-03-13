import { OrdersTable } from "@/features/dashboard/components/orders/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Order History</h1>
        <p className="text-muted-foreground text-sm font-medium">
          View and track all your past and current orders.
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}
