import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number")
    .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^03\d{9}$/, "Enter a valid phone (e.g. 03123456788)"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),
  departmentName: z.string().min(1, "Department is required"),
  roleName: z.string().min(1, "Role is required"),
  designation: z.string().min(1, "Designation is required"),
  dateOfJoining: z.string().min(1, "Date of joining is required"),
  isActive: z.boolean(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
