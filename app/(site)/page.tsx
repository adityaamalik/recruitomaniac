import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "../_components/icon";
import {
  CtaBanner,
  SectionHeading,
  primaryButton,
  secondaryButton,
} from "../_components/ui";

export const metadata: Metadata = {
  title: "Recruitomaniac | Your complete recruitment team in one platform",
  description:
    "Job postings, CV parsing, candidate profiling, a complete hiring dashboard and interview scheduling, without pulling your team away from their work.",
};

const capabilities = [
  "Job Postings",
  "CV Parsing",
  "Candidate Profiling",
  "Smart Shortlisting",
  "Hiring Dashboard",
  "Interview Scheduling",
  "Pipeline Tracking",
  "Team Feedback",
];

const steps = [
  {
    title: "Post the role",
    text: "Describe who you need and publish a clear, structured job posting.",
  },
  {
    title: "Parse every CV",
    text: "Skills, experience and education are pulled out of each application.",
  },
  {
    title: "Profile candidates",
    text: "Every applicant gets a profile measured against the role requirements.",
  },
  {
    title: "Schedule meetings",
    text: "Interviews are booked into open slots on your hiring team's calendars.",
  },
  {
    title: "Make the hire",
    text: "Review feedback side by side on the dashboard and decide with confidence.",
  },
];

const pipeline = [
  { stage: "Applied", count: 128, width: "w-full" },
  { stage: "Screened", count: 74, width: "w-3/5" },
  { stage: "Shortlisted", count: 31, width: "w-2/5" },
  { stage: "Interview", count: 12, width: "w-1/5" },
  { stage: "Offer", count: 3, width: "w-[8%]" },
];

