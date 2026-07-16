"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { isAuthRoute } from "@/constants/navigation";
import { getAuthToken } from "@/lib/auth";

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    const onLoginPage = pathname ? isAuthRoute(pathname) : false;

    if (!token && !onLoginPage) {
      router.replace("/login");
      return;
    }

    if (token && onLoginPage) {
      router.replace("/dashboard");
      return;
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
