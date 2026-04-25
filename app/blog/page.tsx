import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Developer Blog | SEO and Tooling Guides",
  description:
    "Read practical developer SEO and tooling guides, including JSON formatting, Base64 encoding, and online utility workflows.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Developer Blog | SEO and Tooling Guides",
    description:
      "Actionable blog posts about developer tools, technical SEO, and productivity workflows.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Blog | SEO and Tooling Guides",
    description: "Actionable blog posts about developer tools and technical SEO.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndexPage() {
  return (
    <SidebarScaffold title="Developer Blog">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">Developer SEO and Tooling Blog</h1>
      <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
        Explore long-tail focused guides designed to support ranking growth and user intent. Every article links directly
        to relevant tools so readers can apply examples instantly.
      </p>

      <section className="mt-8 grid gap-4 md:mt-10">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              Keyword: {post.targetKeyword}
            </p>
            <h2 className="mt-2 font-serif text-2xl italic text-[var(--ink)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
            >
              Read article
            </Link>
          </article>
        ))}
      </section>
      </main>
    </SidebarScaffold>
  );
}
