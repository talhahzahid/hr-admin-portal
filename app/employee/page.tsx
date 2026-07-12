"use client"
import { ListViewLayout } from '@/components/shared/list-view-layout'
import { PageHeader } from '@/components/shared/page-header'
import { RenderTable } from '@/components/ui/DynamiceTable'
import { getAuthToken } from '@/lib/auth'
import React, { useEffect, useState } from 'react'

const headers = [
    "ID",
    "Employee Name",
    "Email",
    "Designation",
    "Department",
    "Date Of Joining",
    "Status",
];


const Employee = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([])
    const [loading, setLoading] = useState(false)


    const getAll = async () => {
        try {
            setLoading(true)
            const token = getAuthToken();
            const response = await fetch(`http://localhost:8000/users/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `AMS ${token}` } : {}),
                    "ngrok-skip-browser-warning": "true",
                },
            });
            console.log("status", response.status);
            const data = await response.json();
            setAttendanceRecords(data?.responseData?.users?.data ?? data?.data ?? [])
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            <PageHeader
                label="HR Operations"
                title="All Employee Listing"
                description="All Employee Listing For Our Company"
            />

            <div className='mb-5'>
                <ListViewLayout
                    searchPlaceholder="Search by name or employee ID..."
                    statusOptions={[
                        { value: "all", label: "All Status" },
                        { value: "present", label: "Present" },
                        { value: "absent", label: "Absent" },
                        { value: "late", label: "Late" },
                        { value: "half-day", label: "Half Day" },
                    ]}
                />

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className="overflow-x-auto p-1 sm:p-3">
                    <RenderTable
                        tableName="employeeTable"
                        tableHeaders={headers}
                        tableData={attendanceRecords}
                        loading={loading}
                    />
                </div>
            </div>

        </>
    )
}

export default Employee