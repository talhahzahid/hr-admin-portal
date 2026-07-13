'use client';

import { Check, Eye, Loader2, X } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./table";
import { Button } from "./button";
import { LeaveStatusBadge } from "@/features/leave-requests/components/leave-status-badge";

interface TableProps {
    tableHeaders: string[];
    tableData: any[];
    loading?: boolean
    onView?: (item: any) => void;

}

interface HeaderProps {
    headers: string[];
}

interface TableRenderProps {
    tableName: string,
    tableHeaders: string[];
    tableData: any[];
    loading?: any;
    onView?: (item: any) => void;

}



export const TableHeaderData = ({ headers }: HeaderProps) => {
    return (
        <TableHeader>
            <TableRow>
                {headers?.map((item, index) => {
                    return (
                        <TableHead key={index}>{item}</TableHead>
                    )
                })}
            </TableRow>
        </TableHeader>
    );
};

export const UserLeavesTable = ({ tableHeaders, tableData }: TableProps) => {
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {tableData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{row.employee}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.total}</TableCell>
                        <TableCell>{row.used}</TableCell>
                        <TableCell className="">{row.remaining}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export const AttendanceTable = ({ tableHeaders, tableData, loading }: TableProps) => {
    const colSpan = tableHeaders?.length
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {
                    loading ? (
                        <TableRow>
                            <TableCell colSpan={colSpan} className="h-32">
                                <div className="flex justify-center items-center">
                                    <Loader2 className="animate-spin h-4 w-5" />
                                    <span>Loading Attendance</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        tableData?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={colSpan}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No attendance record found
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.userId}</TableCell>
                                    <TableCell className="font-medium">{item.userName || "-"}</TableCell>
                                    <TableCell className="">{item.createdAt || "-"}</TableCell>
                                    <TableCell className="">{item.checkInTime || "-"}</TableCell>
                                    <TableCell className="">{item.checkOutTime || "-"}</TableCell>
                                    <TableCell className="">{item.workHours || "-"}</TableCell>
                                    <TableCell className="">{item.status || "-"}</TableCell>
                                </TableRow>
                            ))
                        )
                    )
                }
                {/* {tableData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.userId}</TableCell>
                        <TableCell className="font-medium">{item.userName}</TableCell>
                        <TableCell className="">{item.createdAt}</TableCell>
                        <TableCell className="">{item.checkInTime}</TableCell>
                        <TableCell className="">{item.checkOutTime}</TableCell>
                        <TableCell className="">{item.workHours}</TableCell>
                        <TableCell className="">{item.status}</TableCell>
                    </TableRow>
                ))} */}
            </TableBody>
        </Table>
    );
};

export const EmployeeTable = ({ tableHeaders, tableData, loading }: TableProps) => {
    const colSpan = tableHeaders.length;
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {
                    loading ? (
                        <TableRow>
                            <TableCell colSpan={colSpan} className="h-32">
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Loading employees...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        tableData?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={colSpan}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No employees found
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item?.firstName}</TableCell>
                                    <TableCell>{item?.lastName}</TableCell>
                                    <TableCell>{item?.email}</TableCell>
                                    <TableCell>{item?.designation}</TableCell>
                                    <TableCell className="">{item?.departmentName}</TableCell>
                                    <TableCell className="">{item?.roleName}</TableCell>
                                    <TableCell className="">{new Date(item?.dateOfJoining).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${item.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {item.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    )
                }
                {/* {tableData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.designation}</TableCell>
                        <TableCell className="">{item.departmentName}</TableCell>
                        <TableCell className="">{item.dateOfJoining}</TableCell>
                        <TableCell className="">{item.isActive === true ? 'Active' : "In Active"}</TableCell>
                    </TableRow>
                ))} */}
            </TableBody>
        </Table>
    );
};

export const LeaveRequestTable = ({ tableHeaders, tableData, loading, onView }: TableProps) => {
    const colSpan = tableHeaders?.length;
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {
                    loading ? (
                        <TableRow>
                            <TableCell colSpan={colSpan} className="h-32">
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Loading leaves request...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        tableData?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={colSpan}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No leaves found
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell>{item.leaveType}</TableCell>
                                    <TableCell>{item.maxDays}</TableCell>
                                    <TableCell className="">{new Date(item.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="">{new Date(item.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <LeaveStatusBadge status={item?.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                onClick={() => onView?.(item)}
                                                aria-label="View details"
                                            >
                                                <Eye className="size-4" />
                                            </Button>
                                            {item.status === "pending" && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                                                        // onClick={() => onApprove(request.id)}
                                                        aria-label="Approve"
                                                    >
                                                        <Check className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                                                        // onClick={() => openReview(request)}
                                                        aria-label="Reject"
                                                    >
                                                        <X className="size-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    )
                }
            </TableBody>
        </Table>
    );
};


export const RenderTable = ({ tableName,
    tableHeaders,
    tableData,
    loading,
    onView, }: TableRenderProps) => {
    return (
        <>
            {tableName === 'leaveTable'
                && (
                    <UserLeavesTable tableHeaders={tableHeaders} tableData={tableData} />)}
            {tableName === 'attendanceTable'
                && (
                    <AttendanceTable tableHeaders={tableHeaders} tableData={tableData} loading={loading} />)}
            {tableName === 'employeeTable'
                && (
                    <EmployeeTable tableHeaders={tableHeaders} tableData={tableData} loading={loading} />)}
            {tableName === 'leaveRequestTable'
                && (
                    <LeaveRequestTable tableHeaders={tableHeaders} tableData={tableData} loading={loading} onView={onView} />)}
        </>
    )
}