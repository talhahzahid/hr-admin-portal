"use client";

import { useEffect, useState } from "react";
import { Check, Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LeaveStatusBadge } from "@/features/leave-requests/components/leave-status-badge";
import { ReviewLeaveSheet } from "@/features/leave-requests/components/review-leave-sheet";
import type { LeaveRequest } from "@/types/leave-request";
import { api } from "@/lib/api";
import { getEmployeeLeave } from "@/api/attendance";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type LeaveRequestsListProps = {
  // requests: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
};

const tableHeaders = [
  {},
]

export function LeaveRequestsList({
  // requests,
  onApprove,
  onReject,
}: LeaveRequestsListProps) {
  const [selected, setSelected] = useState<LeaveRequest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const openReview = (request: LeaveRequest) => {
    setSelected(request);
    setSheetOpen(true);
  };

  const list = async () => {
    try {
      const response = await getEmployeeLeave();
      const leaves: LeaveRequest[] =
        response?.responseData?.leaves?.data?.map((item: any) => ({
          id: String(item.id),
          employeeId: String(item.userId),
          employeeName: item.userName,
          department: "",
          email: "",
          leaveType: item.leaveType,
          startDate: item.startDate,
          endDate: item.endDate,
          totalDays: item.maxDays,
          reason: item.leaveDescription,
          appliedAt: item.createdAt,
          status : item?.status,
          // status:
          //   item.status === "active"
          //     ? "approved"
          //     : item.status === "pending"
          //       ? "pending"
          //       : "rejected",
          userId: item.userId,
          maxDays: item.maxDays,
          userName: item.userName,
          leaveDescription: item.leaveDescription,
        })) || [];

      setRequests(leaves);
    } catch (error: any) {
      console.log(error);
    }
  };


  useEffect(() => {
    list()
  }, [])

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          No leave requests found
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-208 w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-5 py-3.5">Leave Type</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5">Applied</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {requests.map((request: LeaveRequest) => (
                <tr
                  key={request.id}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
                        {getInitials(request?.userName)}
                      </span>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {request?.userName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {request?.department} · {request?.userId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                    {request?.leaveType}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      {formatDate(request?.startDate)} – {formatDate(request?.endDate)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {request?.totalDays} {request?.totalDays === 1 ? "day" : "days"}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">
                    {formatDate(request?.createdAt?.split("T")[0])}
                  </td>
                  <td className="px-5 py-4">
                    {/* {request?.status} */}
                    <LeaveStatusBadge status={request?.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openReview(request)}
                        aria-label="View details"
                      >
                        <Eye className="size-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={() => onApprove(request.id)}
                            aria-label="Approve"
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            onClick={() => openReview(request)}
                            aria-label="Reject"
                          >
                            <X className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {requests.map((request: LeaveRequest) => (
          <article
            key={request.id}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
                  {getInitials(request?.employeeName)}
                </span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {request.employeeName}
                  </p>
                  <p className="text-xs text-slate-500">{request.leaveType}</p>
                </div>
              </div>
              <LeaveStatusBadge status={request.status} />
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {formatDate(request.startDate)} – {formatDate(request.endDate)} ·{" "}
              {request.totalDays}d
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => openReview(request)}
              >
                <Eye className="size-3.5" />
                Details
              </Button>
              {request.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => onApprove(request.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-rose-200 text-rose-600"
                    onClick={() => openReview(request)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      <ReviewLeaveSheet
        request={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onApprove={onApprove}
        onReject={onReject}
      />
    </>
  );
}
