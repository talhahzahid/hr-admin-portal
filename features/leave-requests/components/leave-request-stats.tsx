import { CheckCircle2, Clock, XCircle } from "lucide-react";

type LeaveRequestStatsProps = {
  pending: number;
  approved: number;
  rejected: number;
};

export function LeaveRequestStats({ pending, approved, rejected }: LeaveRequestStatsProps) {
  const items = [
    {
      label: "Pending Review",
      value: pending,
      icon: Clock,
      accent: "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/30",
      iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle2,
      accent: "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/30",
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      accent: "border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30",
      iconClass: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.label}
          className={`rounded-xl border p-4 shadow-sm ${item.accent}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                {item.value}
              </p>
            </div>
            <item.icon className={`size-8 ${item.iconClass}`} strokeWidth={1.5} />
          </div>
        </article>
      ))}
    </div>
  );
}
