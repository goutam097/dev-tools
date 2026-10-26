import Link from "next/link";
import SidebarScaffold from "@/components/SidebarScaffold";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
  "About",
  "Learn what DevTools Hub publishes, how its browser-based tools work, and how to contact WebCodeveloper.",
  "/about",
);

export default function AboutPage() {
  return (
    <SidebarScaffold title="About DevTools Hub">
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Publisher information</p>
          <h1 className="mt-3 font-serif text-3xl italic text-(--ink) sm:text-4xl">About DevTools Hub</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            DevTools Hub is a collection of browser-based utilities and technical guides for common development tasks. The site is published by WebCodeveloper. It does not identify an individual editor or claim professional credentials.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">What the site provides</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            The tools cover data formatting and validation, encoding, frontend snippets, and small workflow tasks. The guides explain selected formats and workflows with examples. Tool pages describe their controls and limitations; outputs should be checked before use in production systems.
          </p>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Many transformations run in your browser. A subset of tools can send input or output to account history when you are signed in. Do not enter passwords, private keys, or sensitive production data. See the <Link href="/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link> for the data practices visible in this site.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Corrections and contact</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            If you find a broken tool, unclear instruction, or factual error, send the page URL and a description of the issue to{" "}
            <a className="underline underline-offset-4" href="mailto:webcodeveloper731@gmail.com">webcodeveloper731@gmail.com</a>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/editorial-policy" className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--ink)">Editorial policy</Link>
            <Link href="/contact" className="rounded-lg bg-(--ink) px-3 py-2 text-sm text-(--bg)">Contact</Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
