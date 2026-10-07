import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  title: "About the Author | DevTools Hub",
  description:
    "Publisher information and a way to send questions or corrections about DevTools Hub content.",
  alternates: { canonical: `${SITE_URL}/author` },
};

export default function AuthorPage() {
  return (
    <SidebarScaffold title="About the Author">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--muted)">Publisher information</p>
          <h1 className="mt-3 font-serif text-3xl italic text-(--ink) sm:text-4xl">
            About the publisher and how to contact us about published content.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-(--muted)">
            DevTools Hub is published by WebCodeveloper. This page does not identify an individual author or claim professional credentials. We welcome corrections and questions about tools or guides through the contact page.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">Content and corrections</h2>
            <p className="mt-3 text-sm leading-7 text-(--muted)">
              The site publishes developer tools and technical guides. Pages may be revised when errors are reported or instructions change.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
              <li>Tools process values in the browser; signed-in history behavior is described in the privacy policy.</li>
              <li>Technical articles should be checked against current documentation before production use.</li>
              <li>Send corrections or suggestions through the contact page.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">Editorial Standards</h2>
            <p className="mt-3 text-sm leading-7 text-(--muted)">
              We aim to explain what each tool does and state relevant limitations. We do not publish individual author credentials on this page.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/editorial-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">
                Editorial policy
              </Link>
              <Link href="/code-testing-policy" className="rounded-lg border border-(--border) bg-white px-3 py-2 text-sm text-(--ink)">
                Testing policy
              </Link>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Why this matters for readers</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Tool behavior and data handling should be clear so readers can decide whether a utility is appropriate for their task.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-lg bg-(--ink) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--bg)">
              About the publisher
            </Link>
            <Link href="/contact" className="rounded-lg border border-(--border) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--ink)">
              Contact
            </Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
