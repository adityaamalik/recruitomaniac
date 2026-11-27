"use client";

import { useState, type FormEvent } from "react";
import { GoogleButton, OrDivider } from "../../_components/google-button";
import { fieldClass, primaryButton } from "../../_components/ui";

const MIN_PASSWORD_LENGTH = 8;

export function RegisterForm() {
  // Each input's current value is kept in state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Message shown under the form when something is wrong ("" means no error).
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }

    setError("");

    // TODO: send `email` and `password` to the backend to create the account.
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

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" className={`${primaryButton} w-full py-3`}>
          Create account
        </button>
      </form>
    </>
  );
}
