import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  title: "About the Author | DevTools Hub",
  description:
    "Meet the experienced developer behind DevTools Hub, the editorial standards behind the tutorials, and the practical expertise that shapes each guide.",
  alternates: { canonical: `${SITE_URL}/author` },
};

export default function AuthorPage() {
  return (
    <SidebarScaffold title="About the Author">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--muted)">Experience-led publishing</p>
          <h1 className="mt-3 font-serif text-3xl italic text-(--ink) sm:text-4xl">
            Practical engineering expertise behind every tool and tutorial.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-(--muted)">
            DevTools Hub is curated by a team of software engineers at **WebCodeveloper** who specialize in modern web architectures, API design, and developer experience. We build real products for the real world, and this hub is where we share the utilities and workflows that keep our own teams productive.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">Technical Background</h2>
            <p className="mt-3 text-sm leading-7 text-(--muted)">
              Our editorial team brings a combined decade of experience in:
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-(--muted)">
              <li>• **Frontend Architecture:** Building scalable Next.js and React applications with a focus on performance and Core Web Vitals.</li>
              <li>• **API Engineering:** Designing and debugging RESTful and GraphQL APIs using Node.js, Express, and specialized validation tools.</li>
              <li>• **Security & Privacy:** Implementing secure authentication flows (JWT, OAuth2) and ensuring data privacy through client-side processing.</li>
              <li>• **Technical Writing:** Distilling complex engineering concepts into actionable, step-by-step guides for the developer community.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <h2 className="font-serif text-2xl italic text-(--ink)">Editorial Standards</h2>
            <p className="mt-3 text-sm leading-7 text-(--muted)">
              Every tool is rigorously tested for accuracy and every guide is reviewed for technical depth. We don't publish generic filler; we publish solutions we've used in our own production environments.
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
            Developers trust content that shows depth, consistency, and evidence of experience. That is why the site prioritizes tool quality,
            practical examples, real-world workflows, and transparent editorial standards.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-lg bg-(--ink) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--bg)">
              About the publisher
            </Link>
            <Link href="/contact" className="rounded-lg border border-(--border) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--ink)">
              Contact the team
            </Link>
          </div>
        </section>
      </main>
    </SidebarScaffold>
  );
}
