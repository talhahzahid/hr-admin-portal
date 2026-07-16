import { EmployeeListResponse } from "@/interface/employee";
import { api } from "@/lib/api";
import type { RegisterFormValues } from "@/schemas/register.schema";

export type CreateEmployeePayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  departmentName: string;
  roleName: string;
  designation: string;
  dateOfJoining: string;
  isActive: boolean;
};

export type CreateEmployeeResponse = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: unknown;
};

export const createEmployee = async (
  payload: CreateEmployeePayload,
): Promise<CreateEmployeeResponse> => {
  return api({
    endpoint: "/api/v1/create",
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
};

export function toCreateEmployeePayload(
  values: RegisterFormValues,
): CreateEmployeePayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    password: values.password,
    phone: values.phone.trim(),
    address: values.address.trim(),
    departmentName: values.departmentName,
    roleName: values.roleName,
    designation: values.designation,
    dateOfJoining: values.dateOfJoining,
    isActive: values.isActive ?? true,
  };
}

export const getEmployee = async (
  page = 1,
  pageSize = 10,
): Promise<EmployeeListResponse> => {
  return api({
    endpoint: `/api/v1/get-all?page=${page}&pageSize=${pageSize}`,
  });
};
