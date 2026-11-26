import type { Metadata } from "next";
import { Icon, type IconName } from "../../_components/icon";
import { PageIntro } from "../../_components/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Recruitomaniac",
  description: "Get in touch about a demo, pricing or support.",
};

const topics: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "calendar",
    title: "Book a demo",
    text: "See Recruitomaniac running on a role like yours.",
  },
  {
    icon: "chart",
    title: "Pricing questions",
    text: "Find the right plan for how often you hire.",
  },
  {
    icon: "mail",
    title: "Product support",
    text: "Get help with your account or a hiring pipeline.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let's talk about your hiring"
        text="Send us a message and our team will get back to you."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-5 lg:px-8">
        <ul className="space-y-4 lg:col-span-2">
          {topics.map((topic) => (
            <li
              key={topic.title}
              className="flex gap-4 rounded-3xl border border-(--line) bg-(--surface) p-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-(--accent-soft) text-(--accent)">
                <Icon name={topic.icon} />
              </span>
              <div>
                <h2 className="font-semibold text-(--ink)">{topic.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-(--body)">{topic.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
