export interface Employees {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  departmentName: string;
  roleName: string;
  designation: string;
  dateOfJoining: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeListResponse {
  success: boolean;
  message: string;
  data: {
    employees: Employees[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
