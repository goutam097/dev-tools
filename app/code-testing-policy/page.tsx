import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  title: "Code Testing Policy | DevTools Hub",
  description: "How DevTools Hub validates examples and ensures developer code guidance is practical and reliable.",
  alternates: { canonical: `${SITE_URL}/code-testing-policy` },
};

export default function CodeTestingPolicyPage() {
  return (
    <SidebarScaffold title="Code Testing Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Developer examples should be tested before publication</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            Code examples published on DevTools Hub are written to be clear and practical. When a tutorial includes sample code, the guidance is structured to be approachable and aligned with common developer workflows.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Testing principles</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
            <li>• Examples are kept concise and focused on the task at hand.</li>
            <li>• Guidance favors reliable patterns over overly clever implementations.</li>
            <li>• Code is structured in a way that is easy to adapt to real projects.</li>
            <li>• Tutorials explain expected output and common pitfalls.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">What this means for readers</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Rather than presenting untested snippets as absolute truth, the site emphasizes practical understanding, readable examples, and sensible implementation choices.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/editorial-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">Editorial policy</Link>
            <Link href="/privacy-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">Privacy policy</Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
