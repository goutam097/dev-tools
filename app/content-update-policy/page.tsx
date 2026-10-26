import Link from "next/link";
import { createPageMetadata } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata = createPageMetadata(
  "Content Update Policy",
  "How DevTools Hub handles corrections and updates to developer guides and tool documentation.",
  "/content-update-policy",
);

export default function ContentUpdatePolicyPage() {
  return (
    <SidebarScaffold title="Content Update Policy">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Keeping developer content useful and current</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            Content may be updated when a tool changes, a correction is confirmed, or a reader identifies a useful improvement. The site does not claim a fixed review schedule.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">What may be updated</h2>
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
            An update date is shown only when the page has a recorded update. If a page has no separate updated date, its displayed publication date should not be read as a recent review.
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
