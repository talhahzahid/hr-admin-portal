import Link from "next/link";

export function HomeScreen() {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 px-8 py-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Welcome to Attendance Management
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Sign in to manage attendance, view reports, and stay connected with your team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Open Dashboard
              </Link>
              <Link
                href="/users/add"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Add User
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quick access</p>
          <div className="mt-4 space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/leave-requests"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Leave Requests
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Open Login
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Employees", value: "128" },
          { label: "Present Today", value: "118" },
          { label: "Pending Leaves", value: "14" },
          { label: "New Users", value: "07" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
