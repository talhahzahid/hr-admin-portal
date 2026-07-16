"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  UserPlus,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Attendance", href: "/attendance", icon: CalendarCheck },
  { title: "Leaves", href: "/leaves", icon: CalendarDays },
];

const userManagementItems = [
  { title: "Add User", href: "/users/add", icon: UserPlus },
  { title: "Employee Register", href: "/register", icon: ClipboardList },
];

const menuButtonClass =
  "h-10 rounded-xl px-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white data-active:bg-sky-600/90 data-active:text-white data-active:shadow-md data-active:shadow-sky-900/20";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isUsersOpen, setIsUsersOpen] = useState(
    pathname.startsWith("/users") || pathname === "/register"
  );

  useEffect(() => {
    if (pathname.startsWith("/users") || pathname === "/register") {
      setIsUsersOpen(true);
    }
  }, [pathname]);

  const isUserSectionActive =
    pathname.startsWith("/users") || pathname === "/register";

  return (
    <Sidebar className="border-r border-sidebar-border" collapsible="icon">
      <SidebarHeader className="shrink-0 border-b border-white/5 px-4 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-90"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-900/30">
            <span className="text-xs font-bold text-white">HR</span>
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-white">HR Portal</p>
            <p className="truncate text-xs text-zinc-500">Management System</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="min-h-0 flex-1 gap-0 overflow-y-auto px-3 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 group-data-[collapsible=icon]:sr-only">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={menuButtonClass}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-white/10" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 group-data-[collapsible=icon]:sr-only">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="User Management"
                  isActive={isUserSectionActive}
                  onClick={() => setIsUsersOpen((open) => !open)}
                  className={cn(menuButtonClass, "justify-between")}
                >
                  <span className="flex items-center gap-2">
                    <Users className="size-4 shrink-0" />
                    <span>User Management</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-zinc-500 transition-transform group-data-[collapsible=icon]:hidden",
                      isUsersOpen && "rotate-180"
                    )}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isUsersOpen && (
                <div className="mt-0.5 ml-3 flex flex-col gap-0.5 border-l border-white/10 pl-3 group-data-[collapsible=icon]:hidden">
                  {userManagementItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="h-9 rounded-lg px-2.5 text-sm text-zinc-500 hover:bg-white/10 hover:text-white data-active:bg-white/10 data-active:text-white"
                      >
                        <Link href={item.href}>
                          <item.icon className="size-3.5 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="shrink-0 border-t border-white/5 px-4 py-4">
        <div className="rounded-xl bg-white/5 p-3 group-data-[collapsible=icon]:hidden">
          <p className="text-xs font-medium text-zinc-400">Need help?</p>
          <p className="mt-0.5 text-sm text-zinc-200">Contact HR support</p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
