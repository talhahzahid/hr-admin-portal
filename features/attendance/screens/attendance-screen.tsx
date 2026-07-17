"use client"
import { RenderTable } from "@/components/ui/DynamiceTable";
import { ListViewLayout } from "@/components/shared/list-view-layout";
import { PageHeader } from "@/components/shared/page-header";
import { getAuthToken } from "@/lib/auth";
import { useEffect, useState } from "react";

const headers = [
  "Employee ID",
  // "Employee Name",
  // "Department",
  // "Date",
  "Date",
  "Check In",
  "Check Out",
  "Working Hours",
  "Status",
  // "Remarks",
];

const attendanceData = [
  {
    id: 1,
    name: "Ali Khan",
    employeeId: "EMP-001",
    department: "IT",
    date: "2026-05-01",
    checkIn: "09:05 AM",
    checkOut: "06:10 PM",
    workingHours: "9h 05m",
    status: "Present",
    remarks: "On time",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    employeeId: "EMP-002",
    department: "HR",
    date: "2026-05-01",
    checkIn: "09:25 AM",
    checkOut: "06:00 PM",
    workingHours: "8h 35m",
    status: "Late",
    remarks: "Traffic delay",
  },
  {
    id: 3,
    name: "Usman Tariq",
    employeeId: "EMP-003",
    department: "Finance",
    date: "2026-05-01",
    checkIn: "-",
    checkOut: "-",
    workingHours: "0h",
    status: "Absent",
    remarks: "Not reported",
  },
  {
    id: 4,
    name: "Hina Shah",
    employeeId: "EMP-004",
    department: "Marketing",
    date: "2026-05-01",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    workingHours: "4h",
    status: "Half Day",
    remarks: "Personal leave",
  },
];

export function AttendanceScreen() {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loading, setLoading] = useState(false)

  const getAll = async () => {
    try {
      setLoading(true)
      const token = getAuthToken();
      const response = await fetch(`https://hr-backend-1y26.onrender.com/api/v3/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log("status", response.status);
      const data = await response.json();
      setAttendanceRecords(data?.data?.attendances ?? data?.data ?? [])
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

  return (
    <section className="space-y-4 md:space-y-6">
      <PageHeader
        label="HR Operations"
        title="Attendance"
        description="View daily check-in, check-out records and working hours for all employees."
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
            tableName="attendanceTable"
            tableHeaders={headers}
            tableData={attendanceRecords}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}
