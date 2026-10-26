import Link from "next/link";
import { createPageMetadata } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata = createPageMetadata(
  "Editorial Policy",
  "Read the editorial aims and correction process for DevTools Hub technical guides and tools.",
  "/editorial-policy",
);

export default function EditorialPolicyPage() {
  return (
    <SidebarScaffold title="Editorial Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Editorial standards for trustworthy developer guidance</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            DevTools Hub publishes developer utilities and selected technical guides. The publisher is WebCodeveloper; no individual author credentials are claimed on this site.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">What we prioritize</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
              <li>• Accuracy, clarity, and practical usefulness.</li>
              <li>• Clear descriptions of tool behavior, input rules, and limitations.</li>
              <li>• Practical steps and examples that readers can check themselves.</li>
              <li>• Disclosure that the site may display Google AdSense advertising.</li>
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
            We aim to explain the subject directly and correct issues when they are identified. This policy describes editorial goals; it does not imply that every article has been independently reviewed by a named subject-matter expert.
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
