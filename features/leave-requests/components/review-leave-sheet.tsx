"use client";

import { useState } from "react";
import { Calendar, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LeaveStatusBadge } from "@/features/leave-requests/components/leave-status-badge";
import type { LeaveRequest } from "@/types/leave-request";
import { cn } from "@/lib/utils";
import { updateLeaveStatus } from "@/api/attendance";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// type ReviewLeaveSheetProps = {
//   request: LeaveRequest | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onApprove: (id: string) => void;
//   onReject: (id: string, reason: string) => void;
// };

type ReviewLeaveSheetProps = {
  request: LeaveRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onRefresh: () => Promise<void>;

};

export function ReviewLeaveSheet({
  request,
  open,
  onOpenChange,
  onApprove,
  onReject,
  onRefresh
}: ReviewLeaveSheetProps) {
  console.log(request)
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowRejectForm(false);
    setRejectReason("");
    onOpenChange(false);
  };


  const handleReject = async () => {
    if (!request || rejectReason.trim().length < 5) return;

    try {
      setLoading(true);

      await updateLeaveStatus(
        String(request?.id),
        Number(request?.userId),
        "rejected"
      );

      onReject(request.id, rejectReason.trim());
      handleClose();
    } catch (error) {
      console.error("Reject Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!request) return;

    try {
      setLoading(true);

      await updateLeaveStatus(
        request?.id,
        request?.userId,
        "approved"
      );
      // onApprove(request?.id);
      await onRefresh();
      handleClose();
    } catch (error) {
      console.error("Approve Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleApprove = () => {
  //   if (!request) return;
  //   onApprove(request.id);
  //   handleClose();
  // };

  if (!request) return null;

  const isPending = request.status === "pending";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <SheetTitle className="text-left">Leave Request Details</SheetTitle>
          <SheetDescription className="text-left">
            Request ID: {request?.userId}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {request?.userName}
              </p>
              <p className="text-sm text-slate-500">{request?.department}</p>
            </div>
            <LeaveStatusBadge status={request?.status} />
          </div>

          <dl className="grid gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <User className="size-4 shrink-0" />
              <span>{request?.userId}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Mail className="size-4 shrink-0" />
              <span>{request?.email || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="size-4 shrink-0" />
              <span>
                {formatDate(request?.startDate)} — {formatDate(request?.endDate)} (
                {request?.maxDays} {request?.maxDays === 1 ? "day" : "days"})
              </span>
            </div>
          </dl>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Leave type
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {request?.leaveType}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Reason
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {request?.leaveDescription}
            </p>
          </div>

          {/* {request.rejectionReason && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                Rejection reason
              </p>
              <p className="mt-1 text-sm text-rose-800 dark:text-rose-300">
                {request.rejectionReason}
              </p>
            </div>
          )} */}

          {showRejectForm && isPending && (
            <div className="space-y-2">
              <label
                htmlFor="reject-reason"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Rejection reason (required)
              </label>
              <textarea
                id="reject-reason"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain why this request is rejected..."
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none",
                  "focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950"
                )}
              />
            </div>
          )}
        </div>

        {isPending && (
          <SheetFooter className="flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-col dark:border-slate-800">
            {!showRejectForm ? (
              <>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={loading}
                  onClick={handleApprove}
                >
                  {loading ? "Processing..." : "Approve Leave"}
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={loading}
                  onClick={() => setShowRejectForm(true)}
                >
                  Reject Leave
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={loading || rejectReason.trim().length < 5}
                  onClick={handleReject}
                >
                  {loading ? "Processing..." : "Confirm Rejection"}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  disabled={loading}
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectReason("");
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
