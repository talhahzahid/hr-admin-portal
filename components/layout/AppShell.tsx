"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AuthGuard } from "@/components/auth/auth-guard";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { isAuthRoute } from "@/constants/navigation";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname ? isAuthRoute(pathname) : false;

  return (
    <AuthGuard>
      {hideSidebar ? (
        <>{children}</>
      ) : (
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="min-h-svh overflow-x-hidden bg-slate-100/90 dark:bg-slate-950">
              <AppHeader />

              <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-6 lg:p-8">
                <main className="mx-auto w-full max-w-360 flex-1 rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm sm:p-6 md:p-8 dark:border-slate-800/80 dark:bg-slate-900/90">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      )}
    </AuthGuard>
  );
}
