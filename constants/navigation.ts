import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  ClipboardPenLine,
  LayoutDashboard,
  UserPlus,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "All Employee", href: "/employee", icon: LayoutDashboard },
  { title: "Employee Register", href: "/register", icon: LayoutDashboard },
  { title: "Attendance", href: "/attendance", icon: CalendarCheck },
  { title: "Leave Balances", href: "/leaves", icon: CalendarDays },
  {
    title: "Leave Requests",
    href: "/leave-requests",
    icon: ClipboardPenLine,
    badge: 8,
  },
];

export const USER_MANAGEMENT_ITEMS: NavItem[] = [
  // { title: "Add User", href: "/users/add", icon: UserPlus },
  // { title: "Employee Register", href: "/register", icon: ClipboardList },
];

export const AUTH_ROUTES = ["/login"] as const;

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

export function isUserManagementRoute(pathname: string) {
  return pathname.startsWith("/users") || pathname === "/register";
}
