"use client";

import { useState, type FormEvent } from "react";
import { GoogleButton, OrDivider } from "../../_components/google-button";
import { fieldClass, primaryButton } from "../../_components/ui";

export function LoginForm() {
  // Each input's current value is kept in state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();

    // TODO: send `email` and `password` to the backend to log the user in.
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

        <button type="submit" className={`${primaryButton} w-full py-3`}>
          Log in
        </button>
      </form>
    </>
  );
}
