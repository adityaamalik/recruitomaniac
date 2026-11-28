"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormMessage, secondaryButton } from "../_components/ui";
import { apiFetch } from "../_lib/api";
import { getSupabase } from "../_lib/supabase";

// The user, as returned by our API's GET /auth/me.
type User = {
  id: string;
  email: string | null;
};

export function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  // useEffect runs after the page appears in the browser.
  // [router] at the end lists what the effect uses. It would run again if router
  // changed, but router stays the same, so this runs once when the page opens.
  useEffect(() => {
    async function loadUser() {
      try {
        // Ask our API who is logged in. apiFetch adds the user's token.
        const response = await apiFetch("/auth/me");

        // 401 means there is no valid login, so send the user to log in.
        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          setError(`The API returned an error (${response.status}).`);
          return;
        }

        setUser(await response.json());
      } catch {
        // fetch fails like this when the API can't be reached at all.
        setError("Could not reach the API. Is it running?");
      }
    }

    loadUser();
  }, [router]);

  async function handleLogOut() {
    await getSupabase().auth.signOut();
    router.replace("/login");
  }

  if (error) {
    return <FormMessage type="error">{error}</FormMessage>;
  }

  if (!user) {
    return <p className="text-(--body)">Loading your account...</p>;
  }

  return (
    <section className="rounded-3xl border border-(--line) bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
      <p className="mt-2 text-(--body)">
        You&apos;re logged in as{" "}
        <span className="font-semibold text-(--ink)">{user.email}</span>.
      </p>
      <p className="mt-6 text-sm text-(--subtle)">
        Your dashboard is on its way: jobs, candidates and interviews will appear
        here.
      </p>

      <button
        type="button"
        onClick={handleLogOut}
        className={`${secondaryButton} mt-8 px-6 py-2.5`}
      >
        Log out
      </button>
    </section>
  );
}
