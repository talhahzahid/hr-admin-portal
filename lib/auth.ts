export type AuthEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  departmentName?: string;
  roleName?: string;
  designation?: string;
  dateOfJoining?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    employee: AuthEmployee;
  };
};

const STORAGE_KEY = "data";

export function saveAuthSession(response: LoginResponse) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
}

export function getAuthSession(): LoginResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LoginResponse;
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  try {
    const session = getAuthSession() as LoginResponse & {
      responseData?: { token?: string };
    } | null;

    return (
      session?.data?.token ??
      session?.responseData?.token ??
      null
    );
  } catch {
    return null;
  }
}

export function getAuthEmployee(): AuthEmployee | null {
  try {
    const session = getAuthSession() as LoginResponse & {
      responseData?: {
        employee?: AuthEmployee;
        user?: AuthEmployee;
      };
    } | null;

    return (
      session?.data?.employee ??
      session?.responseData?.employee ??
      session?.responseData?.user ??
      null
    );
  } catch {
    return null;
  }
}

export function getAuthDisplayName() {
  const employee = getAuthEmployee();
  if (!employee) return "Admin";
  const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  return fullName || employee.email || "Admin";
}

export function clearAuthSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAuthHeaderValue() {
  const token = getAuthToken();
  return token ? `AMS ${token}` : null;
}
