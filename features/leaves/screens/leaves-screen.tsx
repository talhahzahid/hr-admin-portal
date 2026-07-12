'use client'
import { useEffect, useState } from "react";
import { RenderTable } from "@/components/shared/data-table/dynamic-table";
import { ListViewLayout } from "@/components/shared/list-view-layout";
import { PageHeader } from "@/components/shared/page-header";
import { leaveBalance, LeaveBalanceItem } from "@/api/leave";
// import { leaveBalance } from "@/services/leave";
// import { LeaveBalanceItem } from "@/types/leave";

const headers = [
  "Employee",
  "Department",
  "Total Leaves",
  "Used",
  "Remaining",
];

export function LeavesScreen() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getLeaveBalance = async () => {
    try {
      setLoading(true);

      const res = await leaveBalance();

      const formattedData = res.responseData.data.map(
        (item: LeaveBalanceItem) => ({
          employee: item.name,
          department: item.department,
          total: item.totalLeaves,
          used: item.usedLeaves,
          remaining: item.remainingLeaves,
        })
      );

      setTableData(formattedData);
    } catch (error) {
      console.error("Failed to fetch leave balance", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaveBalance();
  }, []);

  return (
    <section className="space-y-4 md:space-y-6">
      <PageHeader
        label="HR Operations"
        title="Leave Balances"
        description="Track leave balances, usage, and remaining days across departments."
      />

      <ListViewLayout
        searchPlaceholder="Search employee or department..."
        statusOptions={[
          { value: "all", label: "All Departments" },
          { value: "hr", label: "HR" },
          { value: "it", label: "IT" },
          { value: "finance", label: "Finance" },
        ]}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto p-1 sm:p-3">
          <RenderTable
            tableName="leaveTable"
            tableHeaders={headers}
            tableData={tableData}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}