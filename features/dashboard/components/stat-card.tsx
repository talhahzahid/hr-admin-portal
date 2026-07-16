import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  hint: string;
  icon: LucideIcon;
  accent: "blue" | "emerald" | "amber" | "violet";
};

const accentStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-900/50",
    bar: "bg-blue-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-900/50",
    bar: "bg-emerald-500",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-950/60 dark:text-amber-400 dark:ring-amber-900/50",
    bar: "bg-amber-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-950/60 dark:text-violet-400 dark:ring-violet-900/50",
    bar: "bg-violet-500",
  },
};

export function StatCard({ label, value, hint, icon: Icon, accent }: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <article className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className={cn("absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100", styles.bar)} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-3">
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-[1.75rem] font-semibold leading-none tracking-tight text-slate-900 tabular-nums dark:text-slate-50">
            {value}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        </div>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
            styles.icon
          )}
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}
