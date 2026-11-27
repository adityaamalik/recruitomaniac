import type { Metadata } from "next";
import { Icon, type IconName } from "../../_components/icon";
import { CtaBanner, PageIntro, SectionHeading } from "../../_components/ui";

export const metadata: Metadata = {
  title: "How it works | Recruitomaniac",
  description:
    "How Recruitomaniac's AI handles CVs, profiling and scheduling, and where your team reviews and decides.",
};

type Step = {
  title: string;
  text: string;
  icon: IconName;
  owner: "AI" | "Your team";
};

const steps: Step[] = [
  {
    title: "Share the role",
    text: "A hiring manager describes the role. Recruitomaniac drafts the job posting, and you approve it before it goes live.",
    icon: "briefcase",
    owner: "Your team",
  },
  {
    title: "CV parsing",
    text: "Every application is read and turned into structured data: skills, experience, education and work history.",
    icon: "document",
    owner: "AI",
  },
  {
    title: "Candidate profiling",
    text: "Each candidate is compared with the role requirements. You see a match score together with the reasons behind it.",
    icon: "user",
    owner: "AI",
  },
  {
    title: "Human review",
    text: "A recruiter or hiring manager reviews the shortlist and decides who moves forward. Nobody is invited to interview until a person approves it.",
    icon: "shield",
    owner: "Your team",
  },
  {
    title: "Interview scheduling",
    text: "Approved candidates are offered times that fit the interviewers' calendars. Invites and reminders go out automatically.",
    icon: "calendar",
    owner: "AI",
  },
  {
    title: "Final decision",
    text: "Interviewers leave feedback in one place, and your team makes the hiring decision.",
    icon: "users",
    owner: "Your team",
  },
];

const aiTasks = [
  "Drafts job postings from your notes",
  "Reads and organises every CV",
  "Scores candidates and explains each score",
  "Finds interview slots and sends invites",
];

const teamTasks = [
  "Approves every job posting",
  "Reviews the shortlist and can override any score",
  "Meets the candidates",
  "Makes every hiring decision",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title="AI does the legwork. People make the decisions."
        text="Recruitomaniac takes on the repetitive parts of hiring. Your team steps in at the moments that need human judgement."
      />

      {/* Step by step */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <ol className="space-y-4">
          {steps.map((step, index) => {
            const isHuman = step.owner === "Your team";
            return (
              <li
                key={step.title}
                className={`flex gap-5 rounded-3xl border p-6 sm:p-8 ${
                  isHuman
                    ? "border-(--accent)/30 bg-(--accent-soft)"
                    : "border-(--line) bg-white"
                }`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                    isHuman ? "bg-(--accent) text-white" : "bg-(--surface) text-(--accent)"
                  }`}
                >
                  <Icon name={step.icon} className="size-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-(--subtle)">
                      0{index + 1}
                    </span>
                    <h2 className="text-xl font-semibold text-(--ink)">{step.title}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isHuman
                          ? "bg-(--accent) text-white"
                          : "border border-(--line) text-(--body)"
                      }`}
                    >
                      {step.owner}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-(--body)">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Who does what */}
      <section className="border-y border-(--line) bg-(--surface) px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who does what"
          title="A clear line between AI and people"
          text="The AI prepares and organises. It never makes the final call on a candidate."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          <TaskList title="What the AI does" items={aiTasks} />
          <TaskList title="What your team decides" items={teamTasks} highlight />
        </div>
      </section>

      {/* Why the human review step */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
          Why we keep a human review step
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-(--body)">
          <p>
            A CV never tells the whole story. Career changes, gaps and unusual
            backgrounds can hide great candidates that a score alone would miss.
          </p>
          <p>
            Having a person review every shortlist means someone checks the
            AI&apos;s reasoning, catches mistakes and stays accountable for who
            gets hired. The review is quick, because the reading and sorting is
            already done.
          </p>
        </div>
      </section>

      <CtaBanner
        title="See it with your own roles"
        text="Set up your first job posting and watch the process run."
      />
    </>
  );
}

function TaskList({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 ${
        highlight ? "border-(--accent)/30 bg-(--accent-soft)" : "border-(--line) bg-white"
      }`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-(--ink)">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon name="check" className="mt-1 size-4 shrink-0 text-(--accent)" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
