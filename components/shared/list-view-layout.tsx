import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ListViewLayoutProps = {
  searchPlaceholder?: string;
  statusOptions?: { value: string; label: string }[];
};

const defaultStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "leave", label: "On Leave" },
];

export function ListViewLayout({
  searchPlaceholder = "Search employees...",
  statusOptions = defaultStatusOptions,
}: ListViewLayoutProps) {
  return (
    <div className="rounded-2xl border bg-muted/20 p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_180px_120px_140px] items-end">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by name or employee ID..."
            className="h-10"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear */}
        <Button variant="outline" className="h-10">
          Clear
        </Button>

        {/* Export */}
        <Button variant="outline" className="h-10">
          Export XLS
        </Button>
      </div>
    </div>
  );
}
