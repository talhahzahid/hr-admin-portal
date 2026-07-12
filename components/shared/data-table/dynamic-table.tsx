'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface TableProps {
    tableHeaders: string[];
    tableData: any[];
    loading: boolean
}

interface HeaderProps {
    headers: string[];
}

interface TableRenderProps {
    tableName: string,
    tableHeaders: string[];
    tableData: any[];
    loading: any
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

export const UserLeavesTable = ({ tableHeaders, tableData, loading }: TableProps) => {
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {loading ? (<TableRow>
                    <TableCell colSpan={tableHeaders.length} className="text-center">
                        <Loader2 className="animate-spin mx-auto" />
                    </TableCell>
                </TableRow>) : tableData?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={tableHeaders.length} className="text-center">
                            No Data Found
                        </TableCell>
                    </TableRow>
                ) :
                    tableData?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.employee}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.total}</TableCell>
                            <TableCell>{row.used}</TableCell>
                            <TableCell className="">{row.remaining}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    );
};

export const AttendanceTable = ({
    tableHeaders,
    tableData,
    loading,
}: TableProps) => {
    return (
        <Table>
            <TableHeaderData headers={tableHeaders} />
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={tableHeaders.length} className="text-center">
                            <Loader2 className="animate-spin mx-auto" />
                        </TableCell>
                    </TableRow>
                ) : tableData?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={tableHeaders.length} className="text-center">
                            No Data Found
                        </TableCell>
                    </TableRow>
                ) : (
                    tableData?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell className="font-medium">{item.userName}</TableCell>
                            <TableCell className="">{item.createdAt}</TableCell>
                            <TableCell className="">{item.checkInTime}</TableCell>
                            <TableCell className="">{item.checkOutTime}</TableCell>
                            <TableCell className="">{item.workHours}</TableCell>
                            <TableCell className="">{item.status}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};


export const RenderTable = ({ tableName, tableHeaders, tableData, loading }: TableRenderProps) => {
    return (
        <>
            {tableName === 'leaveTable'
                && (
                    <UserLeavesTable tableHeaders={tableHeaders} tableData={tableData} loading={loading} />)}
            {tableName === 'attendanceTable'
                && (
                    <AttendanceTable tableHeaders={tableHeaders} tableData={tableData} loading={loading} />)}
        </>
    )
}