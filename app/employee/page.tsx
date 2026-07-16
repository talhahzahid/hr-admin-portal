"use client"
import { getEmployee } from '@/api/employee'
import { ListViewLayout } from '@/components/shared/list-view-layout'
import { PageHeader } from '@/components/shared/page-header'
import { RenderTable } from '@/components/ui/DynamiceTable'
import { Employees } from '@/interface/employee'
import { getAuthToken } from '@/lib/auth'
import React, { useEffect, useState } from 'react'

const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Designation",
    "Department",
    "Role",
    "Date Of Joining",
    "Status",
];


const Employee = () => {
    const [employee, setEmployee] = useState<Employees[]>([])
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
        setLoading(true)
        try {
            const response = await getEmployee()
            if (response?.success === true) {
                setEmployee(response?.data?.employees)
            } else {
                console.log(response?.message)
            }
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
                        tableData={employee}
                        loading={loading}
                    />
                </div>
            </div>

        </>
    )
}

export default Employee
