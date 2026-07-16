import type { LeaveRequestStatus } from "@/types/leave-request";
import { cn } from "@/lib/utils";

const statusStyles: Record<LeaveRequestStatus, string> = {
  Pending:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300",
  Approved:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300",
  Rejected:
    "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-950/40 dark:text-rose-300",
};

const statusLabels: Record<LeaveRequestStatus, string> = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
};

function normalizeStatus(status: string): LeaveRequestStatus {
  const normalized =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (
    normalized === "Pending" ||
    normalized === "Approved" ||
    normalized === "Rejected"
  ) {
    return normalized;
  }
  return "Pending";
}

export function LeaveStatusBadge({ status }: { status: string }) {
  const normalizedStatus = normalizeStatus(status);
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        statusStyles[normalizedStatus]
      )}
    >
      {statusLabels[normalizedStatus]}
    </span>
  );
}
