"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  CalendarDays,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserPlus,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import {
  createEmployee,
  toCreateEmployeePayload,
} from "@/api/employee";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/register.schema";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "Legal",
  "HR",
  "Finance",
  "Engineering",
  "IT",
  "Marketing",
  "Sales",
  "Operations",
  "Administration",
] as const;

const ROLES = [
  "Legal Advisor",
  "Admin",
  "HR Manager",
  "Manager",
  "Team Lead",
  "Employee",
  "Intern",
] as const;

const DESIGNATIONS = [
  "Legal Advisor",
  "Software Engineer",
  "QA Engineer",
  "Business Analyst",
  "Project Manager",
  "HR Executive",
  "Finance Officer",
  "Operations Coordinator",
  "Intern",
] as const;

export function RegisterEmployeeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      departmentName: "",
      roleName: "",
      designation: "",
      dateOfJoining: "",
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);

    try {
      const payload = toCreateEmployeePayload(values);
      const result = await createEmployee(payload);

      if (result?.success || result?.code === "AMS_SUCCESS_00") {
        toast.success(result?.message ?? "Employee created successfully", {
          description: `${payload.firstName} ${payload.lastName} has been added.`,
        });
        reset();
        router.push("/employee");
        return;
      }

      toast.error(result?.message ?? "Failed to create employee");
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        label="Employee Management"
        title="Register New Employee"
        description="Create an employee account with department, role, and joining details."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900/80"
      >
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-600/30">
              <UserPlus className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Employee details
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                All fields marked required must be completed before submit.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-5 sm:p-6">
          <FormSection
            title="Personal information"
            description="Basic identity and contact details"
            icon={UserRound}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                error={errors.firstName?.message}
                htmlFor="firstName"
              >
                <Input
                  id="firstName"
                  className="h-9"
                  placeholder="Ammar"
                  {...register("firstName")}
                />
              </Field>
              <Field
                label="Last name"
                error={errors.lastName?.message}
                htmlFor="lastName"
              >
                <Input
                  id="lastName"
                  className="h-9"
                  placeholder="Amir"
                  {...register("lastName")}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                error={errors.email?.message}
                htmlFor="email"
              >
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    className="h-9 pl-10"
                    placeholder="ammar@example.com"
                    {...register("email")}
                  />
                </div>
              </Field>
              <Field
                label="Password"
                error={errors.password?.message}
                htmlFor="password"
              >
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    className="h-9 pl-10"
                    placeholder="Ammar@2026"
                    {...register("password")}
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Phone"
                error={errors.phone?.message}
                htmlFor="phone"
              >
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="phone"
                    type="tel"
                    className="h-9 pl-10"
                    placeholder="03123456788"
                    {...register("phone")}
                  />
                </div>
              </Field>
              <Field
                label="Date of joining"
                error={errors.dateOfJoining?.message}
                htmlFor="dateOfJoining"
              >
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="dateOfJoining"
                    type="date"
                    className="h-9 pl-10"
                    {...register("dateOfJoining")}
                  />
                </div>
              </Field>
            </div>

            <Field
              label="Address"
              error={errors.address?.message}
              htmlFor="address"
            >
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-3 left-3 size-4 text-slate-400" />
                <textarea
                  id="address"
                  rows={3}
                  placeholder="JPMC Karachi"
                  className={cn(
                    "w-full rounded-md border border-input bg-transparent py-2 pr-3 pl-10 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    "dark:bg-input/30"
                  )}
                  {...register("address")}
                />
              </div>
            </Field>
          </FormSection>

          <FormSection
            title="Work information"
            description="Department, role, and designation"
            icon={Briefcase}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Department"
                error={errors.departmentName?.message}
                htmlFor="departmentName"
              >
                <div className="relative">
                  <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <select
                    id="departmentName"
                    className={selectClass}
                    {...register("departmentName")}
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field
                label="Role name"
                error={errors.roleName?.message}
                htmlFor="roleName"
              >
                <div className="relative">
                  <Shield className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <select
                    id="roleName"
                    className={selectClass}
                    {...register("roleName")}
                  >
                    <option value="">Select role</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Designation"
                error={errors.designation?.message}
                htmlFor="designation"
              >
                <select
                  id="designation"
                  className={cn(selectClass, "pl-3")}
                  {...register("designation")}
                >
                  <option value="">Select designation</option>
                  {DESIGNATIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="flex items-end">
                <label
                  htmlFor="isActive"
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition",
                    isActive
                      ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30"
                      : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40"
                  )}
                >
                  <input
                    id="isActive"
                    type="checkbox"
                    className="size-4 accent-sky-600"
                    {...register("isActive")}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">
                      Active employee
                    </span>
                    <span className="block text-xs text-slate-500">
                      Can sign in and access assigned modules
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </FormSection>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-slate-800 dark:bg-slate-800/30">
          <Button
            type="button"
            variant="outline"
            className="h-11"
            disabled={loading}
            onClick={() => router.push("/employee")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !isValid}
            className="h-11 min-w-44 bg-sky-600 hover:bg-sky-700"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                Create Employee
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}

const selectClass = cn(
  "h-9 w-full appearance-none rounded-md border border-input bg-transparent py-1 pr-8 pl-10 text-sm shadow-xs outline-none transition-[color,box-shadow]",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
);

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof UserRound;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-900/50">
          <Icon className="size-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-4 pl-0 sm:pl-12">{children}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
