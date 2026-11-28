import Link from "next/link";
import { Logo } from "../_components/ui";
import "../site.css";

// Shared shell for the logged-in area. Everything under /dashboard uses it.
export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="site-root flex flex-1 flex-col bg-(--surface) font-sans text-(--ink) scheme-light selection:bg-(--accent) selection:text-white">
      <header className="border-b border-(--line) bg-white px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Recruitomaniac home" className="inline-flex">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>
    </div>
  );
}
