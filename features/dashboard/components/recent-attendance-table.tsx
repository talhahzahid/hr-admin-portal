import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PendingLeave } from "@/api/dashboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RecentPendingLeavesProps = {
  leaves?: PendingLeave[];
  loading?: boolean;
};

function getInitials(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";
}

function getInitialsColor(name: string) {
  const colors = [
    "bg-slate-700 text-white",
    "bg-blue-600 text-white",
    "bg-indigo-600 text-white",
    "bg-teal-600 text-white",
  ];
  return colors[name.length % colors.length];
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RecentAttendanceTable({
  leaves = [],
  loading = false,
}: RecentPendingLeavesProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Pending Leave Requests
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Latest requests awaiting approval
          </p>
        </div>
        <Button variant="outline" size="sm" asChild className="h-9 shrink-0 gap-1.5">
          <Link href="/leave-requests">
            View all requests
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[40rem] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-400">
              <th className="px-4 py-3 sm:px-6">Employee</th>
              <th className="px-4 py-3 sm:px-6">Type</th>
              <th className="px-4 py-3 sm:px-6">Dates</th>
              <th className="px-4 py-3 text-right sm:px-6">Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-slate-500 sm:px-6"
                >
                  Loading pending leaves...
                </td>
              </tr>
            ) : leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-slate-500 sm:px-6"
                >
                  No pending leave requests
                </td>
              </tr>
            ) : (
              leaves.slice(0, 5).map((leave) => {
                const name = `${leave.employee?.firstName ?? ""} ${leave.employee?.lastName ?? ""}`.trim();
                return (
                  <tr
                    key={leave.id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            getInitialsColor(name)
                          )}
                        >
                          {getInitials(
                            leave.employee?.firstName,
                            leave.employee?.lastName
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {name || `Employee #${leave.employeeId}`}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {leave.employee?.departmentName || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 sm:px-6 dark:text-slate-400">
                      {leave.leaveType}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 sm:px-6 dark:text-slate-400">
                      {formatDate(leave.startDate)} – {formatDate(leave.endDate)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium tabular-nums text-slate-700 sm:px-6 dark:text-slate-300">
                      {leave.totalDays}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
