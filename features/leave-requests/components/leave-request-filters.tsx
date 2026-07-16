"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeaveRequestFilters } from "@/features/leave-requests/hooks/use-leave-requests";

const LEAVE_TYPES = [
  "all",
  "Annual Leave",
  "Sick Leave",
  "Casual Leave",
  "Unpaid Leave",
  "Maternity Leave",
] as const;

type Props = {
  filters: LeaveRequestFilters;
  onFiltersChange: (filters: LeaveRequestFilters) => void;
  onClear: () => void;
};

export function LeaveRequestFiltersBar({ filters, onFiltersChange, onClear }: Props) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_10rem_11rem_auto] lg:items-end">
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <Label htmlFor="leave-search" className="text-xs text-slate-600 dark:text-slate-400">
            Search employee
          </Label>
          <Input
            id="leave-search"
            placeholder="Name, ID, or department..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="h-10 bg-white dark:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-slate-600 dark:text-slate-400">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value as LeaveRequestFilters["status"],
              })
            }
          >
            <SelectTrigger className="h-10 bg-white dark:bg-slate-950">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-slate-600 dark:text-slate-400">Leave type</Label>
          <Select
            value={filters.leaveType}
            onValueChange={(value) => onFiltersChange({ ...filters, leaveType: value })}
          >
            <SelectTrigger className="h-10 bg-white dark:bg-slate-950">
              <SelectValue placeholder="Leave type" />
            </SelectTrigger>
            <SelectContent>
              {LEAVE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="h-10" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
