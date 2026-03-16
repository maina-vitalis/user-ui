import { DashboardSidebar } from "@/features/dashboard/components/sidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { requireUser } from "@/lib/auth.ts/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40 dark:bg-background">
        <DashboardSidebar />
        <main className="flex-1 w-full flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          {/* Header Bar */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 h-9 w-9 rounded-xl hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-all duration-200" />
              <Separator
                orientation="vertical"
                className="mr-2 h-5 bg-border/60"
              />
              <Breadcrumb>
                <BreadcrumbList className="sm:gap-2">
                  <BreadcrumbItem className="hidden sm:block">
                    <BreadcrumbLink
                      href="/dashboard"
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-sm">
                      Overview
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-400 mx-auto w-full">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 will-change-transform">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
