import { getAuthToken } from "@/lib/auth";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://hr-backend-1y26.onrender.com";

interface ApiRequest {
  endpoint: string;
  params?: any;
  options?: RequestInit;
}

export async function api({ endpoint, params, options = {} }: ApiRequest) {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(safeEndpoint, BASE_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }
  }

  const token = getAuthToken();
  const headers = new Headers(options?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("ngrok-skip-browser-warning", "true");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url?.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw {
      status: response.status,
      message: errorData?.message ?? `HTTP Error ${response.status}`,
      data: errorData,
    };
  }
  return response.json();
}
