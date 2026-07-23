import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  title: "Content Update Policy | DevTools Hub",
  description: "How DevTools Hub maintains current, practical, and high-quality developer content over time.",
  alternates: { canonical: `${SITE_URL}/content-update-policy` },
};

export default function ContentUpdatePolicyPage() {
  return (
    <SidebarScaffold title="Content Update Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Keeping developer content useful and current</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            Our content is maintained to remain relevant as frameworks, APIs, and developer workflows evolve. We refresh guides when the underlying tools or practices change materially.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">What we review regularly</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
            <li>• Tool descriptions and workflow steps.</li>
            <li>• Code samples and practical examples.</li>
            <li>• SEO metadata and internal linking.</li>
            <li>• Accuracy of platform-specific guidance.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">When content is updated</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Updates occur when new versions of frameworks are released, existing instructions become outdated, or readers require clearer examples and expanded guidance.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/editorial-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">Editorial policy</Link>
            <Link href="/code-testing-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">Code testing policy</Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
