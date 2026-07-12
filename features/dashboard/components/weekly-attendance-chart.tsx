type MonthStat = {
  label: string;
  value: number;
  color: string;
};

type MonthlyAttendanceOverviewProps = {
  present?: number;
  late?: number;
  halfDay?: number;
  checkedOut?: number;
  totalRecords?: number;
};

export function WeeklyAttendanceChart({
  present = 0,
  late = 0,
  halfDay = 0,
  checkedOut = 0,
  totalRecords = 0,
}: MonthlyAttendanceOverviewProps) {
  const stats: MonthStat[] = [
    { label: "Present", value: present, color: "from-emerald-600 to-emerald-400" },
    { label: "Late", value: late, color: "from-orange-600 to-orange-400" },
    { label: "Half Day", value: halfDay, color: "from-amber-600 to-amber-400" },
    { label: "Checked Out", value: checkedOut, color: "from-blue-600 to-blue-400" },
  ];

  const maxValue = Math.max(...stats.map((s) => s.value), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3 sm:gap-4">
        {stats.map((item) => {
          const height = Math.max((item.value / maxValue) * 100, item.value > 0 ? 8 : 2);
          return (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500 tabular-nums dark:text-slate-400">
                {item.value}
              </span>
              <div className="flex h-28 w-full max-w-14 items-end justify-center sm:h-32">
                <div
                  className={`w-full max-w-12 rounded-t-md bg-linear-to-t ${item.color} shadow-sm`}
                  style={{ height: `${height}%` }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>
              <span className="text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>
          Total records:{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            {totalRecords}
          </strong>
        </span>
        <span>
          Present share:{" "}
          <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
            {totalRecords > 0 ? Math.round((present / totalRecords) * 100) : 0}%
          </strong>
        </span>
      </div>
    </div>
  );
}
