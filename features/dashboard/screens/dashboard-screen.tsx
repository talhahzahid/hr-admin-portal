"use client";

import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  dashboardCount,
  extractDashboardData,
  type DashboardData,
} from "@/api/dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { AttendanceBreakdown } from "@/features/dashboard/components/attendance-breakdown";
import { PendingActions } from "@/features/dashboard/components/pending-actions";
import { RecentAttendanceTable } from "@/features/dashboard/components/recent-attendance-table";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { WeeklyAttendanceChart } from "@/features/dashboard/components/weekly-attendance-chart";
import { getAuthDisplayName } from "@/lib/auth";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const employees = data?.employees;
  const attendance = data?.attendanceToday;
  const month = data?.attendanceThisMonth;
  const leaves = data?.leaves;

  const totalEmployees = employees?.total ?? 0;
  const presentToday = attendance?.present ?? 0;
  const absentToday = attendance?.absent ?? 0;
  const lateToday = attendance?.late ?? 0;
  const pendingLeaves = leaves?.pendingApproval ?? 0;
  const workforce = totalEmployees || presentToday + absentToday + lateToday;
  const attendanceRate =
    workforce > 0
      ? (((presentToday + lateToday) / workforce) * 100).toFixed(1)
      : "0.0";

  useEffect(() => {
    setAdminName(getAuthDisplayName());

    const load = async () => {
      try {
        setLoading(true);
        const response = await dashboardCount();
        setData(extractDashboardData(response));
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        label="HR Operations"
        title={`${getGreeting()}, ${adminName}`}
        description={`${formattedDate} — Monitor workforce attendance, leave balances, and daily operations.`}
        action={
          <Button asChild className="h-10">
            <Link href="/register">
              <UserPlus className="size-4" />
              Add Employee
            </Link>
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Employees"
          value={loading ? "—" : totalEmployees}
          hint={`${employees?.active ?? 0} active · ${employees?.inactive ?? 0} inactive`}
          icon={Users}
          accent="blue"
        />
        <StatCard
          label="Present Today"
          value={loading ? "—" : presentToday}
          hint={`${attendanceRate}% attendance rate`}
          icon={CalendarCheck}
          accent="emerald"
        />
        <StatCard
          label="Absent Today"
          value={loading ? "—" : absentToday}
          hint={`${lateToday} marked late`}
          icon={CalendarDays}
          accent="amber"
        />
        <StatCard
          label="Pending Leaves"
          value={loading ? "—" : pendingLeaves}
          hint={`${leaves?.approvedThisMonth ?? 0} approved this month`}
          icon={Clock}
          accent="violet"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-3 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                This Month Overview
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Attendance summary for the current month
              </p>
            </div>
            <span className="w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              {data?.month && data?.year
                ? `${data.month}/${data.year}`
                : "Current month"}
            </span>
          </div>
          <WeeklyAttendanceChart
            present={month?.present}
            late={month?.late}
            halfDay={month?.halfDay}
            checkedOut={month?.checkedOut}
            totalRecords={month?.totalRecords}
          />
        </article>

        <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Today&apos;s Breakdown
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Live attendance distribution
            </p>
          </div>
          <AttendanceBreakdown
            present={presentToday}
            late={lateToday}
            absent={absentToday}
            onLeave={0}
          />
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentAttendanceTable
            leaves={data?.recentPendingLeaves}
            loading={loading}
          />
        </div>
        <PendingActions
          pendingLeaves={pendingLeaves}
          inactiveEmployees={employees?.inactive}
          stillWorking={attendance?.stillWorking}
        />
      </section>
    </div>
  );
}
