"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  clearAuthSession,
  getAuthDisplayName,
  getAuthEmployee,
} from "@/lib/auth";

export function AppHeader() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Admin User");
  const [email, setEmail] = useState("admin@company.com");
  const [initials, setInitials] = useState("AD");

  useEffect(() => {
    const employee = getAuthEmployee();
    const name = getAuthDisplayName();
    setDisplayName(name);
    setEmail(employee?.email ?? "admin@company.com");
    setInitials(
      `${employee?.firstName?.[0] ?? "A"}${employee?.lastName?.[0] ?? "D"}`.toUpperCase()
    );
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200/80 bg-white/95 px-3 backdrop-blur-md supports-backdrop-filter:bg-white/80 sm:gap-4 sm:px-4 md:px-6 dark:border-zinc-800 dark:bg-zinc-950/90 dark:supports-backdrop-filter:bg-zinc-950/80">
      <SidebarTrigger className="size-9 shrink-0 md:size-8" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-[min(100%,20rem)] -translate-x-1/2 -translate-y-1/2 px-14 text-center sm:block md:max-w-md md:px-24">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
          Admin Portal
        </p>
        <h1 className="truncate text-base font-semibold text-zinc-900 md:text-lg dark:text-zinc-50">
          HR Management
        </h1>
      </div>

      <div className="min-w-0 flex-1 sm:hidden">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
          HR Management
        </p>
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Attendance System
        </p>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Notifications"
        >
          <Bell className="size-[1.125rem]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-1 pl-1 pr-2 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 sm:pr-3 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <Avatar className="size-8">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[7rem] truncate text-left text-sm font-medium text-zinc-800 sm:block dark:text-zinc-100">
                {displayName}
              </span>
              <ChevronDown className="hidden size-4 text-zinc-500 sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {displayName}
                </span>
                <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  {email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
