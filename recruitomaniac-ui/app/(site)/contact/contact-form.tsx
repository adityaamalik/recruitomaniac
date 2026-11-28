"use client";

import type { SubmitEvent } from "react";
import { fieldClass, primaryButton } from "../../_components/ui";

export function ContactForm() {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send the message to the backend once it exists.
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-3xl border border-(--line) bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      <label className="text-sm font-medium text-(--ink)">
        Name
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>

      <label className="text-sm font-medium text-(--ink)">
        Work email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>

      <label className="text-sm font-medium text-(--ink)">
        Company
        <input name="company" autoComplete="organization" className={fieldClass} />
      </label>

      <label className="text-sm font-medium text-(--ink)">
        Topic
        <select name="topic" className={fieldClass} defaultValue="demo">
          <option value="demo">Book a demo</option>
          <option value="pricing">Pricing</option>
          <option value="support">Support</option>
          <option value="other">Something else</option>
        </select>
      </label>

      <label className="text-sm font-medium text-(--ink) sm:col-span-2">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about the roles you're hiring for"
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button type="submit" className={`${primaryButton} px-6 py-3 sm:col-span-2`}>
        Send message
      </button>
    </form>
  );
}
