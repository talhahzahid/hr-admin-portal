import { api } from "@/lib/api";

export interface EmployeeStats {
  total: number;
  active: number;
  inactive: number;
}

export interface AttendanceToday {
  present: number;
  late: number;
  halfDay: number;
  checkedIn: number;
  checkedOut: number;
  stillWorking: number;
  absent: number;
}

export interface AttendanceThisMonth {
  totalRecords: number;
  present: number;
  late: number;
  halfDay: number;
  checkedOut: number;
}

export interface LeaveTypeStats {
  count: number;
  days: number;
}

export interface LeaveStats {
  pendingApproval: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  totalThisMonth: number;
  byTypeThisMonth: Record<string, LeaveTypeStats>;
}

export interface PendingLeaveEmployee {
  id: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  designation: string;
}

export interface PendingLeave {
  id: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  session: string;
  reason: string;
  status: string;
  approvedBy: number | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  employee: PendingLeaveEmployee;
}

export interface DashboardData {
  today: string;
  month: number;
  year: number;
  range: {
    startDate: string;
    endDate: string;
  };
  employees: EmployeeStats;
  attendanceToday: AttendanceToday;
  attendanceThisMonth: AttendanceThisMonth;
  leaves: LeaveStats;
  recentPendingLeaves: PendingLeave[];
}

export interface DashboardCountResponse {
  success?: boolean;
  code?: string;
  message: string;
  data?: DashboardData;
  responseData?: {
    data: DashboardData;
  };
}

export function extractDashboardData(
  response: DashboardCountResponse | null | undefined
): DashboardData | null {
  return response?.data ?? response?.responseData?.data ?? null;
}

export const dashboardCount = async (): Promise<DashboardCountResponse> => {
  return api({
    endpoint: "/api/v4/dashboard",
  });
};
