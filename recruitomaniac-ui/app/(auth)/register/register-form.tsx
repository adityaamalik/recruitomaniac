"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { GoogleButton, OrDivider } from "../../_components/google-button";
import { FormMessage, fieldClass, primaryButton } from "../../_components/ui";
import { getSupabase } from "../../_lib/supabase";

const MIN_PASSWORD_LENGTH = 8;

export function RegisterForm() {
  const router = useRouter();

  // Each input's current value is kept in state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // True while we wait for Supabase, so the button can't be clicked twice.
  const [isLoading, setIsLoading] = useState(false);
  // Messages shown under the form ("" means none).
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }

    setIsLoading(true);

    // Create the account in Supabase. If email confirmation is on, Supabase sends
    // an email whose link brings the user back to `emailRedirectTo`, logged in.
    const { data, error } = await getSupabase().auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    setIsLoading(false);

    if (error) {
      // For example "Password should be at least 8 characters".
      setError(error.message);
      return;
    }

    // A session means the user is already logged in (email confirmation is off).
    if (data.session) {
      router.push("/dashboard");
      return;
    }

    // With email confirmation on, Supabase doesn't say "this email is taken"
    // (so strangers can't check who has an account). An empty `identities`
    // list is how it signals that the account already exists.
    if (data.user?.identities?.length === 0) {
      setError("An account with this email already exists. Try logging in.");
      return;
    }

    setSuccess(
      `We've sent a confirmation link to ${email}. Open it to finish creating your account.`,
    );
  }

  return (
    <>
      <GoogleButton label="Sign up with Google" />

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
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
          />
          <span className="mt-1.5 block font-normal text-(--subtle)">
            At least {MIN_PASSWORD_LENGTH} characters.
          </span>
        </label>

        <label className="block text-sm font-medium text-(--ink)">
          Re-type password
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={fieldClass}
          />
        </label>

        {error && <FormMessage type="error">{error}</FormMessage>}
        {success && <FormMessage type="success">{success}</FormMessage>}

        <button
          type="submit"
          disabled={isLoading}
          className={`${primaryButton} w-full py-3`}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </>
  );
}
