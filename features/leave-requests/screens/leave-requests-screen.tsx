"use client";

import { LeaveRequestFiltersBar } from "@/features/leave-requests/components/leave-request-filters";
import { LeaveRequestStats } from "@/features/leave-requests/components/leave-request-stats";
import { LeaveRequestsList } from "@/features/leave-requests/components/leave-requests-list";
import { useLeaveRequests } from "@/features/leave-requests/hooks/use-leave-requests";
import { PageHeader } from "@/components/shared/page-header";
import { RenderTable } from "@/components/ui/DynamiceTable";
import { useEffect, useState } from "react";
import { LeaveRequest } from "@/types";
import { ReviewLeaveSheet } from "../components/review-leave-sheet";
import { ListViewLayout } from "@/components/shared/list-view-layout";
import { getAuthToken } from "@/lib/auth";

const tableHeaders = [
  "Id",
  "Employee Name",
  "Leave Type",
  "Total Days",
  "Start Date",
  "End Date",
  "Status",
  "Action",
]

export function LeaveRequestsScreen() {
  const {
    requests,
    filters,
    setFilters,
    clearFilters,
    stats,
    approveRequest,
    rejectRequest,
  } = useLeaveRequests();


  const [leaveRequest, setLeaveRequest] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<LeaveRequest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const getAll = async () => {
    try {
      setLoading(true)
      const token = getAuthToken();
      const response = await fetch(`http://localhost:8000/leaves/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `AMS ${token}` } : {}),
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log("status", response.status);
      const data = await response.json();
      setLeaveRequest(data?.responseData?.leaves?.data ?? data?.data ?? [])
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAll()
  }, [])

  const handleView = (request: any) => {
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
          { value: "present", label: "Present" },
          { value: "absent", label: "Absent" },
          { value: "late", label: "Late" },
          { value: "half-day", label: "Half Day" },
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

      {/* sheet */}
      <ReviewLeaveSheet
        request={selectedRequest}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onApprove={approveRequest}
        onReject={rejectRequest}
        onRefresh={getAll}

      />


    </section>
  );
}
