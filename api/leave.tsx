import { LeaveRequestListResponse } from "@/interface/leave-request";
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

export type LeaveActionStatus = "approve" | "reject";

export type LeaveActionPayload = {
    approvedBy: number;
    rejectionReason?: string;
};

export type LeaveActionResponse = {
    success?: boolean;
    message?: string;
    data?: unknown;
};

export const leaveBalance = async (): Promise<LeaveBalanceResponse> => {
    return api({
        endpoint: "/leaves/leaveBalance",
    });
};

export const getAllLeave = async (): Promise<LeaveRequestListResponse> => {
    return api({
        endpoint: "/api/v2/get-all",
    });
};

export const leaveRequest = async ({
    id,
    status,
    approvedBy,
    rejectionReason,
}: {
    id: number;
    status: LeaveActionStatus;
    approvedBy: number;
    rejectionReason?: string;
}): Promise<LeaveActionResponse> => {
    const payload: LeaveActionPayload = {
        approvedBy,
        ...(status === "reject"
            ? { rejectionReason: rejectionReason?.trim() || "" }
            : {}),
    };

    return api({
        endpoint: `/api/v2/leave-request/${id}/${status}`,
        options: {
            method: "PATCH",
            body: JSON.stringify(payload),
        },
    });
};
