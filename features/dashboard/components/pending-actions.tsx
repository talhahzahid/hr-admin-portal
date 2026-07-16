import Link from "next/link";
import { CalendarDays, ChevronRight, FileCheck, Users } from "lucide-react";

type PendingActionsProps = {
  pendingLeaves?: number;
  inactiveEmployees?: number;
  stillWorking?: number;
};

export function PendingActions({
  pendingLeaves = 0,
  inactiveEmployees = 0,
  stillWorking = 0,
}: PendingActionsProps) {
  const items = [
    {
      title: "Leave requests pending",
      count: pendingLeaves,
      href: "/leave-requests",
      icon: CalendarDays,
      urgent: pendingLeaves > 0,
    },
    {
      title: "Still working today",
      count: stillWorking,
      href: "/attendance",
      icon: FileCheck,
      urgent: false,
    },
    {
      title: "Inactive employees",
      count: inactiveEmployees,
      href: "/employee",
      icon: Users,
      urgent: false,
    },
  ];

  const total = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
          Pending Actions
        </h2>
        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
          {total} total
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                  item.urgent
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                <item.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                  {item.title}
                </span>
                <span className="text-xs text-slate-500">
                  {item.count} {item.count === 1 ? "item" : "items"}
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
