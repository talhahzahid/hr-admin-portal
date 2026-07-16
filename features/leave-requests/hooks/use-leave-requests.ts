"use client";

import { useCallback, useMemo, useState } from "react";

import { MOCK_LEAVE_REQUESTS } from "@/features/leave-requests/data/mock-leave-requests";
import type { LeaveRequest } from "@/types/leave-request";

export type LeaveRequestFilters = {
  search: string;
  status: LeaveRequest["status"] | "all";
  leaveType: string;
};

const defaultFilters: LeaveRequestFilters = {
  search: "",
  status: "all",
  leaveType: "all",
};

export function useLeaveRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [filters, setFilters] = useState<LeaveRequestFilters>(defaultFilters);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        filters.search.trim() === "" ||
        request.employeeName.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.employeeId.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.department.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || request.status === filters.status;

      const matchesType =
        filters.leaveType === "all" || request.leaveType === filters.leaveType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, filters]);

  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    return { pending, approved, rejected, total: requests.length };
  }, [requests]);

  const approveRequest = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Admin User",
              rejectionReason: undefined,
            }
          : request
      )
    );
  }, []);

  const rejectRequest = useCallback((id: string, rejectionReason: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "rejected" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Admin User",
              rejectionReason,
            }
          : request
      )
    );
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    requests: filteredRequests,
    allRequests: requests,
    filters,
    setFilters,
    clearFilters,
    stats,
    approveRequest,
    rejectRequest,
  };
}
