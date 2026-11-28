import { getSupabase } from "./supabase";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/**
 * Calls our API, adding the logged-in user's token so the API knows who is asking.
 *
 * Use it like `fetch`:  const response = await apiFetch("/auth/me");
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const { data } = await getSupabase().auth.getSession();
  const token = data.session?.access_token;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
