import { useAuthStore } from "@/store/authStore";

export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.status === 204 ? (undefined as T) : res.json();
}
