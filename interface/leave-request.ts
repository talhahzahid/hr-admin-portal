export interface LeaveRequests {
  id: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  session: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy: number | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequestListResponse {
  success: boolean;
  message: string;
  data: {
    leaveRequests: LeaveRequests[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
