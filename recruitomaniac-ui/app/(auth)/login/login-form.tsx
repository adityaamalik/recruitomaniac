"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { GoogleButton, OrDivider } from "../../_components/google-button";
import { FormMessage, fieldClass, primaryButton } from "../../_components/ui";
import { getSupabase } from "../../_lib/supabase";

export function LoginForm() {
  const router = useRouter();

  // Each input's current value is kept in state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // True while we wait for Supabase, so the button can't be clicked twice.
  const [isLoading, setIsLoading] = useState(false);
  // Message shown under the form when something is wrong ("" means no error).
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // Supabase checks the email and password, and saves the session in the browser.
    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // For example "Invalid login credentials" or "Email not confirmed".
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <>
      <GoogleButton label="Continue with Google" />

      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-(--ink)">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium text-(--ink)">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
          />
        </label>

        {error && <FormMessage type="error">{error}</FormMessage>}

        <button
          type="submit"
          disabled={isLoading}
          className={`${primaryButton} w-full py-3`}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </>
  );
}