function DashboardPreview() {
  const stats = [
    { label: "Open roles", value: "8" },
    { label: "New CVs", value: "46" },
    { label: "Interviews", value: "12" },
  ];

  const interviews = [
    { initials: "PS", name: "Priya S.", role: "Product Designer", time: "10:30" },
    { initials: "MR", name: "Marcus R.", role: "Backend Engineer", time: "13:00" },
    { initials: "LC", name: "Lin C.", role: "Data Analyst", time: "16:15" },
  ];

  return (
    <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">

      <div className="relative overflow-hidden rounded-2xl border border-(--line) bg-white text-left shadow-2xl shadow-black/10">
        <div className="flex items-center gap-2 border-b border-(--line) bg-(--surface) px-4 py-3">
          <span className="size-3 rounded-full bg-neutral-300" />
          <span className="size-3 rounded-full bg-neutral-300" />
          <span className="size-3 rounded-full bg-neutral-300" />
          <span className="ml-3 text-xs text-(--subtle)">
            Hiring dashboard · sample data
          </span>
        </div>

        <div className="flex">
          <div className="hidden w-48 shrink-0 flex-col gap-1 border-r border-(--line) p-4 md:flex">
            {(
              [
                ["chart", "Dashboard"],
                ["briefcase", "Jobs"],
                ["user", "Candidates"],
                ["document", "CV inbox"],
                ["calendar", "Schedule"],
              ] satisfies [IconName, string][]
            ).map(([icon, label], index) => (
              <span
                key={label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  index === 0
                    ? "bg-(--accent-soft) font-medium text-(--accent)"
                    : "text-(--subtle)"
                }`}
              >
                <Icon name={icon} className="size-4" />
                {label}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-(--line) bg-(--surface) p-3 sm:p-4"
                >
                  <p className="text-xs text-(--subtle)">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-(--ink) sm:text-3xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              <div className="rounded-xl border border-(--line) p-4 lg:col-span-3">
                <p className="mb-4 text-sm font-medium text-(--ink)">
                  Candidate pipeline
                </p>
                <div className="space-y-3">
                  {pipeline.map((row) => (
                    <div key={row.stage} className="flex items-center gap-3">
                      <span className="w-20 shrink-0 text-xs text-(--subtle)">
                        {row.stage}
                      </span>
                      <div className="h-2.5 flex-1 rounded-full bg-(--accent-soft)">
                        <div
                          className={`h-full rounded-full bg-(--accent) ${row.width}`}
                        />
                      </div>
                      <span className="w-8 text-right text-xs tabular-nums text-(--body)">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-(--line) p-4 lg:col-span-2">
                <p className="mb-4 text-sm font-medium text-(--ink)">
                  Today&apos;s interviews
                </p>
                <ul className="space-y-3">
                  {interviews.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--accent-soft) text-xs font-semibold text-(--accent)">
                        {item.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-(--ink)">
                          {item.name}
                        </span>
                        <span className="block truncate text-xs text-(--subtle)">
                          {item.role}
                        </span>
                      </span>
                      <span className="text-xs tabular-nums text-(--accent)">
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="site-float absolute -left-24 top-[70%] hidden items-center gap-3 rounded-xl border border-(--line) bg-white px-4 py-3 text-left shadow-xl shadow-black/10 xl:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
          <Icon name="document" />
        </span>
        <span>
          <span className="block text-sm font-medium text-(--ink)">CV parsed</span>
          <span className="block text-xs text-(--subtle)">
            14 skills extracted
          </span>
        </span>
      </div>

      <div
        className="site-float-delayed absolute -bottom-8 -right-20 hidden items-center gap-3 rounded-xl border border-(--line) bg-white px-4 py-3 text-left shadow-xl shadow-black/10 xl:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
          <Icon name="calendar" />
        </span>
        <span>
          <span className="block text-sm font-medium text-(--ink)">
            Interview booked
          </span>
          <span className="block text-xs text-(--subtle)">
            Thursday, 10:30
          </span>
        </span>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  className = "",
  children,
}: {
  icon: IconName;
  title: string;
  text: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-(--line) bg-white p-6 transition duration-300 hover:border-(--accent)/40 hover:shadow-xl hover:shadow-black/5 sm:p-8 ${className}`}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-(--accent-soft) text-(--accent) transition group-hover:bg-(--ink) group-hover:text-white">
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-(--ink)">{title}</h3>
      <p className="mt-2 leading-relaxed text-(--body)">{text}</p>
      <div className="mt-auto pt-6">{children}</div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative isolate px-4 pb-24 pt-16 text-center sm:px-6 sm:pt-24">
        <div className="site-grid absolute inset-0 -z-10" />

        <p className="inline-flex items-center gap-2 rounded-full border border-(--line) bg-white px-4 py-1.5 text-sm text-(--body)">
          <span className="size-2 rounded-full bg-(--accent)" />
          The complete recruitment agency, built into one app
        </p>

        <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-(--ink) sm:text-7xl">
          Hire great people.{" "}
          <span className="text-(--accent)">
            Skip the busywork.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-(--body) sm:text-xl">
          Recruitomaniac runs your hiring from job posting to interview. It
          parses CVs, profiles candidates and schedules meetings, so your team
          stays focused on the work that matters.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className={`${primaryButton} w-full px-8 py-3.5 sm:w-auto`}
          >
            Get Started
            <Icon name="arrow" />
          </button>
          <Link
            href="/how-it-works"
            className={`${secondaryButton} w-full px-8 py-3.5 sm:w-auto`}
          >
            See how it works
          </Link>
        </div>

        <DashboardPreview />
      </section>

      {/* Scrolling capability banner */}
      <section
        aria-label="Capabilities"
        className="border-y border-(--line) bg-(--surface) py-5"
      >
        <div className="site-marquee-mask overflow-hidden">
          <div className="site-marquee flex">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0"
              >
                {capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-center gap-8 pr-8 text-sm font-medium uppercase tracking-widest text-(--body)"
                  >
                    {capability}
                    <Icon name="spark" className="size-4 text-(--accent)" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <SectionHeading
          eyebrow="Features"
          title="Everything a recruitment team does"
          text="One connected platform replaces the scattered spreadsheets, inboxes and back-and-forth of traditional hiring."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <FeatureCard
            icon="briefcase"
            title="Job postings"
            text="Create, publish and manage every open role from a single place."
            className="lg:col-span-2"
          >
            <ul className="space-y-2 text-sm">
              {[
                ["Frontend Engineer", "Live"],
                ["HR Generalist", "Live"],
                ["Sales Lead", "Draft"],
              ].map(([role, status]) => (
                <li
                  key={role}
                  className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-4 py-2.5"
                >
                  <span className="text-(--ink)">{role}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      status === "Live"
                        ? "bg-(--accent-soft) text-(--accent)"
                        : "bg-neutral-200/70 text-neutral-600"
                    }`}
                  >
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </FeatureCard>

          <FeatureCard
            icon="document"
            title="CV parsing"
            text="Turn any CV into clean, searchable data without manual entry."
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-(--line) bg-(--surface) p-4">
              <p className="font-mono text-xs text-(--subtle)">
                resume.pdf → extracted
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "SQL",
                  "5 yrs experience",
                  "B.Tech",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-(--line) bg-white px-2.5 py-1 text-xs text-(--body)"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon="user"
            title="Candidate profiling"
            text="See how each person fits the role, with strengths and gaps laid out."
            className="lg:col-span-2"
          >
            <div className="space-y-3 rounded-xl border border-(--line) bg-(--surface) p-4">
              {[
                ["Skills match", "92%", "w-[92%]"],
                ["Experience", "78%", "w-[78%]"],
                ["Role fit", "85%", "w-[85%]"],
              ].map(([label, score, width]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-(--body)">{label}</span>
                    <span className="text-(--accent)">{score}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-(--line)">
                    <div
                      className={`h-full rounded-full bg-(--accent) ${width}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            icon="chart"
            title="Complete dashboard"
            text="Track open roles, pipeline health, upcoming interviews and decisions at a glance."
            className="lg:col-span-3"
          >
            <div className="flex h-32 items-end gap-2 rounded-xl border border-(--line) bg-(--surface) p-4">
              {[
                "h-[35%]",
                "h-[50%]",
                "h-[42%]",
                "h-[68%]",
                "h-[55%]",
                "h-[74%]",
                "h-[62%]",
                "h-[88%]",
                "h-[76%]",
                "h-full",
              ].map((height) => (
                <div
                  key={height}
                  className={`flex-1 rounded-t-md bg-(--accent)/70 ${height}`}
                />
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            icon="calendar"
            title="Meeting scheduling"
            text="Book interviews with the right hiring team members at times that suit everyone."
            className="md:col-span-2 lg:col-span-3"
          >
            <div className="grid h-32 grid-cols-5 gap-2 rounded-xl border border-(--line) bg-(--surface) p-4 text-center text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <div key={day} className="flex flex-col gap-2">
                  <span className="text-(--subtle)">{day}</span>
                  <span
                    className={`flex flex-1 items-center justify-center rounded-lg ${
                      day === "Thu"
                        ? "bg-(--accent) font-semibold text-white"
                        : "border border-dashed border-neutral-300 bg-white text-neutral-400"
                    }`}
                  >
                    {day === "Thu" ? "10:30" : "—"}
                  </span>
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative scroll-mt-20 border-y border-(--line) bg-(--surface) px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <SectionHeading
          eyebrow="How it works"
          title="From open role to signed offer"
          text="A clear five-step flow that keeps every candidate moving."
        />

        <ol className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5 lg:block">
              {index < steps.length - 1 && (
                <span className="absolute left-14 right-[-1.25rem] top-6 hidden h-px bg-(--line) lg:block" />
              )}
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-(--ink) font-mono text-sm font-semibold text-white">
                0{index + 1}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-lg font-semibold text-(--ink)">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--body)">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Focus banner */}
      <section
        id="focus"
        className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8"
      >
        <div>
          <span className="flex size-14 items-center justify-center rounded-2xl bg-(--accent-soft) text-(--accent)">
            <Icon name="focus" className="size-7" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-(--ink) sm:text-5xl">
            Your team keeps building.{" "}
            <span className="text-(--accent)">We keep hiring.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-(--body)">
            Employees only step in when their judgement is needed: to meet a
            candidate and share feedback. Everything around that moment is
            handled for them.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-(--line) bg-(--surface) p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-(--subtle)">
              The old way
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-(--subtle)">
              {[
                "Sifting through piles of CVs",
                "Chasing calendars over email",
                "Status meetings to stay in the loop",
                "Feedback scattered across chats",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="close" className="mt-0.5 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-(--accent)/30 bg-(--accent-soft) p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
              With Recruitomaniac
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-(--ink)">
              {[
                "Profiles ready to review",
                "Interviews booked for you",
                "One dashboard for every status",
                "Feedback kept with the candidate",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon
                    name="check"
                    className="mt-0.5 size-4 shrink-0 text-(--accent)"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to put your hiring on autopilot?"
        text="Bring your job postings, candidates and interviews together in Recruitomaniac."
      />
    </>
  );
}
