"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getAuthToken } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getAuthToken() ? "/dashboard" : "/login");
  }, [router]);

  return null;
}
