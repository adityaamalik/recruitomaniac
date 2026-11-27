import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account | Recruitomaniac",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-(--ink)">
        Create your account
      </h1>
      <p className="mt-2 text-(--body)">Start hiring with Recruitomaniac.</p>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <p className="mt-8 text-center text-sm text-(--body)">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-(--accent) hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
