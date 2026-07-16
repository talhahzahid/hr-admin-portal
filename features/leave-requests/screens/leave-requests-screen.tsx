"use client";

import { useEffect, useState } from "react";

import { getAllLeave } from "@/api/leave";
import { ListViewLayout } from "@/components/shared/list-view-layout";
import { PageHeader } from "@/components/shared/page-header";
import { RenderTable } from "@/components/ui/DynamiceTable";
import { ReviewLeaveSheet } from "@/features/leave-requests/components/review-leave-sheet";
import type { LeaveRequests } from "@/interface/leave-request";

const tableHeaders = [
  "Id",
  "Employee Id",
  "Leave Type",
  "Total Days",
  "Start Date",
  "End Date",
  "Status",
  "Action",
];

export function LeaveRequestsScreen() {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequests[]>([]);
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequests | null>(
    null
  );

  const getAll = async () => {
    try {
      setLoading(true);
      const response = await getAllLeave();
      if (response?.success === true) {
        setLeaveRequest(response?.data?.leaveRequests ?? []);
      } else {
        setLeaveRequest([]);
        console.log(response?.message);
      }
    } catch (error) {
      console.log(error);
      setLeaveRequest([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleView = (request: LeaveRequests) => {
    setSelectedRequest(request);
    setSheetOpen(true);
  };

  return (
    <section className="space-y-6">
      <PageHeader
        label="HR Operations"
        title="Leave Requests"
        description="Review employee leave applications. Approve or reject requests with a documented reason."
      />

      <ListViewLayout
        searchPlaceholder="Search by name or employee ID..."
        statusOptions={[
          { value: "all", label: "All Status" },
          { value: "Pending", label: "Pending" },
          { value: "Approved", label: "Approved" },
          { value: "Rejected", label: "Rejected" },
        ]}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto p-1 sm:p-3">
          <RenderTable
            tableName="leaveRequestTable"
            tableHeaders={tableHeaders}
            tableData={leaveRequest}
            loading={loading}
            onView={handleView}
          />
        </div>
      </div>

      <ReviewLeaveSheet
        request={selectedRequest}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onRefresh={getAll}
      />
    </section>
  );
}
