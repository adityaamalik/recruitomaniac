import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "../../_components/icon";
import { PageIntro, primaryButton, secondaryButton } from "../../_components/ui";

export const metadata: Metadata = {
  title: "Pricing | Recruitomaniac",
  description: "Plans for teams of every size, from your first hire to hiring at scale.",
};

// Placeholder plans and prices. Replace them with the real ones before launch.
const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For small teams hiring now and then.",
    features: [
      "Up to 3 open roles",
      "CV parsing",
      "Candidate profiles",
      "Interview scheduling",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "For companies hiring every month.",
    features: [
      "Up to 15 open roles",
      "Everything in Starter",
      "Human review workflow",
      "Team dashboard",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams with custom needs.",
    features: [
      "Unlimited open roles",
      "Everything in Growth",
      "Custom onboarding",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="Simple plans that grow with your hiring"
        text="Pick a plan for the number of roles you hire for. Change or cancel at any time."
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-24 sm:px-6 lg:grid-cols-3 lg:px-8">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col rounded-3xl border p-8 ${
              plan.featured
                ? "border-(--accent) bg-(--accent-soft)"
                : "border-(--line) bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-(--ink)">{plan.name}</h2>
              {plan.featured && (
                <span className="rounded-full bg-(--accent) px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-2 text-(--body)">{plan.description}</p>
            <p className="mt-6">
              <span className="text-5xl font-semibold tracking-tight text-(--ink)">
                {plan.price}
              </span>
              <span className="text-(--subtle)">{plan.period}</span>
            </p>

            <ul className="mt-8 space-y-3 text-(--ink)">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-(--accent)" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              {plan.price === "Custom" ? (
                <Link href="/contact" className={`${secondaryButton} w-full py-3`}>
                  Contact sales
                </Link>
              ) : (
                <Link
                  href="/register"
                  className={`${plan.featured ? primaryButton : secondaryButton} w-full py-3`}
                >
                  Get Started
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-(--line) bg-(--surface) px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-(--ink)">Not sure which plan fits?</h2>
        <p className="mt-3 text-(--body)">
          Tell us how you hire and we&apos;ll help you choose.
        </p>
        <Link href="/contact" className={`${primaryButton} mt-6 px-6 py-3`}>
          Talk to us
        </Link>
      </section>
    </>
  );
}
