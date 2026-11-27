import type { Metadata } from "next";
import { Icon, type IconName } from "../../_components/icon";
import { CtaBanner, PageIntro, SectionHeading } from "../../_components/ui";

export const metadata: Metadata = {
  title: "About | Recruitomaniac",
  description:
    "Why we built Recruitomaniac: a complete recruitment team that lets your people stay focused on their work.",
};

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "People decide",
    text: "AI does the reading, sorting and scheduling. Every hiring decision stays with a person.",
  },
  {
    icon: "focus",
    title: "Respect everyone's time",
    text: "Employees stay on their main work, and candidates get quick, clear updates.",
  },
  {
    icon: "chart",
    title: "Clear over clever",
    text: "Every score comes with its reasons, so you always know why a candidate was ranked.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="A complete recruitment team, built into one app"
        text="Recruitomaniac gives every company the hiring power of a full recruitment agency, without taking people away from their jobs."
      />

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
          Why we built it
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-(--body)">
          <p>
            Hiring takes over people&apos;s calendars. Engineers, designers and
            managers lose hours to reading CVs, chasing interview times and
            sitting in status meetings, all on top of their real work.
          </p>
          <p>
            We built Recruitomaniac to handle that work end to end: job
            postings, CV parsing, candidate profiling, a complete hiring
            dashboard and interview scheduling. Your team only steps in to meet
            candidates and decide.
          </p>
        </div>
      </section>

      <section className="border-y border-(--line) bg-(--surface) px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we believe"
          title="The principles behind the product"
          text="These guide every feature we build."
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-3xl border border-(--line) bg-white p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-(--accent-soft) text-(--accent)">
                <Icon name={value.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-(--ink)">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-(--body)">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="pt-24">
        <CtaBanner
          title="Let your team get back to work"
          text="Hand the hiring process to Recruitomaniac."
        />
      </div>
    </>
  );
}
