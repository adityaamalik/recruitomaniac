import Link from "next/link";
import { Icon } from "./icon";

// `disabled:` styles apply while a button is disabled, e.g. while a form is sending.
export const primaryButton =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-(--accent) font-semibold text-white transition hover:bg-(--accent-hover) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent) disabled:pointer-events-none disabled:opacity-60";

export const secondaryButton =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-(--line) bg-white font-semibold text-(--ink) transition hover:border-(--ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent) disabled:pointer-events-none disabled:opacity-60";

/** A message under a form: red for errors, green for success. */
export function FormMessage({
  type,
  children,
}: {
  type: "error" | "success";
  children: React.ReactNode;
}) {
  const colors =
    type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800";

  return (
    // role="alert" makes screen readers announce the message as soon as it appears.
    <p role="alert" className={`rounded-xl px-4 py-3 text-sm ${colors}`}>
      {children}
    </p>
  );
}

/** Style for text inputs, selects and textareas. */
export const fieldClass =
  "mt-2 w-full rounded-xl border border-(--line) bg-white px-4 py-3 text-(--ink) outline-none transition placeholder:text-(--subtle) focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/10";

export function Logo() {
  return (
    <span className="flex items-center gap-2 sm:gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--accent) text-white sm:size-9">
        <Icon name="spark" />
      </span>
      <span className="text-base font-semibold tracking-tight text-(--ink) max-[374px]:sr-only sm:text-lg">
        Recruito<span className="text-(--accent)">maniac</span>
      </span>
    </span>
  );
}

/** Small label + heading + intro text, used to open a section. */
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--accent)">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-(--ink) sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-lg text-(--body)">{text}</p>
    </div>
  );
}

/** The heading block at the top of each inner page. */
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="relative isolate px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
      <div className="site-grid absolute inset-0 -z-10" />
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--accent)">
        {eyebrow}
      </p>
      <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-(--ink) sm:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-(--body)">
        {text}
      </p>
    </section>
  );
}

/** Dark "Get Started" banner shown near the bottom of pages. */
export function CtaBanner({ title, text }: { title: string; text: string }) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-(--ink) px-6 py-16 text-center sm:py-24">
        <div className="site-grid absolute inset-0 -z-10" />
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{text}</p>
        <Link
          href="/register"
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-(--ink) transition hover:bg-(--accent-soft) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Get Started
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
