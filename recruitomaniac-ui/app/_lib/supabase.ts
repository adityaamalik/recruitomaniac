import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The Supabase client handles signing up, logging in and out, and keeps the
// user's session in the browser. Only use it in Client Components ("use client").

let supabase: SupabaseClient | null = null;

/** Returns the Supabase client, creating it the first time it is needed. */
export function getSupabase(): SupabaseClient {
  if (supabase) {
    return supabase;
  }

  // NEXT_PUBLIC_ values are copied into the browser code when the app is built.
  // The publishable key is designed to be public, so this is safe.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase is not set up. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to recruitomaniac-ui/.env, then restart `npm run dev`.",
    );
  }

  supabase = createClient(url, publishableKey, {
    auth: {
      // PKCE is the more secure way to finish Google sign-in and email links:
      // the browser gets a one-time code in the URL, not the login token itself.
      flowType: "pkce",
    },
  });

  return supabase;
}
