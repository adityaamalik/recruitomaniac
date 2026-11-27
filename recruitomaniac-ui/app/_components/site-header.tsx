import Link from "next/link";
import { Logo, primaryButton } from "./ui";

export const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-white/85 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label="Recruitomaniac home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-(--body) lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-(--accent)">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/login"
            className="cursor-pointer rounded-full px-2 py-2 text-sm font-semibold text-(--ink) transition hover:text-(--accent) sm:px-4"
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`${primaryButton} whitespace-nowrap px-3.5 py-2 text-sm sm:px-5 sm:py-2.5`}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* On smaller screens the links sit in a scrollable row under the bar */}
      <ul className="flex gap-6 overflow-x-auto px-4 pb-3 text-sm whitespace-nowrap text-(--body) sm:px-6 lg:hidden">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-(--accent)">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
