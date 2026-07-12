import { api } from "@/lib/api";

export interface LeaveBalanceItem {
    name: string;
    usedLeaves: number;
    totalLeaves: number;
    department: string;
    remainingLeaves: number;
}

export interface LeaveBalanceResponse {
    code: string;
    message: string;
    responseData: {
        data: LeaveBalanceItem[];
    };
}

// import { api } from "@/lib/api";
// import { LeaveBalanceResponse } from "@/types/leave";

export const leaveBalance = async (): Promise<LeaveBalanceResponse> => {
    return api({
        endpoint: "/leaves/leaveBalance",
    });
};