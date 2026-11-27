import Link from "next/link";
import { navLinks } from "./site-header";
import { Logo } from "./ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--line) px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-(--subtle) md:flex-row">
        <Link href="/" aria-label="Recruitomaniac home">
          <Logo />
        </Link>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-(--accent)">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p>© Recruitomaniac. All rights reserved.</p>
      </div>
    </footer>
  );
}
