"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarCheck,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAuthSession, type LoginResponse } from "@/lib/auth";

const API_BASE = "http://localhost:8000";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.warning("Email and password are required.", {});
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Signing in...");

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = (await response.json()) as LoginResponse;

      if (data?.success && data?.data?.token) {
        saveAuthSession(data);
        toast.success(data?.message ?? "Login successful!", {
          id: toastId,
          description: "Redirecting to dashboard...",
        });
        router.push("/dashboard");
        return;
      }

      toast.error(data?.message ?? "Login failed.", {
        id: toastId,
        description: "Check email and password",
      });
    } catch {
      toast.error("Internal Server Error", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <section className="hidden flex-col justify-center lg:flex">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-200">
              <ShieldCheck className="size-4" />
              Secure Admin Portal
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              Attendance Management System
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Track employee attendance, manage leave requests, and get a complete overview of your team—all in one place.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Users, text: "Employee records & user management" },
                { icon: CalendarCheck, text: "Daily attendance & leave tracking" },
                { icon: ShieldCheck, text: "Role-based secure admin access" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-slate-300">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Icon className="size-4 text-sky-300" />
                  </span>
                  <span className="text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <main className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl shadow-sky-950/30 backdrop-blur-sm dark:bg-slate-900/90 sm:p-10">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/30 lg:mx-0">
                  <ShieldCheck className="size-7" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Admin Login
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Enter credentials
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="h-11 pl-10"
                      placeholder="admin@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="h-11 pr-11 pl-10"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-xl bg-sky-600 text-sm font-semibold hover:bg-sky-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm lg:text-left">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-medium text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  <ArrowLeft className="size-4" />
                  Back to home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
