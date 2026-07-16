export type LeaveRequestStatus = "Pending" | "Approved" | "Rejected";

export type LeaveType =
  | "Annual Leave"
  | "Sick Leave"
  | "Casual Leave"
  | "Unpaid Leave"
  | "Maternity Leave";

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  leaveDescription: string;
  createdAt: string;
  userName: string;
  department: string;
  userId: number;
  maxDays: number;
  status: "pending" | "approved" | "rejected";
};
