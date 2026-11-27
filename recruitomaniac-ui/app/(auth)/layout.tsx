import Link from "next/link";
import { Icon } from "../_components/icon";
import { Logo } from "../_components/ui";
import "../site.css";

// Shared shell for /login and /register.
// The (auth) folder name is a route group, so it does not appear in the URL.
// These pages skip the full site header and footer to keep the focus on the form.

const highlights = [
  "Job postings, CVs and interviews in one place",
  "Candidate profiles ready to review",
  "Interviews booked for your team automatically",
];

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="site-root flex flex-1 bg-white font-sans text-(--ink) scheme-light selection:bg-(--accent) selection:text-white">
      {/* Left: dark brand panel, only on large screens */}
      <aside className="relative isolate hidden w-[44%] flex-col justify-center overflow-hidden bg-(--ink) p-16 text-white lg:flex">
        <div className="site-grid absolute inset-0 -z-10" />
        <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight">
          Hire great people. Skip the busywork.
        </h2>
        <ul className="mt-10 space-y-4 text-white/75">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-white" />
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right: logo, back link and the page's form */}
      <div className="flex flex-1 flex-col px-4 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Recruitomaniac home">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-(--body) transition hover:text-(--accent)">
            ← Back to home
          </Link>
        </div>

        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
