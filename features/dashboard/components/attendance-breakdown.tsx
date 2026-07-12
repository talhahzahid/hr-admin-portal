type BreakdownSegment = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

type AttendanceBreakdownProps = {
  present?: number;
  onLeave?: number;
  absent?: number;
  late?: number;
};

function buildSegments({
  present = 0,
  onLeave = 0,
  absent = 0,
  late = 0,
}: AttendanceBreakdownProps): BreakdownSegment[] {
  const total = present + onLeave + absent + late;
  const pct = (value: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

  return [
    { label: "Present", value: present, percent: pct(present), color: "bg-emerald-500" },
    { label: "Late", value: late, percent: pct(late), color: "bg-orange-500" },
    { label: "On Leave", value: onLeave, percent: pct(onLeave), color: "bg-amber-500" },
    { label: "Absent", value: absent, percent: pct(absent), color: "bg-rose-500" },
  ].filter((seg) => seg.value > 0 || total === 0);
}

export function AttendanceBreakdown(props: AttendanceBreakdownProps) {
  const segments = buildSegments(props);
  const workforce = (props.present ?? 0) + (props.onLeave ?? 0) + (props.absent ?? 0) + (props.late ?? 0);
  const rate =
    workforce > 0
      ? (((props.present ?? 0) + (props.late ?? 0)) / workforce) * 100
      : 0;

  return (
    <div className="space-y-5">
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={seg.color}
            style={{ width: `${Math.max(seg.percent, seg.value > 0 ? 2 : 0)}%` }}
            title={`${seg.label}: ${seg.percent}%`}
          />
        ))}
      </div>

      <ul className="space-y-3">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <span className={`size-2.5 rounded-full ${seg.color}`} />
              {seg.label}
            </span>
            <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {seg.value}
              <span className="ml-1.5 text-xs font-normal text-slate-500">
                ({seg.percent}%)
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Today&apos;s rate
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900 tabular-nums dark:text-slate-50">
          {rate.toFixed(1)}%
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Based on {workforce} employees
        </p>
      </div>
    </div>
  );
}
