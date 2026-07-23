import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  title: "Editorial Policy | DevTools Hub",
  description: "Learn how DevTools Hub creates useful, accurate, and practical developer content with clear editorial standards.",
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
};

export default function EditorialPolicyPage() {
  return (
    <SidebarScaffold title="Editorial Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Editorial standards for trustworthy developer guidance</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            DevTools Hub publishes practical content for developers who need fast answers, reliable examples, and a clear explanation of how tools fit real workflows.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">What we prioritize</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
              <li>• Accuracy, clarity, and practical usefulness.</li>
              <li>• Examples that reflect real engineering work.</li>
              <li>• Helpful structure with concise explanations and actionable steps.</li>
              <li>• Transparent disclosure of monetization and affiliate relationships.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">What we avoid</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
              <li>• Keyword stuffing and low-value content.</li>
              <li>• Unverified claims or misleading instructions.</li>
              <li>• Overly generic advice with no concrete example.</li>
              <li>• Thin content that fails to help the reader complete a task.</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Review process</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Articles are shaped around search intent, practical value, and the needs of real developers. We update content when technology changes, workflows evolve, or new examples become relevant.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/content-update-policy" className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--ink)">Content update policy</Link>
            <Link href="/code-testing-policy" className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--ink)">Code testing policy</Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
