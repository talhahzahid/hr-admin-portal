"use client";

import { useState, type FormEvent } from "react";

export function AddUserScreen() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "active",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("User created successfully. Backend integration can be added next.");
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
          User Management
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Add New User
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Create a new portal user and assign role, department, and account status.
        </p>
      </div>

      <form
        className="grid gap-6 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </span>
            <input
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </span>
            <input
              type="email"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Phone
            </span>
            <input
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Department
            </span>
            <input
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Role
            </span>
            <input
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Status
            </span>
            <select
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>

        {message ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Save User
        </button>
      </form>
    </section>
  );
}
