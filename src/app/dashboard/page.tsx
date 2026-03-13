import { StatsGrid } from "@/features/dashboard/components/overview/StatsGrid";
import { SpendingChart } from "@/features/dashboard/components/overview/SpendingChart";
import { RecentOrdersTable } from "@/features/dashboard/components/overview/RecentOrdersTable";
import { QuickActions } from "@/features/dashboard/components/overview/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 font-sans">
          Welcome back, Vitalis
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Here's what's happening with your account today.
        </p>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
        <div className="xl:col-span-5 space-y-6">
          <SpendingChart />
          <RecentOrdersTable />
        </div>
        <div className="xl:col-span-2 space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
