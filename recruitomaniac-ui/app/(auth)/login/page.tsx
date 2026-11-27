import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in | Recruitomaniac",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-(--ink)">Welcome back</h1>
      <p className="mt-2 text-(--body)">Log in to your Recruitomaniac account.</p>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-8 text-center text-sm text-(--body)">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-(--accent) hover:underline">
          Create one
        </Link>
      </p>
    </>
  );
}
