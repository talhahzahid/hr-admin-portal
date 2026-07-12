import type { ReactNode } from "react";

type PageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({
  label,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-1">
        {label ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
            {label}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
