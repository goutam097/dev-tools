import Link from "next/link";
import { createPageMetadata } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata = createPageMetadata(
  "Code Testing Policy",
  "What DevTools Hub does and does not claim about validating code examples.",
  "/code-testing-policy",
);

export default function CodeTestingPolicyPage() {
  return (
    <SidebarScaffold title="Code Testing Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">How to interpret code examples</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            A code example is an illustration of a technique, not a guarantee that it has been tested in every runtime, dependency version, or production environment. Where a page describes a specific test or runtime, that evidence should be stated on that page.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Testing principles</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
            <li>• Check the relevant language or platform documentation before adopting an example.</li>
            <li>• Validate generated output in the target application and environment.</li>
            <li>• Do not use sample values as credentials or production configuration.</li>
            <li>• Report an incorrect example with its page URL through the contact page.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">What this means for readers</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            This policy does not claim that all examples are covered by an automated test suite. The published material and build checks do not substitute for testing in your application.
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
