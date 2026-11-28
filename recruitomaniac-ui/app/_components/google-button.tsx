"use client";

import { useState } from "react";
import { getSupabase } from "../_lib/supabase";
import { FormMessage, secondaryButton } from "./ui";

/** "Continue with Google" button, used on both /login and /register. */
export function GoogleButton({ label }: { label: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setError("");

    // Sends the browser to Google. After the user picks an account, Google sends
    // them back to Supabase, and Supabase sends them to `redirectTo`.
    // This works for new and existing users, so it both signs up and logs in.
    const { error } = await getSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    // If it worked, the page is already leaving for Google. We only get here on errors.
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`${secondaryButton} w-full py-3`}
      >
        <GoogleLogo />
        {isLoading ? "Opening Google..." : label}
      </button>

      {error && (
        <div className="mt-3">
          <FormMessage type="error">{error}</FormMessage>
        </div>
      )}
    </>
  );
}

/** Divider with "or" in the middle, shown between Google and the email form. */
export function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-4 text-sm text-(--subtle)">
      <span className="h-px flex-1 bg-(--line)" />
      or
      <span className="h-px flex-1 bg-(--line)" />
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.080 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.650-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.860-1.977 13.409-5.192l-6.190-5.238A11.910 11.910 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.040 12.040 0 0 1-4.087 5.571l.003-.002 6.190 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.650-.389-3.917z"
      />
    </svg>
  );
}
