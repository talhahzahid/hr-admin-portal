import { api } from "@/lib/api";

export const getEmployeeLeave = async () => {
  return api({
    endpoint: "/leaves/list",
  });
};

export const updateLeaveStatus = async (
  id: string,
  userId: any,
  status: "approved" | "rejected",
) => {
  return api({
    endpoint: "/leaves/updateStatus",
    options: {
      method: "POST",
      body: JSON.stringify({
        id,
        userId,
        status,
      }),
    },
  });
};
